import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";


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
    description:
      "Essencial - Envio de lembretes pelo WhatsApp. - Cálculo da previsão de quando o medicamento acabará. - Mensagens personalizadas para cada cliente. - Agendamento dos lembretes por data.",
  },
  {
    title: "2. Gestão de clientes",
    image: "/assets/Clientes.jfif",
    alt: "Gestão de clientes da farmácia",
    description:
      "Essencial - Cadastro de nome, telefone e preferências. - Histórico de compras. - Identificação de clientes ativos e inativos. - Busca rápida de clientes cadastrados.",
  },
  {
    title: "3. Controle de produtos e compras",
    image: "/assets/Compras.jfif",
    alt: "Controle de produtos e compras",
    description:
      "Cadastro de medicamentos e produtos. Registro de compras realizadas. Estimativa de recompra com base no consumo informado. Consulta de disponibilidade de produtos, se integrada ao estoque.",
  },
  {
    title: "4. Assistente de inteligência artificial",
    image: "/assets/Gestao.jfif",
    alt: "Assistente de inteligência artificial",
    description:
      "Respostas para dúvidas frequentes. Informações sobre horário de funcionamento. Orientação sobre disponibilidade de produtos. Encaminhamento para um atendente humano.",
  },
  {
    title: "5. Relatórios e indicadores",
    image: "/assets/Gestao.jfif",
    alt: "Relatórios e indicadores da farmácia",
    description:
      "Total de clientes cadastrados. Lembretes enviados e pendentes. Taxa de respostas dos clientes. Clientes que voltaram a comprar. Desempenho das campanhas de relacionamento.",
  },
  {
    title: "6. Automação e configurações",
    image: "/assets/Lembrete.png",
    alt: "Automação e configurações",
    description:
      "Configuração dos horários de envio. Modelos de mensagens personalizadas. Controle de usuários e permissões. Integração com WhatsApp e outros sistemas compatíveis.",
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
                  <a
                    className="button button-small"
                    href={plan.href}
                  >
                    Assinar
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="Funcionalidade">
            <h1 className="feature-details-title" id="Funcionalidade">
              Funcionalidades
            </h1>
            <div className="feature-details">
              {features.map((feature) => (
                <section className="feature-detail" key={feature.title}>
                  <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
                    <div className="md:flex">
                      <div className="md:shrink-0">
                        <img
                          className="h-48 w-full object-cover md:h-full md:w-48"
                          src={feature.image}
                          alt={feature.alt}
                        />
                      </div>
                      <div className="p-8">
                        <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                          {feature.title}
                        </div>
                        <p className="mt-2 text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </section>
        </section>
        
      </main>

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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
