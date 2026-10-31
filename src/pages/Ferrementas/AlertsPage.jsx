import React, { useEffect, useState } from "react";
import ToolSidebar from "../../components/ToolSidebar.jsx";

const demoClients = [
  {
    nome: "Maria Silva",
    medicamento: "Losartana 50mg",
    qtd: 30,
    posologia: 1,
    dataCompra: "2026-09-28",
    whats: "85999999999",
  },
];

function getAlerts() {
  try {
    const saved = localStorage.getItem("clientes");
    const clients = saved ? JSON.parse(saved) : demoClients;
    if (!Array.isArray(clients)) {
      throw new Error("Os dados de clientes precisam ser uma lista.");
    }
    const today = new Date();
    return clients.flatMap((client) => {
      const purchaseDate = new Date(client.dataCompra);
      const dosage = Number(client.posologia);
      const quantity = Number(client.qtd);
      if (!Number.isFinite(purchaseDate.getTime()) || dosage <= 0 || quantity <= 0) {
        return [];
      }

      const endDate = new Date(purchaseDate);
      endDate.setDate(endDate.getDate() + quantity / dosage);
      const daysLeft = Math.ceil((endDate - today) / 86400000);
      return daysLeft <= 3 ? [{ ...client, endDate, daysLeft }] : [];
    });
  } catch (error) {
    console.error("Erro ao carregar alertas", error);
    return null;
  }
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const currentAlerts = getAlerts();
    if (currentAlerts === null) {
      setLoadError(true);
      return;
    }
    setAlerts(currentAlerts);
  }, []);

  return (
    <div className="tool-layout">
      <ToolSidebar active="Alertas" />
      <main className="tool-layout-content page-shell">
        <section className="page-panel">
          <div className="page-heading">
            <h1>🔔 Alertas de Recompra</h1>
            <p>Clientes que precisam ser avisados nos próximos 3 dias</p>
          </div>
          <div id="lista-alertas">
        {loadError ? (
          <p role="alert">Não foi possível carregar os alertas salvos.</p>
        ) : alerts.length ? (
          alerts.map((client, index) => {
            const text = `Olá ${client.nome}, seu ${client.medicamento} está acabando!`;
            const phone = String(client.whats || "").replace(/\D/g, "");
            return (
              <article
                key={`${client.nome}-${client.dataCompra}-${index}`}
                style={{
                  border: "1px solid #ccc",
                  padding: 15,
                  margin: "10px 0",
                  borderRadius: 8,
                  background: "#fff3cd",
                }}
              >
                <strong>⚠️ {client.nome}</strong> - {client.medicamento}
                <br />
                Acaba em {client.daysLeft} dia(s) ({client.endDate.toLocaleDateString()})
                <br />
                <a
                  href={`https://wa.me/55${phone}?text=${encodeURIComponent(text)}`}
                  className="button button-small"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 5,
                    borderRadius: 20,
                    background: "#25D366",
                    color: "white",
                  }}
                >
                  📱 Enviar WhatsApp
                </a>
              </article>
            );
          })
        ) : (
          <p>✅ Nenhum alerta para hoje!</p>
        )}
          </div>
        </section>
      </main>
    </div>
  );
}
