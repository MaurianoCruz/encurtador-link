async function carregarDados() {
  const listaDiv = document.getElementById("lista");

  // ⚠️ ainda manual (depois automatizamos)
  const codigos = ["abc123", "xyz456"];

  let labels = [];
  let dados = [];
  let totalClicks = 0;

  listaDiv.innerHTML = "";

  for (let codigo of codigos) {
    try {
      const res = await fetch(`/stats/${codigo}`);
      const data = await res.json();

      labels.push(codigo);
      dados.push(data.clicks);
      totalClicks += data.clicks;

      listaDiv.innerHTML += `
        <div class="link-card">
          <div>
            <strong>${codigo}</strong><br>
            <small>${data.url}</small>
          </div>
          <div>
            ${data.clicks} cliques
          </div>
        </div>
      `;
    } catch {
      console.log("Erro ao carregar", codigo);
    }
  }

  document.getElementById("totalLinks").innerText = codigos.length;
  document.getElementById("totalClicks").innerText = totalClicks;

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