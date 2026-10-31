import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import ToolSidebar from "../../components/ToolSidebar.jsx";

const paths = {
  clients: "/Ferrementas - Crie aqui/Clientes.html",
  medicines: "/Ferrementas - Crie aqui/Medicamentos.html",
  purchases: "/Ferrementas - Crie aqui/Compras.html",
  alerts: "/Ferrementas - Crie aqui/alertas.html",
};

const iconPaths = {
  clients: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /></>,
  reminders: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18m-9 4v4m-2-2h4" /></>,
  messages: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /></>,
  responses: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" /><path d="m8 12 2.5 2.5L16 9" /></>,
};

function readList(key) {
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  const parsed = JSON.parse(stored);
  if (!Array.isArray(parsed)) {
    throw new Error(`O dado "${key}" não está no formato esperado.`);
  }
  return parsed;
}

function getDashboardData() {
  const clients = readList("lembrafarma.clientes");
  const medicines = readList("lembrafarma.medicamentos");
  const purchases = readList("lembrafarma-compras");
  const reminders = purchases
    .filter((purchase) => purchase.dataRecompra)
    .map((purchase) => ({
      id: purchase.id,
      client: purchase.cliente || "Cliente",
      product: purchase.produto || purchase.medicamento?.nome || "Medicamento",
      date: purchase.dataRecompra,
      status: purchase.contato || "Pendente",
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const upcomingReminders = reminders.filter((reminder) => {
    const [year, month, day] = reminder.date.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date >= today && date <= nextWeek;
  });

  return {
    clients,
    medicines,
    reminders,
    upcomingReminders,
  };
}

function formatDate(value) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
}

function Icon({ children, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function DashboardPage() {
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      setData(getDashboardData());
    } catch (error) {
      console.error("Erro ao carregar dados do painel.", error);
      setLoadError("Não foi possível carregar os dados do painel. Verifique os dados salvos nas ferramentas.");
    }
  }, []);

  const query = search.trim().toLocaleLowerCase("pt-BR");
  const filteredReminders = useMemo(
    () =>
      (data?.upcomingReminders || [])
        .filter((reminder) =>
          `${reminder.client} ${reminder.product}`.toLocaleLowerCase("pt-BR").includes(query),
        )
        .slice(0, 5),
    [data, query],
  );
  const searchResults = useMemo(() => {
    if (!query || !data) return [];

    const clients = data.clients
      .filter((client) => `${client.nome || ""} ${client.cpf || ""} ${client.telefone || ""}`.toLocaleLowerCase("pt-BR").includes(query))
      .map((client) => ({
        key: `client-${client.id}`,
        title: client.nome || "Cliente sem nome",
        type: "Cliente",
        href: paths.clients,
      }));
    const medicines = data.medicines
      .filter((medicine) => `${medicine.medicamento?.nome || ""} ${medicine.medicamento?.principioAtivo || ""}`.toLocaleLowerCase("pt-BR").includes(query))
      .map((medicine, index) => ({
        key: `medicine-${medicine.medicamento?.registro || index}`,
        title: medicine.medicamento?.nome || "Medicamento",
        type: "Medicamento",
        href: paths.medicines,
      }));

    return [...clients, ...medicines].slice(0, 5);
  }, [data, query]);
  const filteredMessages = useMemo(
    () =>
      (data?.messages || []).filter((message) =>
        `${message.client} ${message.text}`.toLocaleLowerCase("pt-BR").includes(query),
      ),
    [data, query],
  );

  if (sessionStorage.getItem("lembrafarma.authenticated") !== "true") {
    return <Navigate to="/pages/lembrafarma_auth.html" replace />;
  }

  return (
    <main className="dashboard">
      <ToolSidebar active="Dashboard" />

      <div className="dashboard-workspace">
        <header className="dashboard-topbar">
          <div className="dashboard-search-wrap">
            <label className="dashboard-search">
              <Icon><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>
              <input
                type="search"
                placeholder="Buscar cliente ou medicamento..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Buscar cliente ou medicamento"
                aria-controls="dashboard-search-results"
              />
            </label>
            {query && (
              <div className="dashboard-search-results" id="dashboard-search-results">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <a href={result.href} key={result.key}>
                      <span>{result.title}</span>
                      <small>{result.type}</small>
                    </a>
                  ))
                ) : (
                  <p>Nenhum cliente ou medicamento encontrado.</p>
                )}
              </div>
            )}
          </div>
          <div className="dashboard-account">
            <span className="dashboard-notice" aria-label={`${data?.upcomingReminders.length || 0} próximos lembretes`}>
              <Icon><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></Icon>
              {Boolean(data?.upcomingReminders.length) && (
                <span className="dashboard-notice-count">{data.upcomingReminders.length}</span>
              )}
            </span>
            <span className="dashboard-avatar" aria-hidden="true">LF</span>
            <span className="dashboard-account-name">
              <strong>Minha farmácia</strong>
              <small>Conta atual</small>
            </span>
          </div>
        </header>

        <section className="dashboard-main" aria-label="Visão geral do painel">
          <div className="dashboard-heading">
            <div>
              <h1>Painel da Farmácia</h1>
              <p>Visão geral do seu atendimento e lembretes.</p>
            </div>
          </div>

          {loadError ? (
            <p className="dashboard-error" role="alert">{loadError}</p>
          ) : !data ? (
            <p className="dashboard-loading" role="status">Carregando dados do painel...</p>
          ) : (
            <>
              <div className="dashboard-stats">
                <article className="dashboard-stat">
                  <span className="dashboard-stat-icon stat-clients"><Icon>{iconPaths.clients}</Icon></span>
                  <div><p>Clientes cadastrados</p><strong>{data.clients.length}</strong><small>Dados salvos no navegador</small></div>
                </article>
                <article className="dashboard-stat">
                  <span className="dashboard-stat-icon stat-reminders"><Icon>{iconPaths.reminders}</Icon></span>
                  <div><p>Lembretes próximos</p><strong>{data.upcomingReminders.length}</strong><small>Próximos 7 dias</small></div>
                </article>
                <article className="dashboard-stat">
                  <span className="dashboard-stat-icon stat-messages"><Icon>{iconPaths.messages}</Icon></span>
                  <div><p>Mensagens enviadas</p><strong>—</strong><small>Integração não configurada</small></div>
                </article>
                <article className="dashboard-stat">
                  <span className="dashboard-stat-icon stat-responses"><Icon>{iconPaths.responses}</Icon></span>
                  <div><p>Respostas recebidas</p><strong>—</strong><small>Integração não configurada</small></div>
                </article>
              </div>

              <div className="dashboard-panels">
                <section className="dashboard-panel" aria-labelledby="upcoming-title">
                  <header className="dashboard-panel-heading">
                    <h2 id="upcoming-title">Próximos lembretes</h2>
                    <a href={paths.purchases}>Ver compras <span aria-hidden="true">→</span></a>
                  </header>
                  {filteredReminders.length ? (
                    <div className="dashboard-table-wrap">
                      <table className="dashboard-table">
                        <thead>
                          <tr><th>Cliente</th><th>Produto</th><th>Data prevista</th><th>Status</th><th>Ação</th></tr>
                        </thead>
                        <tbody>
                          {filteredReminders.map((reminder) => (
                            <tr key={reminder.id || `${reminder.client}-${reminder.date}`}>
                              <td><span className="dashboard-client"><span className="dashboard-client-avatar">{initials(reminder.client)}</span>{reminder.client}</span></td>
                              <td>{reminder.product}</td>
                              <td>{formatDate(reminder.date)}</td>
                              <td><span className={`reminder-status ${reminder.status.toLowerCase() === "agendado" ? "status-scheduled" : "status-pending"}`}>{reminder.status}</span></td>
                              <td><a className="dashboard-action" href={paths.alerts}>Ver alerta</a></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="dashboard-empty">
                      <Icon>{iconPaths.reminders}</Icon>
                      <p>{query ? "Nenhum lembrete encontrado para essa busca." : "Nenhuma recompra registrada ainda."}</p>
                      {!query && <a href={paths.purchases}>Registrar uma compra</a>}
                    </div>
                  )}
                </section>

                <section className="dashboard-panel" aria-labelledby="messages-title">
                  <header className="dashboard-panel-heading">
                    <h2 id="messages-title">Mensagens recentes</h2>
                    <span className="dashboard-unavailable">WhatsApp</span>
                  </header>
                  {filteredMessages.length ? (
                    <ul className="dashboard-message-list">
                      {filteredMessages.map((message) => (
                        <li key={message.id}>
                          <span className="dashboard-client-avatar">{initials(message.client)}</span>
                          <span className="dashboard-message-copy"><strong>{message.client}</strong><small>{message.text}</small></span>
                          <time>{message.time}</time>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="dashboard-empty dashboard-empty-messages">
                      <Icon>{iconPaths.messages}</Icon>
                      <p>{query ? "Nenhuma mensagem encontrada para essa busca." : "As mensagens aparecerão aqui quando o envio pelo WhatsApp estiver integrado."}</p>
                      <a href={paths.alerts}>Ver alertas de recompra</a>
                    </div>
                  )}
                </section>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
