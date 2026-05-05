const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const links = {};

function gerarCodigo() {
  return Math.random().toString(36).substring(2, 8);
}

app.post("/encurtar", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ erro: "URL inválida" });
  }

  const codigo = gerarCodigo();

  links[codigo] = {
    url,
    clicks: 0
  };

  const baseURL = process.env.BASE_URL || "http://localhost:3000";
  const linkCurto = `${baseURL}/${codigo}`;

  res.json({ linkCurto });
});

app.get("/:codigo", (req, res) => {
  const { codigo } = req.params;

  if (links[codigo]) {
    links[codigo].clicks++;
    return res.redirect(links[codigo].url);
  }

  res.status(404).send("Link não encontrado");
});

app.get("/stats/:codigo", (req, res) => {
  const { codigo } = req.params;

  if (links[codigo]) {
    return res.json(links[codigo]);
  }

  res.status(404).json({ erro: "Link não encontrado" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});