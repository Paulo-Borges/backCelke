// Importar a biblioteca Express
import express, { Request, Response } from "express";
// Importar a conexão com banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { User } from "../entity/User";
// Criar aplicação Express
const router = express.Router();

// Criar a rota para listar usuário
router.get("/users", async (req: Request, res: Response) => {
  try {
    // Criar uma Instancia do repositório de User
    const userRepository = AppDataSource.getRepository(User);
    // Recuperar todos os usuários de banco de dados
    const users = await userRepository.find();
    // Retorna os usuários como resposta
    res.status(200).json(users);
    return;
  } catch (error) {
    // Retorna erro em caso de FALHA
    res.status(500).json({
      message: "Erro as listar os usuário!",
    });
    return;
  }
});
// Criar a rota para visualizar um  usuário
router.get("/users/:id", async (req: Request, res: Response) => {
  try {
    // Obter o ID do usuário
    const { id } = req.params;

    // Obter o repositório da entidade User
    const userRepository = AppDataSource.getRepository(User);

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Buscar o usuario no banco de dados pelo ID
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    // Verificar se o usuário fo encontrado
    if (!user) {
      res.status(404).json({
        message: "Usuario não encontrada!",
      });
      return;
    }
    // retornar o usuario encontrado
    res.status(200).json({
      user,
    });
    return;
  } catch (error) {
    // Retornar em caso de falha
    res.status(500).json({
      message: "erro ao tentar mostrar usuário",
    });
    return;
  }
});

// Criar a rota para EDITAR usuário
router.put("/users/:id", async (req: Request, res: Response) => {
  try {
    // Obter ID do usuario
    const { id } = req.params;

    // res.send(`Editar: ${id}`); ------X---- IMPORTANTE ----X-----
    // Receber os dados enviados no corpo da Requisição
    const data = req.body;

    // Obter o repositório da entidade User
    const userRepository = AppDataSource.getRepository(User);

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "ID inválido" });
    }
    // Buscar no banco de dados pelo ID
    const user = await userRepository.findOneBy({ id: parseInt(id) });

    // Verificar se o usuário foi encontrado!

    if (!user) {
      res.status(404).json({
        message: "Usuario não encontrado!",
      });
      return;
    }

    res.status(200).json({
      message: "Usuario atualizado com sucesso!",
      user: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao editar usuário!",
    });
  }
});

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
