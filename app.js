const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
 
app.use(express.json());
 
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello Express API
    </section>
  </body>
</html>
`;
 
app.get("/", (req, res) => res.type("html").send(html));
 
app.get("/req", (req, res) => res.send("Yo!"));

const NOME_COMPLETO = "Lucas Gomes do Nascimento";
 
app.get("/meunome", (req, res) => {
  res.send(`Meu nome é ${NOME_COMPLETO}`);
});

app.get("/tico", (req, res) => {
  res.send("teco");
});

const pokemonsDoAsh = [
  { ordem: 1, nome: "Caterpie" },
  { ordem: 2, nome: "Pidgeotto" },
  { ordem: 3, nome: "Spearow" },
  { ordem: 4, nome: "Bulbasaur" },
  { ordem: 5, nome: "Krabby" },
  { ordem: 6, nome: "Primeape" },
  { ordem: 7, nome: "Muk" },
  { ordem: 8, nome: "Tauros" },
  { ordem: 9, nome: "Lapras" },
  { ordem: 10, nome: "Snorlax" },
];
 
app.get("/pokemons", (req, res) => {
  res.json(pokemonsDoAsh);
});
 
const series = [
  { id: 1, titulo: "Breaking Bad" },
  { id: 2, titulo: "Transformers Prime" },
  { id: 3, titulo: "Stranger Things" },
];
 
app.post("/series", (req, res) => {
  res.json(series);
});

app.get("/erro", (req, res) => {
  throw new Error("Bug simulado: erro proposital para testar produção");
});

app.get("/dolar", async (req, res, next) => {
  try {
    const resposta = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL"
    );
    if (!resposta.ok) {
      return res
        .status(502)
        .json({ erro: "Falha ao consultar a API pública" });
    }
    const dados = await resposta.json();
    res.json(dados);
  } catch (err) {
    next(err);
  }
});
 
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: err.message });
});
 
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
 
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;