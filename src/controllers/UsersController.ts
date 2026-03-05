// Importar a biblioteca Express
import express, { Request, Response } from "express";
// Importar a conexão com banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { User } from "../entity/User";
// Criar aplicação Express
const router = express.Router();

// Criar a rota para cadastrar usuário
router.post("/users", async (req: Request, res: Response) => {
  try {
    // receber os dados enviados no corpo da requisição
    var data = req.body;

    // Criar uma instancia do repositorio de User
    const userRepository = AppDataSource.getRepository(User);

    // Recuperar o registro do banco com valor da coluna de email
    const existingUser = await userRepository.findOne({
      where: { email: data.email },
    });

    // Verificar se já existe usuário cadastrado com esse email
    if (existingUser) {
      res.status(400).json({
        message: "Já existe usuário cadastrado com esse e-mail",
      });
      return;
    }

    // Criar um novo registro
    const newUser = userRepository.create(data);

    // Salvar o registro no banco de dados
    await userRepository.save(newUser);

    // Retornar resposta de Sucesso
    res.status(201).json({
      message: "Usuario cadastrado com sucesso!",
      user: newUser,
    });
  } catch (error) {
    // Retornar erro em caso de falha
    res.status(500).json({
      message: "Erro ao cadastrar usuário!",
    });
  }
});

// Exportar a instrução que está dentro da contante router
export default router;
