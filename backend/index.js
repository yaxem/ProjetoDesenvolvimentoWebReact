const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { Pool } = require("pg")
require("dotenv").config()

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'meu_banco_de_filmes',
  password: '654321',
  port: '5432',
});

// Pegar filmes
app.get("/filmes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM filmes");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro:", error);
  }
});

// Adicionar Filme
app.post("/filmes", async (req, res) => {
  const { nome, desc, data, poster } = req.body;
  
  try {
    const result = await pool.query(
      "INSERT INTO filmes (nome, descricao, data, poster) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, desc, data, poster]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro:", error);
  }
});

// Deletar filme por ID
app.delete("/filmes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM filmes WHERE id = $1 RETURNING *", [id]);
  } catch (error) {
    console.error("Erro:", error);
  }
});

// Atualizar Filme por ID
app.put("/filmes/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, desc, data, poster } = req.body;

  try {
    const result = await pool.query(
      "UPDATE filmes SET nome = $1, descricao = $2, data = $3, poster = $4 WHERE id = $5 RETURNING *",
      [nome, desc, data, poster, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ message: "Erro ao atualizar filme" });
  }
});

app.listen(port, () => {
  console.log(`Tá rodando no http://localhost:${port}`);
});
