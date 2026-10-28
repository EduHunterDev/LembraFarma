const campoData = document.querySelector("#data-compra");
const campoDuracao = document.querySelector("#duracao");
const dataPrevista = document.querySelector("#data-prevista");
const campoDosagem = document.querySelector("#dosagem");
const campoQuantidadeCaixas = document.querySelector("#quantidade-caixas");

function calcularDataRecompra() {
    const data = campoData.value;
    const duracao = Number(campoDuracao.value);

    if (!data || !Number.isInteger(duracao) || duracao < 1) {
        dataPrevista.textContent =
            "Informe a data da compra e uma duração válida.";
        return;
    }

    // Interpretar a data no horário local, evitando diferenças de fuso ao usar new Date("AAAA-MM-DD").
    const [ano, mes, dia] = data.split("-").map(Number);
    const dataCalculada = new Date(ano, mes - 1, dia);

    dataCalculada.setDate(dataCalculada.getDate() + duracao);

    const diaFormatado = String(dataCalculada.getDate()).padStart(2, "0");
    const mesFormatado = String(dataCalculada.getMonth() + 1).padStart(2, "0");
    const anoFormatado = dataCalculada.getFullYear();

    dataPrevista.textContent =
        `Próxima recompra estimada: ${diaFormatado}/${mesFormatado}/${anoFormatado}`;
}

campoData.addEventListener("input", calcularDataRecompra);
campoDuracao.addEventListener("input", calcularDataRecompra);

const formCompra = document.querySelector("#form-compra");

formCompra.addEventListener("submit", function (event) {
    event.preventDefault();

    const cliente = document.querySelector("#cliente").value;
    const produto = document.querySelector("#produto").value.trim();
    const dataCompra = campoData.value;
    const duracao = Number(campoDuracao.value);
    const dosagem = campoDosagem.value;
    const quantidadeCaixas = Number(campoQuantidadeCaixas.value);

    if (
        !cliente ||
        !produto ||
        !dataCompra ||
        !Number.isInteger(duracao) ||
        duracao < 1 ||
        !dosagem ||
        !Number.isInteger(quantidadeCaixas) ||
        quantidadeCaixas < 1
    ) {
        alert("Confira os dados da compra.");
        return;
    }

    const [ano, mes, dia] = dataCompra.split("-").map(Number);
    const data = new Date(ano, mes - 1, dia);
    data.setDate(data.getDate() + duracao);

    const dataRecompra = [
        data.getFullYear(),
        String(data.getMonth() + 1).padStart(2, "0"),
        String(data.getDate()).padStart(2, "0")
    ].join("-");

    const novaCompra = {
        id: crypto.randomUUID(),
        cliente,
        produto,
        dosagem,
        quantidadeCaixas,
        dataCompra,
        duracao,
        dataRecompra,
        contato: "Pendente"
    };

    const compras = JSON.parse(
        localStorage.getItem("lembrafarma-compras") || "[]"
    );

    compras.push(novaCompra);

    localStorage.setItem(
        "lembrafarma-compras",
        JSON.stringify(compras)
    );

    carregarRecompras();

    alert("Compra registrada com sucesso!");
    formCompra.reset();

    dataPrevista.textContent =
        "A data estimada será exibida aqui.";
});

function carregarRecompras() {
    const lista = document.querySelector("#lista-recompras");

    const compras = JSON.parse(
        localStorage.getItem("lembrafarma-compras") || "[]"
    );

    // Atualiza os indicadores do painel
    const totalElement = document.querySelector("#total-recompras");
    const hojeElement = document.querySelector("#recompras-hoje");

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataHoje = [
        hoje.getFullYear(),
        String(hoje.getMonth() + 1).padStart(2, "0"),
        String(hoje.getDate()).padStart(2, "0")
    ].join("-");

    if (totalElement) {
        totalElement.textContent = compras.length;
    }

    if (hojeElement) {
        const totalHoje = compras.filter(
            compra => compra.dataRecompra === dataHoje
        ).length;

        hojeElement.textContent = totalHoje;
    }

    // Atualiza a lista de recompras
    lista.replaceChildren();

    if (compras.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "empty-state";
        mensagem.textContent = "Nenhuma recompra registrada.";
        lista.appendChild(mensagem);
        return;
    }

    compras
        .sort((a, b) =>
            a.dataRecompra.localeCompare(b.dataRecompra)
        )
        .forEach((compra) => {
            const item = document.createElement("article");
            item.className = "client-item";

            const titulo = document.createElement("strong");
            titulo.textContent =
                `${compra.cliente} — ${compra.produto}`;

            const detalhes = document.createElement("span");
            detalhes.textContent =
                `${compra.dosagem || "Dosagem não informada"} • ` +
                `${compra.quantidadeCaixas ?? "—"} caixa(s)`;

            const data = document.createElement("span");
            const [ano, mes, dia] = compra.dataRecompra.split("-");

            data.textContent =
                `Data estimada: ${dia}/${mes}/${ano}`;

            const status = document.createElement("small");
            status.textContent = `Contato: ${compra.contato}`;

            item.append(titulo, ,detalhes, data, status);
            lista.appendChild(item);
        });
}

// Carrega os dados ao abrir a página

carregarRecompras();