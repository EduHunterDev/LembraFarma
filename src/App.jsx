import React, { Suspense, lazy } from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));
const DashboardPage = lazy(() => import("./pages/Ferrementas/DashboardPage.jsx"));
const ClientsPage = lazy(() => import("./pages/Ferrementas/ClientsPage.jsx"));
const PurchasesPage = lazy(() => import("./pages/Ferrementas/PurchasesPage.jsx"));
const AlertsPage = lazy(() => import("./pages/Ferrementas/AlertsPage.jsx"));
const MedicinesPage = lazy(() => import("./pages/Ferrementas/MedicinesPage.jsx"));

const tools = [
  ["Dashboard.html", DashboardPage],
  ["Clientes.html", ClientsPage],
  ["Compras.html", PurchasesPage],
  ["alertas.html", AlertsPage],
  ["Medicamentos.html", MedicinesPage],
];

const toolDirectories = ["Ferrementas - Crie aqui", "Ferramentas - Crie aqui"];

function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      document.title = "LembraFarma | Sua farmácia lembra de você";
    } else if (pathname.endsWith("Contato.html")) {
      document.title = "Contato | LembraFarma";
    } else if (pathname.endsWith("lembrafarma_auth.html")) {
      document.title = "LembraFarma - Autenticação";
    } else {
      const fileName = pathname.split("/").pop()?.replace(/\.html$/i, "");
      document.title = `${fileName || "LembraFarma"} | LembraFarma`;
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Suspense fallback={<p className="page-shell">Carregando página...</p>}>
      <DocumentTitle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/funcionalidades" element={<HomePage />} />
        <Route path="/planos" element={<HomePage />} />
        <Route path="/pages/Contato.html" element={<ContactPage />} />
        <Route path="/pages/lembrafarma_auth.html" element={<AuthPage />} />
        {toolDirectories.flatMap((directory) =>
          tools.map(([file, Page]) => (
            <Route
              key={`${directory}/${file}`}
              path={`/${directory}/${file}`}
              element={<Page />}
            />
          )),
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
