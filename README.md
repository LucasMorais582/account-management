# account-management

Aplicação back-end que gerencia contas bancárias básicas

## Tecnologias

- Yarn Package
- NodeJs
- Axios
- Eslint
- Jest
- Typescript
- Prettier
- Express
- Typeorm
- Postgres

## Preparação do ambiente

Clonando o projeto
```
git clone https://github.com/LucasMorais582/account-management.git
```
Após acessar o diretório do projeto, rodar o comando no terminal para baixar a node_modules:
```
yarn init
```

## Banco de dados:
- O primeiro passo é instalar o [Docker](https://docs.docker.com/engine/install/) na sua máquina
- Em seguida, instalar a imagem do [Postgres](https://hub.docker.com/_/postgres). Caso nunca tenha utilizado o Postgres na sua máquina, é necessário criar seu login para ter acesso.
- Criar um banco de dados com o nome: "account-management" ou com o nome que desejar, desde que altere também no ormconfig.json (Nesse passo, pode-se utilizar o pgAdmin ou algum programa como o [Dbeaver](https://dbeaver.io/) para realizar a conexão com a imagem).


### Passos para inicializar a aplicação:

Rodar o comando:
```
yarn dev:server
```
Para acessar a aplicação, utilize uma API Client como Postman ou Insomnia:
- http://localhost:3333
