require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensagem: "API funcionando"
  });
});

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const professor = await prisma.professor.findFirst({
      where: {
        email,
        senha
      }
    });

    if (!professor) {
      return res.status(401).json({
        erro: "Email ou senha inválidos"
      });
    }

    res.json(professor);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/turmas/:professorId", async (req, res) => {
  try {
    const professorId = Number(req.params.professorId);

    const turmas = await prisma.turma.findMany({
      where: {
        professorId
      }
    });

    res.json(turmas);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/turmas", async (req, res) => {
  try {
    const { nome, professorId } = req.body;

    const turma = await prisma.turma.create({
      data: {
        nome,
        professorId: Number(professorId)
      }
    });

    res.json(turma);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.delete("/turmas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const atividades = await prisma.atividade.count({
      where: {
        turmaId: id
      }
    });

    if (atividades > 0) {
      return res.status(400).json({
        erro: "Você não pode excluir uma turma com atividades cadastradas"
      });
    }

    await prisma.turma.delete({
      where: {
        id
      }
    });

    res.json({
      mensagem: "Turma excluída com sucesso"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/atividades/:turmaId", async (req, res) => {
  try {
    const turmaId = Number(req.params.turmaId);

    const atividades = await prisma.atividade.findMany({
      where: {
        turmaId
      }
    });

    res.json(atividades);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/atividades", async (req, res) => {
  try {
    const { descricao, turmaId } = req.body;

    const atividade = await prisma.atividade.create({
      data: {
        descricao,
        turmaId: Number(turmaId)
      }
    });

    res.json(atividade);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
});