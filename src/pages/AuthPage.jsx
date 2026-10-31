import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";

const dashboardPath = "/Ferrementas - Crie aqui/Dashboard.html";

function formatCnpj(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatPhone(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    window.location.hash === "#cadastro" ? "register" : "login",
  );
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function showToast(message, type = "success") {
    window.clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = window.setTimeout(() => setToast(null), 3500);
  }

  function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");

    if (email !== "lembra@farma.com" || password !== "12345678") {
      showToast("E-mail ou senha incorretos.", "error");
      return;
    }

    sessionStorage.setItem("lembrafarma.authenticated", "true");
    showToast("Login efetuado! Redirecionando para o painel...", "success");
    window.setTimeout(() => navigate(dashboardPath), 800);
  }

  function handleRegister(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("confirmPassword")) {
      showToast("As senhas digitadas não coincidem.", "error");
      return;
    }
    showToast("Cadastro da farmácia efetuado com sucesso!", "success");
    window.setTimeout(() => setActiveTab("login"), 1800);
  }

  const loginTabClass =
    "flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 text-brand-900 bg-white shadow-sm";
  const inactiveTabClass =
    "flex-1 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 text-gray-500 hover:text-brand-900";

  return (
    <main className="auth-page min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      {toast && (
        <div
          className="fixed top-5 right-5 z-50 bg-white shadow-xl rounded-r-lg p-4 flex items-center gap-3 max-w-md"
          role="status"
          aria-live="polite"
        >
          <i
            className={`fa-solid ${toast.type === "success" ? "fa-circle-check text-emerald-500" : toast.type === "error" ? "fa-circle-exclamation text-rose-500" : "fa-circle-info text-sky-500"} text-xl`}
            aria-hidden="true"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              {toast.type === "success" ? "Sucesso!" : toast.type === "error" ? "Atenção!" : "Informação"}
            </h2>
            <p className="text-xs text-gray-600">{toast.message}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] border border-gray-100">
        <section className="lg:col-span-5 bg-brand-900 p-8 sm:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-brand-800 opacity-40 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-500 opacity-20 rounded-full blur-3xl" />
          <a className="relative z-10 flex items-center gap-3" href="/" aria-label="LembraFarma - início">
            <img src="/assets/Logo.png" alt="" className="w-10 h-10 rounded-2xl bg-white object-contain p-1 shadow-lg" />
            <span className="text-2xl font-bold tracking-tight text-white">Lembra<span className="font-normal text-teal-300">Farma</span></span>
          </a>
          <div className="relative z-10 my-10 lg:my-0 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-medium">
              <i className="fa-solid fa-shield-halved" aria-hidden="true" />
              <span>Sistema de Gestão &amp; Lembretes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white">
              Fidelize clientes e otimize reposições de remédios.
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              Acompanhe históricos de compras, automatize lembretes de retenção
              via WhatsApp e simplifique a rotina da sua farmácia.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/10">
              <div><p className="text-2xl font-bold text-teal-300">+98%</p><p className="text-xs text-gray-300">Taxa de retenção</p></div>
              <div><p className="text-2xl font-bold text-teal-300">Auto</p><p className="text-xs text-gray-300">Lembretes Inteligentes</p></div>
            </div>
          </div>
          <p className="relative z-10 text-xs text-gray-400">
            © 2026 LembraFarma. Todos os direitos reservados.
          </p>
        </section>

        <section className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white relative">
          <a className="lg:hidden flex items-center gap-2.5 mb-8" href="/">
            <img src="/assets/Logo.png" alt="" className="w-9 h-9 rounded-xl object-contain p-1 shadow-md" />
            <span className="text-xl font-bold tracking-tight text-brand-900">Lembra<span className="text-teal-600 font-normal">Farma</span></span>
          </a>
          <div className="flex items-center bg-gray-100/80 p-1.5 rounded-2xl mb-8 max-w-xs border border-gray-200/60">
            <button type="button" className={activeTab === "login" ? loginTabClass : inactiveTabClass} onClick={() => setActiveTab("login")}>Acessar Conta</button>
            <button type="button" className={activeTab === "register" ? loginTabClass : inactiveTabClass} onClick={() => setActiveTab("register")}>Cadastrar-se</button>
          </div>

          {activeTab === "login" ? (
            <div className="space-y-6">
              <div><h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h2><p className="text-sm text-gray-500 mt-1">Insira suas credenciais para acessar o painel.</p></div>
              <form id="login-form" className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2" htmlFor="login-email">E-mail Corporativo</label>
                  <div className="relative"><i className="fa-regular fa-envelope absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 text-sm" aria-hidden="true" /><input className="input-field w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white" id="login-email" name="email" type="email" autoComplete="username" placeholder="exemplo@farmacia.com.br" required /></div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider" htmlFor="login-password">Senha</label>
                    <button type="button" onClick={() => showToast("Link de recuperação enviado ao seu e-mail.", "info")} className="text-xs font-medium text-brand-800 hover:underline">Esqueceu a senha?</button>
                  </div>
                  <div className="relative"><i className="fa-solid fa-lock absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 text-sm" aria-hidden="true" /><input className="input-field w-full pl-10 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white" id="login-password" name="password" type={showLoginPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" required /><button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600" aria-label={showLoginPassword ? "Ocultar senha" : "Mostrar senha"}><i className={`fa-regular ${showLoginPassword ? "fa-eye-slash" : "fa-eye"} text-sm`} id="toggle-icon-login" /></button></div>
                </div>
                <div className="flex items-center pt-1"><input id="remember-me" name="remember" type="checkbox" className="w-4 h-4 text-brand-800 rounded border-gray-300 focus:ring-brand-800 cursor-pointer" /><label htmlFor="remember-me" className="ml-2.5 text-xs text-gray-600 cursor-pointer">Lembrar deste dispositivo</label></div>
                <button type="submit" className="w-full mt-2 py-3.5 px-4 bg-brand-800 hover:bg-brand-hover text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"><span>Entrar no Painel</span><i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" /></button>
              </form>
              <p className="text-center text-xs text-gray-500 pt-2">Ainda não possui uma conta? <button type="button" onClick={() => setActiveTab("register")} className="font-semibold text-brand-800 hover:underline">Cadastre sua farmácia</button></p>
            </div>
          ) : (
            <div className="space-y-5">
              <div><h2 className="text-2xl font-bold text-gray-900">Cadastre sua Farmácia</h2><p className="text-sm text-gray-500 mt-1">Preencha os dados da sua empresa para começar.</p></div>
              <form id="register-form" className="space-y-3.5" onSubmit={handleRegister}>
                <div><label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="pharmacy-name">Nome da Farmácia / Razão Social</label><input id="pharmacy-name" name="pharmacy" type="text" required placeholder="Ex: Farmácia São Paulo Ltda" className="input-field w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:bg-white" /></div>
                <div><label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="cnpj-input">CNPJ (Pessoa Jurídica)</label><input id="cnpj-input" type="text" maxLength="18" required placeholder="00.000.000/0001-00" onChange={(event) => { event.target.value = formatCnpj(event.target.value); }} className="input-field w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:bg-white" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div><label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="register-email">E-mail Corporativo</label><input id="register-email" type="email" required placeholder="contato@farmacia.com" className="input-field w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:bg-white" /></div>
                  <div><label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="phone-input">Telefone / WhatsApp</label><input id="phone-input" type="text" maxLength="15" required placeholder="(85) 99999-9999" onChange={(event) => { event.target.value = formatPhone(event.target.value); }} className="input-field w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:bg-white" /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div><label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="reg-password">Senha</label><input id="reg-password" name="password" type="password" minLength="8" required placeholder="Mínimo 8 caracteres" className="input-field w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:bg-white" /></div>
                  <div><label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="reg-confirm-password">Confirmar Senha</label><input id="reg-confirm-password" name="confirmPassword" type="password" required placeholder="Repita a senha" className="input-field w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:bg-white" /></div>
                </div>
                <div className="flex items-start pt-1"><input id="terms" type="checkbox" required className="mt-0.5 w-4 h-4 text-brand-800 rounded border-gray-300 focus:ring-brand-800 cursor-pointer" /><label htmlFor="terms" className="ml-2.5 text-xs text-gray-600 leading-relaxed">Li e aceito os <a href="#" className="text-brand-800 font-semibold hover:underline">Termos de Uso</a> e a <a href="#" className="text-brand-800 font-semibold hover:underline">Política de Privacidade</a> da LembraFarma.</label></div>
                <button type="submit" className="w-full mt-2 py-3 px-4 bg-brand-800 hover:bg-brand-hover text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"><i className="fa-solid fa-check text-xs" aria-hidden="true" /><span>Criar Conta da Farmácia</span></button>
              </form>
              <p className="text-center text-xs text-gray-500 pt-1">Já possui uma conta? <button type="button" onClick={() => setActiveTab("login")} className="font-semibold text-brand-800 hover:underline">Faça login</button></p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
