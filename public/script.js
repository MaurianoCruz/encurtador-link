const btn = document.getElementById("btn");

btn.addEventListener("click", encurtar);

async function encurtar() {
  const url = document.getElementById("urlInput").value;

  if (!url) {
    alert("Digite um link!");
    return;
  }

  try {
    const resposta = await fetch("/encurtar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const dados = await resposta.json();

    mostrarLink(dados.linkCurto);

  } catch (erro) {
    console.error(erro);
    alert("Erro ao encurtar link");
  }
}

function mostrarLink(link) {
  const div = document.getElementById("resultado");

  div.innerHTML = `
    <div class="link-card">
      <a href="${link}" target="_blank">${link}</a>
      <button onclick="copiar('${link}')">Copiar</button>
    </div>
  `;
}

function copiar(link) {
  navigator.clipboard.writeText(link)
    .then(() => {
      alert("Link copiado!");
    })
    .catch(() => {
      alert("Erro ao copiar");
    });
}