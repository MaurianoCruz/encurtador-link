async function carregarDados() {
  const listaDiv = document.getElementById("lista");

  // ⚠️ Simples: vamos pegar alguns códigos manualmente
  const codigos = ["abc123", "xyz456"]; // depois melhoramos isso

  let labels = [];
  let dados = [];

  listaDiv.innerHTML = "";

  for (let codigo of codigos) {
    try {
      const res = await fetch(`/stats/${codigo}`);
      const data = await res.json();

      labels.push(codigo);
      dados.push(data.clicks);

      listaDiv.innerHTML += `
        <div class="link-card">
          <p><strong>${codigo}</strong></p>
          <p>Cliques: ${data.clicks}</p>
        </div>
      `;
    } catch {
      console.log("Erro ao carregar", codigo);
    }
  }

  criarGrafico(labels, dados);
}

function criarGrafico(labels, dados) {
  const ctx = document.getElementById("grafico");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Cliques por link",
        data: dados
      }]
    }
  });
}

carregarDados();