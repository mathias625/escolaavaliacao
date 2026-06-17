# Escola Avaliação

Sistema Full Stack para gerenciamento de turmas e atividades de professores.

## Tecnologias Utilizadas

### Back-end

* Node.js
* Express
* Prisma ORM
* MySQL

### Front-end

* HTML
* CSS
* JavaScript

## Requisitos

* Node.js 
* MySQL
* VS Code

## Instalação

### Banco de Dados

Criar banco:

```sql
CREATE DATABASE educ;
```

Executar as migrations:

```bash
npx prisma migrate dev
```

### Back-end

Instalar dependências:

```bash
npm install
```

Executar:

```bash
node server.js
```

Servidor:

```txt
http://localhost:3000
```

### Front-end

Abrir a pasta web utilizando Live Server.

## Login de Teste

Email:

```txt
admin@gmail.com
```

Senha:

```txt
123
```

## Funcionalidades

* Login de professor
* Cadastro de turmas
* Listagem de turmas
* Exclusão de turmas
* Cadastro de atividades
* Listagem de atividades
* Logout

## Estrutura

```txt
escolaavaliacao
│
├── prisma
├── web
├── server.js
├── package.json
└── README.md
```
