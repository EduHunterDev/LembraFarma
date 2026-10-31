import React, { useEffect, useState } from "react";
import ToolSidebar from "../../components/ToolSidebar.jsx";

const storageKey = "lembrafarma.clientes";

function readClients() {
  try {
    const stored = localStorage.getItem(storageKey);
    const clients = stored ? JSON.parse(stored) : [];
    return Array.isArray(clients) ? clients : [];
  } catch (error) {
    console.error("Erro ao carregar clientes", error);
    return null;
  }
}

function formatCpf(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function formatPhone(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const savedClients = readClients();
    if (savedClients === null) {
      setLoadError(true);
      return;
    }
    setClients(savedClients);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("nome") || "").trim();

    if (!name) {
      setNotice("Informe o nome do cliente.");
      return;
    }

    const newClient = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      nome: name,
      cpf: String(formData.get("cpf") || "").trim(),
      telefone: String(formData.get("telefone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
    };
    const nextClients = [...clients, newClient];

    try {
      localStorage.setItem(storageKey, JSON.stringify(nextClients));
    } catch (error) {
      console.error("Erro ao salvar cliente", error);
      setNotice("Não foi possível salvar o cliente neste navegador.");
      return;
    }

    setClients(nextClients);
    setNotice("Cliente cadastrado com sucesso.");
    form.reset();
  }

  return (
    <div className="tool-layout">
      <ToolSidebar active="Clientes" />
      <main className="tool-layout-content page-shell">
        <section className="page-panel page-panel-xl">
        <div className="page-heading">
          <p className="eyebrow">Clientes</p>
          <h1>Cadastro de clientes</h1>
        </div>
        <div className="two-column-layout">
          <form id="cliente-form" className="form-card" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="cliente-nome">Nome completo</label>
              <input id="cliente-nome" name="nome" type="text" maxLength="120" required />
            </div>
            <div className="field-group">
              <label htmlFor="cliente-cpf">CPF</label>
              <input
                id="cliente-cpf"
                name="cpf"
                type="text"
                inputMode="numeric"
                maxLength="14"
                placeholder="000.000.000-00"
                onChange={(event) => {
                  event.target.value = formatCpf(event.target.value);
                }}
              />
            </div>
            <div className="field-group">
              <label htmlFor="cliente-telefone">Telefone</label>
              <input
                id="cliente-telefone"
                name="telefone"
                type="text"
                maxLength="15"
                placeholder="(00) 00000-0000"
                onChange={(event) => {
                  event.target.value = formatPhone(event.target.value);
                }}
              />
            </div>
            <div className="field-group">
              <label htmlFor="cliente-email">E-mail</label>
              <input
                id="cliente-email"
                name="email"
                type="email"
                placeholder="cliente@email.com"
              />
            </div>
            <div className="form-actions">
              <button className="button" type="submit">Salvar cliente</button>
              <a className="button button-outline" href="/Ferrementas - Crie aqui/Medicamentos.html">
                Voltar para medicamentos
              </a>
            </div>
            {notice && <p role="status">{notice}</p>}
          </form>

          <aside className="info-card">
            <h2>Clientes cadastrados</h2>
            {loadError ? (
              <p role="alert">Não foi possível carregar os clientes salvos.</p>
            ) : clients.length ? (
              <div id="lista-clientes" className="client-list">
                {clients.map((client) => (
                  <div className="client-item" key={client.id}>
                    <strong>{client.nome}</strong>
                    <span>{client.cpf || "CPF não informado"}</span>
                    <small>
                      {client.telefone || client.email || "Contato não informado"}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              <div id="lista-clientes" className="client-list">
                <p className="empty-state-message">
                  Ainda não há clientes cadastrados.
                </p>
              </div>
            )}
          </aside>
        </div>
        </section>
      </main>
    </div>
  );
}
