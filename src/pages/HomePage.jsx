import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FeaturesSection,
  PlansSection,
} from "../components/HomeSections.jsx";

const routeTargets = {
  "/": "inicio",
  "/funcionalidades": "Funcionalidade",
  "/planos": "planos",
};

function HomePage() {
  const { pathname } = useLocation();

  const scrollToRoute = (path, targetId) => (event) => {
    if (pathname === path) {
      event.preventDefault();
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const target = document.getElementById(routeTargets[pathname]);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname]);

  return (
    <>
      <header className="site-header">
        <nav className="navigation" aria-label="Navegação principal">
          <Link className="brand" to="/" aria-label="LembraFarma - início">
            <img src="/assets/Logo.png" alt="" />
            <span>LembraFarma</span>
          </Link>

          <div className="nav-links">
            <Link to="/" onClick={scrollToRoute("/", "inicio")}>
              Início
            </Link>
            <Link
              to="/funcionalidades"
              onClick={scrollToRoute("/funcionalidades", "Funcionalidade")}
            >
              Funcionalidades
            </Link>
            <Link to="/planos" onClick={scrollToRoute("/planos", "planos")}>
              Planos
            </Link>
            <a href="/pages/Contato.html">Contato</a>
          </div>

          <div className="nav-actions">
            <a className="login-link" href="/pages/lembrafarma_auth.html">
              Login
            </a>
            <a
              className="button button-small"
              href="/pages/lembrafarma_auth.html#cadastro"
            >
              Cadastre-se
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">Mais cuidado, mais fidelização</span>
            <h1 id="hero-title">
              Sua farmácia lembra de você, para você não esquecer da sua próxima
              compra.
            </h1>
            <p className="hero-description">
              O LembraFarma é um sistema inteligente que ajuda sua farmácia a
              lembrar seus clientes no momento certo, aumentando a fidelização e
              as vendas.
            </p>

            <ul className="benefits" id="funcionalidades">
              <li>
                <span className="benefit-icon" aria-hidden="true">
                  ◔
                </span>
                <span>
                  Lembretes automáticos
                  <br />
                  pelo WhatsApp
                </span>
              </li>
              <li>
                <span className="benefit-icon" aria-hidden="true">
                  ▦
                </span>
                <span>
                  Organização dos
                  <br />
                  clientes e compras
                </span>
              </li>
              <li>
                <span className="benefit-icon" aria-hidden="true">
                  ✦
                </span>
                <span>
                  Inteligência Artificial
                  <br />
                  para atendimento
                </span>
              </li>
            </ul>

            <div className="hero-actions">
              <a className="button" href="#teste-gratis">
                Comece agora <span aria-hidden="true">→</span>
              </a>
              <a className="button button-outline" href="#sobre">
                Veja como funciona{" "}
                <span className="play-icon" aria-hidden="true">
                  ▶
                </span>
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Farmacêutica em uma farmácia">
            <img
              className="pharmacist"
              src="/assets/HomeLay.png"
              alt="Farmacêutica sorrindo em sua farmácia"
            />
            <aside
              className="message-card"
              aria-label="Exemplo de lembrete enviado ao cliente"
            >
              <span className="message-icon" aria-hidden="true">
                ✓
              </span>
              <p>
                Olá, Maria! Passando para lembrar que está próximo o período da
                sua próxima compra.
              </p>
              <span className="message-time">10:24 ✓✓</span>
            </aside>
            <span className="visual-sparkle sparkle-one" aria-hidden="true">
              ✦
            </span>
            <span className="visual-sparkle sparkle-two" aria-hidden="true">
              +
            </span>
          </div>
        </section>

        <section className="trust-note" id="sobre">
          <span className="trust-mark" aria-hidden="true">
            +
          </span>
          <p>
            Mais proximidade com seus clientes. Mais tranquilidade para sua
            farmácia.
          </p>
        </section>

        <section className="page-shell">
          <FeaturesSection />
          <PlansSection />
        </section>
      </main>

      <section
        className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="testimonials-title"
      >
        <div className="mx-auto max-w-6xl text-center">
          <h2
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            id="testimonials-title"
          >
            Depoimentos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            Veja como o LembraFarma está ajudando drogarias a aumentarem o
            faturamento e a fidelização de clientes.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <article className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md">
              <div>
                <div
                  className="mb-4 flex items-center space-x-1 text-amber-400"
                  aria-label="5 de 5 estrelas"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <span aria-hidden="true" key={index}>
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-slate-700 italic">
                  “A recompra de medicamentos contínuos aumentou em 40% logo no
                  primeiro mês. O sistema enviando pelo WhatsApp facilita
                  demais o nosso trabalho diário.”
                </blockquote>
              </div>
              <div className="mt-6 flex items-center space-x-4 border-t border-slate-100 pt-4">
                <img
                  className="h-12 w-12 rounded-full border border-emerald-500/30 object-cover"
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
                  alt=""
                  loading="lazy"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Dr. Carlos S.
                  </h3>
                  <p className="text-xs text-slate-500">Farmácia São João</p>
                </div>
              </div>
            </article>

            <article className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md">
              <div>
                <div
                  className="mb-4 flex items-center space-x-1 text-amber-400"
                  aria-label="5 de 5 estrelas"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <span aria-hidden="true" key={index}>
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-slate-700 italic">
                  “Meus clientes amam os lembretes personalizados! Conseguimos
                  reativar dezenas de clientes antigos que não compravam há
                  meses.”
                </blockquote>
              </div>
              <div className="mt-6 flex items-center space-x-4 border-t border-slate-100 pt-4">
                <img
                  className="h-12 w-12 rounded-full border border-emerald-500/30 object-cover"
                  src="https://png.pngtree.com/png-vector/20250116/ourmid/pngtree-woman-pharmacist-young-adult-women-shelf-png-image_15246961.png"
                  alt=""
                  loading="lazy"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Dra. Ana P.
                  </h3>
                  <p className="text-xs text-slate-500">DrogaVerde</p>
                </div>
              </div>
            </article>

            <article className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md">
              <div>
                <div
                  className="mb-4 flex items-center space-x-1 text-amber-400"
                  aria-label="5 de 5 estrelas"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <span aria-hidden="true" key={index}>
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-slate-700 italic">
                  “Recuperei 30% dos clientes usando a Gestão Inteligente. O
                  suporte do sistema é incrível e o retorno sobre o investimento
                  foi imediato.”
                </blockquote>
              </div>
              <div className="mt-6 flex items-center space-x-4 border-t border-slate-100 pt-4">
                <img
                  className="h-12 w-12 rounded-full border border-emerald-500/30 object-cover"
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80"
                  alt=""
                  loading="lazy"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Dr. Marcos L.
                  </h3>
                  <p className="text-xs text-slate-500">FarmaVida</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <Link
          className="footer-brand"
          to="/"
          onClick={scrollToRoute("/", "inicio")}
          aria-label="LembraFarma - voltar ao início"
        >
          <img src="/assets/Logo.png" alt="" />
          <span>LembraFarma</span>
        </Link>
        <p>Mais que um sistema, um parceiro da sua farmácia.</p>
      </footer>
    </>
  );
}

export default HomePage;
