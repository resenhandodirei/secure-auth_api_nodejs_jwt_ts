# Secure Auth API - Node.js, JWT, TypeScript

## Descrição

Esta é uma API de Autenticação e Autorização segura, construída utilizando Node.js, JWT (JSON Web Token) e TypeScript. O objetivo deste projeto é fornecer uma solução robusta e escalável para gerenciamento de autenticação e autorização de usuários em aplicações web.

## Funcionalidades

- **Registro de Usuário:** Permite que novos usuários se registrem no sistema.
- **Login de Usuário:** Geração de um token JWT para autenticação após um login bem-sucedido.
- **Proteção de Rotas:** Rotas protegidas que exigem um token JWT válido para acesso.
- **Renovação de Tokens:** Implementação de refresh tokens para garantir a segurança e a continuidade da sessão do usuário.
- **Logout Seguro:** Invalidação de tokens para logout seguro.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript no servidor.
- **TypeScript:** Superconjunto do JavaScript que adiciona tipagem estática ao código.
- **Express:** Framework web para Node.js.
- **JWT (JSON Web Token):** Padrão de token aberto para autenticação e autorização.
- **Bcrypt:** Biblioteca para hashing de senhas.
- **Dotenv:** Gerenciamento de variáveis de ambiente.
- **Jest:** Framework de testes para JavaScript.

## Pré-requisitos

- **Node.js** (v14 ou superior)
- **npm** (v6 ou superior) ou **yarn**
- **PostgreSQL** (ou outro banco de dados relacional de sua escolha)

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/secure-auth-api-nodejs-jwt-ts.git
   cd secure-auth-api-nodejs-jwt-ts
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```plaintext
   PORT=3000
   DATABASE_URL=postgres://user:password@localhost:5432/nome-do-banco
   JWT_SECRET=sua-chave-secreta
   JWT_EXPIRATION=3600
   REFRESH_TOKEN_SECRET=sua-chave-secreta-para-refresh
   ```

4. Execute as migrações do banco de dados:

   ```bash
   npm run migrate
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

   A API estará disponível em `http://localhost:3000`.

## Uso

### Registro de Usuário

- **Endpoint:** `POST /api/auth/register`
- **Descrição:** Cria uma nova conta de usuário.
- **Corpo da Requisição:**

  ```json
  {
    "username": "seu-usuario",
    "email": "seu-email@example.com",
    "password": "sua-senha"
  }
  ```

### Login de Usuário

- **Endpoint:** `POST /api/auth/login`
- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Corpo da Requisição:**

  ```json
  {
    "email": "seu-email@example.com",
    "password": "sua-senha"
  }
  ```

- **Resposta:**

  ```json
  {
    "accessToken": "token-gerado",
    "refreshToken": "refresh-token-gerado"
  }
  ```

### Proteção de Rotas

Adicione o middleware `authMiddleware` às rotas que você deseja proteger.

```typescript
import { authMiddleware } from './middlewares/authMiddleware';

app.get('/api/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'Você acessou uma rota protegida!' });
});
```

## Testes

Para rodar os testes, utilize o comando:

```bash
npm run test
```

## Contribuição

Sinta-se à vontade para contribuir com este projeto! Abra um _issue_ ou envie um _pull request_.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Espero que este README atenda às suas necessidades! Se precisar de mais alguma informação ou personalização, é só avisar.
