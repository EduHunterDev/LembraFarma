import React, { useEffect, useMemo, useState } from "react";

const CHAVE_COMPRAS = "lembrafarma-compras";

const clientes = [
    "Maria Oliveira",
    "Arthur Oliveira",
    "Helena Cavalcanti",
    "Gabriel Drummond",
    "Beatriz Fontes",
    "Leonardo Castelo",
    "Alice Prado",
    "Murilo Aguiar",
    "Clara Montenegro",
    "Thiago Viana",
];

const produtos = [
    "Losartana Potássica",
    "Cloridrato de Metformina",
    "Sinvastatina",
    "Levotiroxina Sódica",
    "Cloridrato de Fluoxetina",
    "Omeprazol",
    "Clonazepam (Rivotril)",
    "Sertralina (Cloridrato)",
    "Finasterida",
    "Dutasterida",
];

const dosagens = ["25 mg", "50 mg", "100 mg", "200 mg", "500 mg", "Outra"];

function lerCompras() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(CHAVE_COMPRAS) || "[]",
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

function calcularData(data, duracao) {
    const dias = Number(duracao);

    if (!data || !Number.isInteger(dias) || dias < 1) {
        return "";
    }

    const [ano, mes, dia] = data.split("-").map(Number);
    const resultado = new Date(ano, mes - 1, dia);

    resultado.setDate(resultado.getDate() + dias);

    return [
        resultado.getFullYear(),
        String(resultado.getMonth() + 1).padStart(2, "0"),
        String(resultado.getDate()).padStart(2, "0"),
    ].join("-");
}

function formatarData(data) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function hojeLocal() {
    const hoje = new Date();

    return [
        hoje.getFullYear(),
        String(hoje.getMonth() + 1).padStart(2, "0"),
        String(hoje.getDate()).padStart(2, "0"),
    ].join("-");
}

const formularioInicial = {
    cliente: "",
    produto: "",
    dosagem: "",
    quantidadeCaixas: "",
    dataCompra: "",
    duracao: "",
};

export default function Compras() {
    const [compras, setCompras] = useState(lerCompras);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        if (!mensagem) return;

        const temporizador = setTimeout(() => {
            setMensagem("");
        }, 2500);

        return () => clearTimeout(temporizador);
    }, [mensagem]);

    const dataRecompra = calcularData(
        formulario.dataCompra,
        formulario.duracao,
    );

    const listaOrdenada = useMemo(
        () =>
            [...compras].sort((a, b) =>
                (a.dataRecompra || "").localeCompare(b.dataRecompra || ""),
            ),
        [compras],
    );

    const totalHoje = compras.filter(
        (compra) => compra.dataRecompra === hojeLocal(),
    ).length;

    useEffect(() => {
        localStorage.setItem(CHAVE_COMPRAS, JSON.stringify(compras));
    }, [compras]);

    function atualizarCampo(evento) {
        const { name, value } = evento.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value,
        }));

        setMensagem("");
    }

    function registrarCompra(evento) {
        evento.preventDefault();

        const quantidade = Number(formulario.quantidadeCaixas);
        const duracao = Number(formulario.duracao);

        if (
            !formulario.cliente ||
            !formulario.produto ||
            !formulario.dosagem ||
            !formulario.dataCompra ||
            !Number.isInteger(quantidade) ||
            quantidade < 1 ||
            !Number.isInteger(duracao) ||
            duracao < 1
        ) {
            setMensagem("Confira os dados da compra antes de registrar.");
            return;
        }

        const novaCompra = {
            id: globalThis.crypto?.randomUUID?.() ??
                `${Date.now()}-${Math.random()}`,
            ...formulario,
            quantidadeCaixas: quantidade,
            duracao,
            dataRecompra,
            contato: "Pendente",
        };

        setCompras((anteriores) => [...anteriores, novaCompra]);
        setFormulario(formularioInicial);
        setMensagem("Compra registrada com sucesso!");
    }

    return (
        <main className="page-shell">
            <header className="page-heading">
                <h1>Gestão de Compras</h1>
                <p>
                    Acompanhe as compras registradas e a data estimada
                    para a próxima recompra dos seus clientes.
                </p>
            </header>

            <section className="purchase-stats" aria-label="Resumo das recompras">
                <article className="stat-card">
                    <div className="stat-icon" aria-hidden="true">▦</div>
                    <div>
                        <p>Recompras previstas</p>
                        <strong>{compras.length}</strong>
                        <span>Registros cadastrados</span>
                    </div>
                </article>

                <article className="stat-card">
                    <div className="stat-icon" aria-hidden="true">◷</div>
                    <div>
                        <p>Previstas para hoje</p>
                        <strong>{totalHoje}</strong>
                        <span>Data estimada para hoje</span>
                    </div>
                </article>
            </section>

            <section className="step-grid">
                <form className="form-card" onSubmit={registrarCompra}>
                    <h2>Registrar Compra</h2>

                    <div className="form-grid">
                        <div className="field-group">
                            <label htmlFor="cliente">Cliente</label>
                            <select
                                id="cliente"
                                name="cliente"
                                value={formulario.cliente}
                                onChange={atualizarCampo}
                                required
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente} value={cliente}>
                                        {cliente}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="field-group">
                            <label htmlFor="produto">Produto</label>
                            <select
                                id="produto"
                                name="produto"
                                value={formulario.produto}
                                onChange={atualizarCampo}
                                required
                            >
                                <option value="">Selecione um medicamento</option>
                                {produtos.map((produto) => (
                                    <option key={produto} value={produto}>
                                        {produto}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="field-group">
                            <label htmlFor="dosagem">Dosagem</label>
                            <select
                                id="dosagem"
                                name="dosagem"
                                value={formulario.dosagem}
                                onChange={atualizarCampo}
                                required
                            >
                                <option value="">Selecione a dosagem</option>
                                {dosagens.map((dosagem) => (
                                    <option key={dosagem} value={dosagem}>
                                        {dosagem}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="field-group">
                            <label htmlFor="quantidade-caixas">
                                Quantidade de caixas
                            </label>
                            <input
                                id="quantidade-caixas"
                                name="quantidadeCaixas"
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Ex.: 2"
                                value={formulario.quantidadeCaixas}
                                onChange={atualizarCampo}
                                required
                            />
                        </div>

                        <div className="field-group">
                            <label htmlFor="data-compra">Data da compra</label>
                            <input
                                id="data-compra"
                                name="dataCompra"
                                type="date"
                                value={formulario.dataCompra}
                                onChange={atualizarCampo}
                                required
                            />
                        </div>

                        <div className="field-group">
                            <label htmlFor="duracao">Duração estimada (dias)</label>
                            <input
                                id="duracao"
                                name="duracao"
                                type="number"
                                min="1"
                                step="1"
                                value={formulario.duracao}
                                onChange={atualizarCampo}
                                required
                            />
                        </div>
                    </div>

                    <div
                        id="data-prevista"
                        className={`data-prevista ${dataRecompra ? "data-calculada" : ""}`}
                        aria-live="polite"
                    >
                        <span className="data-icone" aria-hidden="true">▦</span>

                        <div className="data-conteudo">
                            <span className="data-legenda">Próxima recompra estimada</span>

                            <strong>
                                {dataRecompra
                                    ? formatarData(dataRecompra)
                                    : "Aguardando preenchimento"}
                            </strong>

                            <small>
                                {dataRecompra
                                    ? "Previsão calculada com base na duração informada."
                                    : "Informe a data da compra e a duração estimada."}
                            </small>
                        </div>
                    </div>


                    {mensagem && (
                        <div
                            className={`toast ${mensagem === "Compra registrada com sucesso!"
                                    ? "toast-success"
                                    : "toast-error"
                                }`}
                            role="status"
                            aria-live="polite"
                        >
                            <span className="toast-icon" aria-hidden="true">
                                {mensagem === "Compra registrada com sucesso!" ? "✓" : "!"}
                            </span>

                            <span className="toast-message">{mensagem}</span>

                            <button
                                type="button"
                                className="toast-close"
                                aria-label="Fechar notificação"
                                onClick={() => setMensagem("")}
                            >
                                ×
                            </button>
                        </div>
                    )}
                    <button type="submit" className="button">
                        Registrar Compra
                    </button>
                </form>
            </section>

            <section className="panel-card">
                <h2>Próximas recompras</h2>

                <div className="client-list">
                    {listaOrdenada.length === 0 ? (
                        <p className="empty-state">
                            Nenhuma recompra registrada.
                        </p>
                    ) : (
                        listaOrdenada.map((compra) => (
                            <article className="client-item" key={compra.id}>
                                <strong>
                                    {compra.cliente} — {compra.produto}
                                </strong>
                                <span>
                                    {compra.dosagem || "Dosagem não informada"} •{" "}
                                    {compra.quantidadeCaixas ?? "—"} caixa(s)
                                </span>
                                <div className="compra-data">
                                    <span className="compra-data-rotulo">Próxima recompra</span>
                                    <strong>{formatarData(compra.dataRecompra)}</strong>
                                </div>
                                <small>Contato: {compra.contato || "Pendente"}</small>
                            </article>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}

