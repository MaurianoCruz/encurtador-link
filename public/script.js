function mostrarLink(link) {
  salvar(link);
  listar();
}

function salvar(link) {
  let lista = JSON.parse(localStorage.getItem("links")) || [];
  lista.unshift(link); // adiciona no topo
  localStorage.setItem("links", JSON.stringify(lista));
}

function listar() {
  const lista = JSON.parse(localStorage.getItem("links")) || [];
  const div = document.getElementById("resultado");

  div.innerHTML = "";

  lista.forEach(link => {
    div.innerHTML += `
      <div class="link-card">
        <a href="${link}" target="_blank">${link}</a>
        <button class="copy" onclick="copiar('${link}')">Copiar</button>
      </div>
    `;
  });
}

// carregar ao abrir
listar();