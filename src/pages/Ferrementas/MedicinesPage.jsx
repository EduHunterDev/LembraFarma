import React, { useEffect } from "react";
import { inicializarMedicamentos } from "../../../js/medicamentos.js";
import ToolSidebar from "../../components/ToolSidebar.jsx";

const presentations = [
  "Comprimido",
  "Cápsula",
  "Líquido/solução oral",
  "Suspensão oral",
  "Pó para suspensão",
  "Injetável",
  "Gotas",
  "Xarope",
  "Creme ou pomada",
  "Outras apresentações",
];
const quantityUnits = ["comprimidos", "capsulas", "frascos", "mL", "ampolas", "unidade(s)"];

function FieldError({ name }) {
  return <small className="field-error" data-error={name} />;
}

export default function MedicinesPage() {
  useEffect(() => inicializarMedicamentos(), []);

  return (
    <div className="tool-layout">
      <ToolSidebar active="Medicamentos" />
      <main className="tool-layout-content page-shell">
        <section className="page-panel">
        <div className="page-heading">
          <p className="eyebrow">Módulo</p>
          <h1>Cadastro de Medicamentos</h1>
        </div>

        <div className="api-config-box">
          <label htmlFor="api-key-input">Chave da API de medicamentos (valor fixado no código por padrão)</label>
          <div className="api-config-row">
            <input id="api-key-input" type="password" placeholder="Cole sua chave X-API-Key da medicamentos.api.br" />
            <button id="salvar-api-key" className="button button-small" type="button">Salvar</button>
          </div>
          <p className="api-help">
            Se a chave estiver definida no código, a busca funciona sem precisar
            digitar toda vez. Nunca compartilhe a chave em repositórios públicos.
            Gere uma chave gratuita em{" "}
            <a href="https://medicamentos.api.br/api" target="_blank" rel="noreferrer">medicamentos.api.br</a>.
          </p>
        </div>

        <div className="step-grid">
          <section className="panel-card">
            <div className="panel-header"><span className="step-number">1</span><h2>Seleção do cliente</h2></div>
            <div className="client-search-box">
              <label htmlFor="cliente-search">Pesquisar cliente por nome ou CPF</label>
              <input id="cliente-search" type="search" placeholder="Digite o nome ou CPF do cliente" />
            </div>
            <div id="resultado-clientes" className="result-list" aria-live="polite" />
            <div id="cliente-selecionado" className="selected-summary">
              <p>Nenhum cliente selecionado.</p>
            </div>
          </section>

          <section className="panel-card">
            <div className="panel-header"><span className="step-number">2</span><h2>Medicamento validado</h2></div>
            <div className="medicine-search-box">
              <label htmlFor="medicamento-search">Buscar medicamento ou princípio ativo</label>
              <div className="medicine-search-row">
                <input id="medicamento-search" type="search" placeholder="Ex.: loratadina ou amoxicilina" />
                <button id="buscar-medicamento" className="button button-small" type="button">Buscar</button>
              </div>
            </div>
            <div id="resultado-medicamentos" className="result-list" aria-live="polite" />
            <div id="medicamento-selecionado" className="selected-summary">
              <p>Nenhum medicamento validado selecionado.</p>
            </div>
            <div id="medicamento-status" className="status-message status-info" aria-live="polite" />
          </section>
        </div>

        <form id="cadastro-medicamento-form" className="form-card" noValidate>
          <div className="panel-header"><span className="step-number">3</span><h2>Cadastro do medicamento</h2></div>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="cliente-nome-resumo">Cliente vinculado</label>
              <input id="cliente-nome-resumo" type="text" readOnly value="Nenhum cliente selecionado" />
            </div>
            <div className="field-group">
              <label htmlFor="nome-medicamento">Nome do medicamento</label>
              <input id="nome-medicamento" name="nomeMedicamento" type="text" readOnly />
            </div>
            <div className="field-group">
              <label htmlFor="principio-ativo">Princípio ativo</label>
              <input id="principio-ativo" name="principioAtivo" type="text" readOnly />
            </div>
            <div className="field-group">
              <label htmlFor="registro-anvisa">Registro ANVISA</label>
              <input id="registro-anvisa" name="registroAnvisa" type="text" readOnly />
            </div>
            <div className="field-group">
              <label htmlFor="concentracao">Concentração / dose</label>
              <input id="concentracao" name="concentracao" type="text" placeholder="Ex.: 10 mg, 250 mg/5 mL" />
            </div>
            <div className="field-group">
              <label htmlFor="apresentacao">Apresentação farmacêutica</label>
              <select id="apresentacao" name="apresentacao" defaultValue="">
                <option value="">Selecione</option>
                {presentations.map((presentation) => <option key={presentation}>{presentation}</option>)}
              </select>
              <FieldError name="apresentacao" />
            </div>
            <div className="field-group">
              <label htmlFor="quantidade-adquirida">Quantidade adquirida</label>
              <input id="quantidade-adquirida" name="quantidadeAdquirida" type="number" min="1" step="1" placeholder="Ex.: 20" />
              <FieldError name="quantidade" />
            </div>
            <div className="field-group">
              <label htmlFor="unidade-quantidade">Unidade da quantidade</label>
              <select id="unidade-quantidade" name="unidadeQuantidade" defaultValue="">
                <option value="">Selecione</option>
                {quantityUnits.map((unit) => <option key={unit}>{unit}</option>)}
              </select>
              <FieldError name="unidade" />
            </div>
            <div className="field-group">
              <label htmlFor="intervalo-compra">Intervalo de compra</label>
              <select id="intervalo-compra" name="intervaloCompra" defaultValue="">
                <option value="">Selecione</option>
                <option value="30">30 dias</option>
                <option value="45">45 dias</option>
                <option value="60">60 dias</option>
                <option value="90">90 dias</option>
                <option value="outro">Outro intervalo</option>
              </select>
              <FieldError name="intervalo" />
            </div>
            <div className="field-group">
              <label htmlFor="intervalo-customizado">Outro intervalo em dias</label>
              <input id="intervalo-customizado" name="intervaloCustomizado" type="number" min="1" step="1" placeholder="Ex.: 75" disabled />
            </div>
            <div className="field-group field-group-full">
              <label htmlFor="observacoes">Observações</label>
              <textarea id="observacoes" name="observacoes" rows="4" placeholder="Informe observações relevantes, como uso contínuo ou compra por indicação do médico." />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="button button-outline" id="botao-voltar">Voltar</button>
            <button type="button" className="button button-outline" id="botao-cancelar">Cancelar</button>
            <button type="submit" className="button" id="salvar-cadastro">Salvar cadastro</button>
          </div>
        </form>
        </section>
      </main>
    </div>
  );
}
