// Ter 2 usuários com permissões definidos
// rota pública
// rota para autenticar o usuário
// 5 rotas autenticadas verificando se o usuário tem permissão para acessar

import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(3000, () => 
    console.log('Server is running on http://localhost:3000')
);