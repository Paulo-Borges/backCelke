import express, { Request, Response } from "express";

// Importar o arquivo com as credenciais do Banco de Dados
import { AppDataSource } from "./data-source";

// Criar a aplicação express
const app = express();

// Iniciar a conexão com o Banco de Dados
AppDataSource.initialize()
  .then(() => {
    console.log("conexão com o banco de dados realizada com SUCESSO!");
  })
  .catch((error) => {
    console.log("Erro na conexão com o banco de dados", error);
  });

// Criar a rota GET principal
app.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo Borges!");
});

// Iniciar o servidor na porta 8080
app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
