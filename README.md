# Projeto Docker-FastAPI-React-MySQL

## Descrição do projeto 📄

Este projeto implementa um CRUD de um único modelo 'Pessoa', onde foi desenvolvido de forma a comunicar backend e frontend para processamento dos dados. Essa comunicação acontece por meio de uma api desenvolvida com fastapi que serve informações do banco de dados.

## Tecnologias utilizadas 🧑‍💻

+ Python
+ Fastapi
+ MySQL
+ React
+ Docker

***

## Executando o projeto 🚀

### 1. Clone o projeto do repositório no github e acesse o diretório baixado

        $ git clone https://github.com/brunosp1024/docker-fastapi-react-mysql.git
        $ cd docker-fastapi-react-mysql/


### 2. Cria uma cópia do arquivo `.env.example` com o nome `.env`:

```shell script
cp .env.example .env
```


### 3. Instale o Docker e o docker-compose seguindo as instruções na documentação

 - https://docs.docker.com/get-docker/


### 4. Rodar docker-compose para iniciar o sistema e carregar o banco de dados:

```shell script
docker-compose up
```

### 5. Acessando o sistema no navegador:

#### Para acessar a interface do sistema, basta digitar o seguinte endereço:

    http://localhost:3000/

#### Para ver a documentação da api e seus endpoints, acessar o endereço:

    http://localhost:8000/api/docs

