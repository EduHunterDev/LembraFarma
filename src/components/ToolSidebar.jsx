import React from "react";
import "../../css/dashboard.css";

const links = [
  {
    label: "Dashboard",
    href: "/Ferrementas - Crie aqui/Dashboard.html",
    icon: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
  },
  {
    label: "Clientes",
    href: "/Ferrementas - Crie aqui/Clientes.html",
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
  {
    label: "Medicamentos",
    href: "/Ferrementas - Crie aqui/Medicamentos.html",
    icon: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 3v4m8-4v4M4 10h16M12 13v5m-2.5-2.5h5" /></>,
  },
  {
    label: "Compras",
    href: "/Ferrementas - Crie aqui/Compras.html",
    icon: <><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2 3h2l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22 7H5" /></>,
  },
  {
    label: "Alertas",
    href: "/Ferrementas - Crie aqui/alertas.html",
    icon: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  },
];

export default function ToolSidebar({ active }) {
  return (
    <aside className="dashboard-sidebar">
      <a className="dashboard-brand" href="/" aria-label="LembraFarma - início">
        <img src="/assets/Logo.png" alt="" />
        <span>LembraFarma</span>
      </a>
      <nav className="dashboard-nav" aria-label="Menu do painel">
        {links.map((link) => (
          <a
            href={link.href}
            aria-current={link.label === active ? "page" : undefined}
            key={link.label}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {link.icon}
            </svg>
            <span>{link.label}</span>
          </a>
        ))}
        <a
          href="/pages/lembrafarma_auth.html"
          onClick={() => sessionStorage.removeItem("lembrafarma.authenticated")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5M21 12H9" />
          </svg>
          <span>Sair</span>
        </a>
      </nav>
    </aside>
  );
}
