"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Criar a aplicação express
const app = (0, express_1.default)();
// Criar o middleware para receber os dados no corpo da requisição
app.use(express_1.default.json());
// Incluir as CONTROLLERS
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
// Criar as rotas
app.use("/", UsersController_1.default);
// Criar a rota GET principal
app.get("/", (req, res) => {
    res.send("Bem vindo Borges!");
});
// Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
//# sourceMappingURL=index.js.map