import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Compras from "./pages/Compras.jsx";


const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "49.90",
    formattedPrice: "R$ 49,90",
    href: "https://link.infinitepay.io/eduhunterplay/VC1D-hBkhsP17zb-49,90",
    description: "Ideal para pequenos negócios que estão começando.",
    benefits: [
      "Até 500 clientes cadastrados",
      "Lembretes de reposição de medicamentos",
      "Painel de gerenciamento",
      "Histórico de mensagens",
    ],
  },
  {
    id: "intermediate",
    name: "Intermediário",
    price: "99.90",
    formattedPrice: "R$ 99,90",
    href: "https://link.infinitepay.io/eduhunterplay/VC1D-nTHBJoLuUt-99,90",
    description: "Mais recursos para farmácias que desejam crescer.",
    benefits: [
      "Até 1.500 clientes cadastrados",
      "Todos os recursos do plano Básico",
      "Lembretes automáticos de reposição",
      "Relatórios básicos de desempenho",
    ],
    featured: true,
  },
  {
    id: "professional",
    name: "Profissional",
    price: "199.90",
    formattedPrice: "R$ 199,90",
    href: "https://link.infinitepay.io/eduhunterplay/VC1D-fueaUoyTHt-199,90",
    description: "Para farmácias que buscam mais controle e eficiência.",
    benefits: [
      "Maior capacidade de gerenciamento de clientes",
      "Todos os recursos do plano Intermediário",
      "Integração com sistema de vendas",
      "Relatórios avançados de desempenho",
    ],
  },
];

const features = [
  {
    title: "1. Lembretes automáticos de recompra",
    image: "/assets/Lembrete.png",
    alt: "Lembretes automáticos de recompra",
    details: [
      "Envio de lembretes pelo WhatsApp",
      "Previsão de quando o medicamento acabará",
      "Mensagens personalizadas para cada cliente",
      "Agendamento dos lembretes por data",
    ],
  },
  {
    title: "2. Gestão de clientes",
    image: "/assets/Clientes.jfif",
    alt: "Gestão de clientes da farmácia",
    details: [
      "Cadastro de nome, telefone e preferências",
      "Histórico de compras",
      "Identificação de clientes ativos e inativos",
      "Busca rápida de clientes cadastrados",
    ],
  },
  {
    title: "3. Controle de produtos e compras",
    image: "/assets/Compras.jfif",
    alt: "Controle de produtos e compras",
    details: [
      "Cadastro de medicamentos e produtos",
      "Registro de compras realizadas",
      "Estimativa de recompra com base no consumo informado",
      "Consulta de disponibilidade, se integrada ao estoque",
    ],
  },
  {
    title: "4. Assistente de inteligência artificial",
    image: "/assets/Gestao.jfif",
    alt: "Assistente de inteligência artificial",
    details: [
      "Respostas para dúvidas frequentes",
      "Informações sobre horário de funcionamento",
      "Orientação sobre disponibilidade de produtos",
      "Encaminhamento para um atendente humano",
    ],
  },
  {
    title: "5. Relatórios e indicadores",
    image: "/assets/Gestao.jfif",
    alt: "Relatórios e indicadores da farmácia",
    details: [
      "Total de clientes cadastrados",
      "Lembretes enviados e pendentes",
      "Taxa de respostas e clientes que voltaram a comprar",
      "Desempenho das campanhas de relacionamento",
    ],
  },
  {
    title: "6. Automação e configurações",
    image: "/assets/Lembrete.png",
    alt: "Automação e configurações",
    details: [
      "Configuração dos horários de envio",
      "Modelos de mensagens personalizadas",
      "Controle de usuários e permissões",
      "Integração com WhatsApp e outros sistemas compatíveis",
    ],
  },
];

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
          <section className="py-8 sm:py-12" aria-labelledby="Funcionalidade">
            <div className="mb-8 max-w-2xl sm:mb-10">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold tracking-wide text-teal-800 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
                Tudo para sua farmácia
              </span>
              <h2
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                id="Funcionalidade"
              >
                Funcionalidades
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
                Ferramentas simples para cuidar melhor dos seus clientes e da
                rotina da sua farmácia.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              {features.map((feature, index) => (
                <article
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-950/5 sm:flex-row"
                  key={feature.title}
                >
                  <div className="relative min-h-56 overflow-hidden bg-slate-50 sm:min-h-full sm:w-[38%] sm:shrink-0">
                    <img
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      src={feature.image}
                      alt={feature.alt}
                      loading="lazy"
                    />
                    <span className="absolute left-4 top-4 inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 px-2 text-sm font-bold text-teal-800 shadow-sm backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                      {feature.title.replace(/^\d+\.\s*/, "")}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {feature.details.map((detail) => (
                        <li
                          className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                          key={detail}
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                            aria-hidden="true"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="page-panel" aria-labelledby="plans-title">
            <div className="page-heading">
              <h1 id="plans-title">Planos de assinatura</h1>
              <p>Escolha o plano ideal para o seu negócio.</p>
            </div>

            <div className="plans-list" id="planos">
              {plans.map((plan) => (
                <article
                  className={`plan-card${plan.featured ? " plan-card-featured" : ""}`}
                  aria-labelledby={`plan-${plan.id}`}
                  key={plan.id}
                >
                  {plan.featured && (
                    <span className="plan-badge">Mais popular</span>
                  )}
                  <h2 id={`plan-${plan.id}`}>{plan.name}</h2>
                  <p className="plan-price">
                    <data value={plan.price}>{plan.formattedPrice}</data>
                    <span>/mês</span>
                  </p>
                  <p className="plan-description">{plan.description}</p>
                  <ul className="plan-benefits">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                  <a className="button button-small" href={plan.href}>
                    Assinar
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="py-12 sm:py-16" aria-labelledby="testimonials-title">
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                  id="testimonials-title"
                >
                  Depoimentos
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  Veja como o LembraFarma pode ajudar na rotina de uma farmácia.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  name: "Farmácia Exemplo Vida",
                  focus: "Mais proximidade com os clientes",
                  quote:
                    "Com os lembretes, ficou mais fácil manter contato com os clientes e ajudá-los a lembrar da hora de voltar.",
                  initials: "EV",
                  color: "bg-teal-100 text-teal-800",
                },
                {
                  name: "Drogaria Modelo Central",
                  focus: "Rotina mais organizada",
                  quote:
                    "Agora conseguimos visualizar melhor os cadastros e o histórico de compras em um só lugar.",
                  initials: "MC",
                  color: "bg-sky-100 text-sky-800",
                },
                {
                  name: "Farmácia Exemplo Bem-Estar",
                  focus: "Atendimento mais consistente",
                  quote:
                    "As mensagens programadas ajudam nossa equipe a manter um atendimento atencioso mesmo nos dias corridos.",
                  initials: "BE",
                  color: "bg-emerald-100 text-emerald-800",
                },
              ].map((testimonial) => (
                <article
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-950/5 sm:p-7"
                  key={testimonial.name}
                >
                  <span
                    className="text-4xl font-serif leading-none text-teal-600"
                    aria-hidden="true"
                  >
                    ”
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">
                    {testimonial.focus}
                  </h3>
                  <blockquote className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    “{testimonial.quote}”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${testimonial.color}`}
                      aria-hidden="true"
                    >
                      {testimonial.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Farmácia fictícia · exemplo demonstrativo
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/funcionalidades" element={<HomePage />} />
      <Route path="/planos" element={<HomePage />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
