import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Usuários simulados
const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' },
];

const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// Função para encontrar o usuário
const getUser = (username: string, password: string) => {
    return users.find(user => user.username === username && user.password === password);
};

// Middleware para verificar o token JWT
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token inválido
            }

            // Adiciona o usuário ao objeto `req`
            (req as any).user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Token não fornecido
    }
};

// Middleware para verificar permissões
const authorizeRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if (user?.role !== role) {
            return res.sendStatus(403); // Acesso negado
        }
        next();
    };
};

// Rota pública
app.get('/', (req: Request, res: Response) => {
    res.send("Hello world");
});

// Rota para autenticar o usuário
app.post('/auth', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = getUser(username, password);

    if (user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);
        res.json({ accessToken });
    } else {
        res.status(401).send('Username or password incorrect');
    }
});

// Rotas autenticadas
app.get('/dashboard', authenticateJWT, (req: Request, res: Response) => {
    res.send('Welcome to the dashboard!');
});

app.get('/admin', authenticateJWT, authorizeRole('admin'), (req: Request, res: Response) => {
    res.send('Welcome to the admin panel!');
});

app.get('/user', authenticateJWT, authorizeRole('user'), (req: Request, res: Response) => {
    res.send('Welcome to the user panel!');
});

app.get('/settings', authenticateJWT, (req: Request, res: Response) => {
    res.send('Welcome to settings!');
});

app.get('/profile', authenticateJWT, (req: Request, res: Response) => {
    res.send('Welcome to your profile!');
});

app.listen(3000, () => 
    console.log('Server is running on http://localhost:3000')
);
