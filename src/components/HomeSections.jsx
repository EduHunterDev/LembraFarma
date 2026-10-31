import React from "react";
import { features, plans } from "../data/homepage.js";

export function FeaturesSection() {
  return (
    <section className="py-8 sm:py-12" aria-labelledby="Funcionalidade">
      <div className="mb-8 max-w-2xl sm:mb-10">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold tracking-wide text-teal-800 uppercase">
          <span
            className="h-1.5 w-1.5 rounded-full bg-teal-500"
            aria-hidden="true"
          />
          Tudo para sua farmácia
        </span>
        <h2
          className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          id="Funcionalidade"
        >
          Funcionalidades
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
          Ferramentas simples para cuidar melhor dos seus clientes e da rotina
          da sua farmácia.
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
  );
}

export function PlansSection() {
  return (
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
  );
}
