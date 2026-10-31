import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/contact.css";

const recipient = "lembrafarma@gmail.com";

export default function ContactPage() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const senderName = String(data.get("name") || "").trim();
    const senderEmail = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = [
      `Nome: ${senderName}`,
      `E-mail para resposta: ${senderEmail}`,
      "",
      message,
    ].join("\n");

    setNotice("Abrindo seu aplicativo de e-mail para confirmar o envio.");
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <header className="site-header">
        <nav className="navigation" aria-label="Navegação principal">
          <Link className="brand" to="/" aria-label="LembraFarma - início">
            <img src="/assets/Logo.png" alt="" />
            <span>LembraFarma</span>
          </Link>
        </nav>
      </header>
      <main className="page-shell">
        <section className="page-panel contact-panel" aria-labelledby="contact-title">
          <div className="page-heading">
            <p className="eyebrow">Estamos aqui para ajudar</p>
            <h1 id="contact-title">Fale com a LembraFarma</h1>
            <p className="contact-description">
              Envie sua dúvida, sugestão ou solicitação. Nossa equipe ficará feliz
              em conversar com você.
            </p>
          </div>
          <form id="contact-form" className="contact-card" onSubmit={handleSubmit}>
            <div className="contact-card-body">
              <div className="contact-field">
                <label htmlFor="contact-name">Nome</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" maxLength="120" required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Seu e-mail</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" maxLength="254" aria-describedby="contact-email-help" required />
                <small id="contact-email-help">Usaremos este endereço para que a equipe possa responder.</small>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-subject">Assunto</label>
                <input id="contact-subject" name="subject" type="text" maxLength="160" required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message">Mensagem</label>
                <textarea id="contact-message" name="message" rows="6" maxLength="5000" required />
              </div>
              <div className="contact-note" role="note">
                Ao continuar, seu aplicativo de e-mail será aberto com a mensagem
                pronta para envio para{" "}
                <a href={`mailto:${recipient}`}>{recipient}</a>. Você precisará
                confirmar o envio por lá.
              </div>
              {notice && <p role="status">{notice}</p>}
              <button className="button contact-submit" type="submit">Preparar e-mail</button>
            </div>
          </form>
        </section>
      </main>
      <footer className="site-footer">
        <Link className="footer-brand" to="/" aria-label="LembraFarma - voltar ao início">
          <img src="/assets/Logo.png" alt="" />
          <span>LembraFarma</span>
        </Link>
        <p>Mais que um sistema, um parceiro da sua farmácia.</p>
      </footer>
    </>
  );
}
