import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "614541",
  database: "celke",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [__dirname + "/migration/*.js"],
});

// Iniciar a conexão com o Banco de Dados
AppDataSource.initialize()
  .then(() => {
    console.log("conexão com o banco de dados realizada com SUCESSO!");
  })
  .catch((error) => {
    console.log("Erro na conexão com o banco de dados", error);
  });
