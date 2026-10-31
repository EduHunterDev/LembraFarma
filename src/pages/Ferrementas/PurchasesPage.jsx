import React, { useEffect, useState } from "react";
import ToolSidebar from "../../components/ToolSidebar.jsx";

const storageKey = "lembrafarma-compras";
const clients = [
  "Maria Oliveira",
  "Arthur Oliveira",
  "Helena Cavalcanti",
  "Gabriel Drummond",
  "Beatriz Fontes",
  "Leonardo Castelo",
  "Alice Prado",
  "Murilo Aguiar",
  "Clara Montenegro",
  "Thiago Viana",
];
const products = [
  "Losartana Potássica",
  "Cloridrato de Metformina",
  "Sinvastatina",
  "Levotiroxina Sódica",
  "Cloridrato de Fluoxetina",
  "Omeprazol",
  "Clonazepam (Rivotril)",
  "Sertralina (Cloridrato)",
  "Finasterida",
  "Dutasterida",
];
const dosages = ["25 mg", "50 mg", "100 mg", "200 mg", "500 mg", "Outra"];

function readPurchases() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Erro ao carregar compras", error);
    return null;
  }
}

function getLocalDateString(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatDate(value) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [notice, setNotice] = useState("A data estimada será exibida aqui.");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const savedPurchases = readPurchases();
    if (savedPurchases === null) {
      setLoadError(true);
      return;
    }
    setPurchases(savedPurchases);
  }, []);

  function handlePreview(event) {
    const formData = new FormData(event.currentTarget.form);
    const purchaseDate = String(formData.get("dataCompra") || "");
    const duration = Number(formData.get("duracao"));

    if (!purchaseDate || !Number.isInteger(duration) || duration < 1) {
      setNotice("Informe a data da compra e uma duração válida.");
      return;
    }

    const [year, month, day] = purchaseDate.split("-").map(Number);
    const estimatedDate = new Date(year, month - 1, day);
    estimatedDate.setDate(estimatedDate.getDate() + duration);
    setNotice(`Próxima recompra estimada: ${formatDate(getLocalDateString(estimatedDate))}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const client = String(formData.get("cliente") || "");
    const product = String(formData.get("produto") || "").trim();
    const purchaseDate = String(formData.get("dataCompra") || "");
    const duration = Number(formData.get("duracao"));
    const dosage = String(formData.get("dosagem") || "");
    const boxCount = Number(formData.get("quantity"));

    if (
      !client ||
      !product ||
      !purchaseDate ||
      !Number.isInteger(duration) ||
      duration < 1 ||
      !dosage ||
      !Number.isInteger(boxCount) ||
      boxCount < 1
    ) {
      setNotice("Confira os dados da compra.");
      return;
    }

    const [year, month, day] = purchaseDate.split("-").map(Number);
    const estimatedDate = new Date(year, month - 1, day);
    estimatedDate.setDate(estimatedDate.getDate() + duration);
    const nextPurchase = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      cliente: client,
      produto: product,
      dosagem: dosage,
      quantidadeCaixas: boxCount,
      dataCompra: purchaseDate,
      duracao: duration,
      dataRecompra: getLocalDateString(estimatedDate),
      contato: "Pendente",
    };
    const nextPurchases = [...purchases, nextPurchase];

    try {
      localStorage.setItem(storageKey, JSON.stringify(nextPurchases));
    } catch (error) {
      console.error("Erro ao salvar compra", error);
      setNotice("Não foi possível salvar a compra neste navegador.");
      return;
    }

    setPurchases(nextPurchases);
    setNotice("Compra registrada com sucesso!");
    form.reset();
  }

  const today = getLocalDateString(new Date());
  const sortedPurchases = [...purchases].sort((a, b) =>
    a.dataRecompra.localeCompare(b.dataRecompra),
  );

  return (
    <div className="tool-layout">
      <ToolSidebar active="Compras" />
      <main className="tool-layout-content page-shell">
      <header className="page-heading">
        <h1>Gestão de Compras</h1>
        <p>
          Acompanhe as compras registradas e a data estimada para a próxima
          recompra dos seus clientes.
        </p>
      </header>

      <section className="purchase-stats" aria-label="Resumo das recompras">
        <article className="stat-card">
          <div className="stat-icon"><span aria-hidden="true">▦</span></div>
          <div>
            <p>Recompras previstas</p>
            <strong id="total-recompras">{purchases.length}</strong>
            <span>Registros cadastrados</span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-icon"><span aria-hidden="true">◷</span></div>
          <div>
            <p>Previstas para hoje</p>
            <strong id="recompras-hoje">{purchases.filter((purchase) => purchase.dataRecompra === today).length}</strong>
            <span>Data estimada para hoje</span>
          </div>
        </article>
      </section>

      <section className="step-grid">
        <form id="form-compra" className="form-card" onSubmit={handleSubmit}>
          <h2>Registrar Compra</h2>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="cliente">Cliente</label>
              <select id="cliente" name="cliente" required defaultValue="">
                <option value="">Selecione um cliente</option>
                {clients.map((client) => <option key={client}>{client}</option>)}
              </select>
            </div>
            <div className="field-group">
              <label htmlFor="produto">Produto</label>
              <select id="produto" name="produto" required defaultValue="">
                <option value="">Selecione um Medicamento</option>
                {products.map((product) => <option key={product}>{product}</option>)}
              </select>
            </div>
            <div className="field-group">
              <label htmlFor="dosagem">Dosagem</label>
              <select id="dosagem" name="dosagem" required defaultValue="">
                <option value="">Selecione a dosagem</option>
                {dosages.map((dosage) => <option key={dosage}>{dosage}</option>)}
              </select>
            </div>
            <div className="field-group">
              <label htmlFor="quantidade-caixas">Quantidade de Caixas</label>
              <input id="quantidade-caixas" name="quantity" type="number" min="1" step="1" placeholder="Ex.: 2" required />
            </div>
            <div className="field-group">
              <label htmlFor="data-compra">Data da compra</label>
              <input id="data-compra" name="dataCompra" type="date" onChange={handlePreview} required />
            </div>
            <div className="field-group">
              <label htmlFor="duracao">Duração estimada (dias)</label>
              <input id="duracao" name="duracao" type="number" min="1" onChange={handlePreview} required />
            </div>
          </div>
          <p id="data-prevista" aria-live="polite">{notice}</p>
          <button type="submit" className="button">Registrar Compra</button>
        </form>
      </section>

      <section className="panel-card">
        <h2>Próximas recompras</h2>
        {loadError ? (
          <p role="alert">Não foi possível carregar as compras salvas.</p>
        ) : sortedPurchases.length ? (
          <div id="lista-recompras" className="client-list">
            {sortedPurchases.map((purchase) => (
              <article className="client-item" key={purchase.id}>
                <strong>{purchase.cliente} — {purchase.produto}</strong>
                <span>{purchase.dosagem || "Dosagem não informada"} • {purchase.quantidadeCaixas ?? "—"} caixa(s)</span>
                <span>Data estimada: {formatDate(purchase.dataRecompra)}</span>
                <small>Contato: {purchase.contato}</small>
              </article>
            ))}
          </div>
        ) : (
          <div id="lista-recompras" className="client-list">
            <p className="empty-state">Nenhuma recompra registrada.</p>
          </div>
        )}
      </section>
      </main>
    </div>
  );
}
