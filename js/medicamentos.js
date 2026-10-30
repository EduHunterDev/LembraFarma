const DEFAULT_API_KEY = '7f33fbe87caceb2cf6e62813b9accdb3';

const STORAGE_KEYS = {
    clientes: 'lembrafarma.clientes',
    medicamentos: 'lembrafarma.medicamentos',
    apiKey: 'lembrafarma.apiKey',
};

const state = {
    clienteSelecionado: null,
    medicamentoSelecionado: null,
    timeoutBusca: null,
};

function getClientes() {
    try {
        const dados = localStorage.getItem(STORAGE_KEYS.clientes);
        return dados ? JSON.parse(dados) : [];
    } catch (error) {
        console.error('Erro ao ler clientes salvos.', error);
        return [];
    }
}

function ensureDemoClient() {
    const clientes = getClientes();
    if (clientes.length > 0) {
        return clientes;
    }

    const clienteDemo = {
        id: 'cliente-demo',
        nome: 'Cliente Demo',
        cpf: '111.222.333-44',
        telefone: '(11) 98888-8888',
        email: 'cliente@demo.com',
    };

    localStorage.setItem(STORAGE_KEYS.clientes, JSON.stringify([clienteDemo]));
    return [clienteDemo];
}

function salvarClientes(clientes) {
    localStorage.setItem(STORAGE_KEYS.clientes, JSON.stringify(clientes));
}

function getMedicamentos() {
    try {
        const dados = localStorage.getItem(STORAGE_KEYS.medicamentos);
        return dados ? JSON.parse(dados) : [];
    } catch (error) {
        console.error('Erro ao ler medicamentos salvos.', error);
        return [];
    }
}

function salvarMedicamento(payload) {
    const medicamentos = getMedicamentos();
    medicamentos.push(payload);
    localStorage.setItem(STORAGE_KEYS.medicamentos, JSON.stringify(medicamentos));
}

function getApiKey() {
    const chaveSalva = localStorage.getItem(STORAGE_KEYS.apiKey);
    if (chaveSalva && String(chaveSalva).trim()) {
        return String(chaveSalva).trim();
    }

    return DEFAULT_API_KEY.trim() || '';
}

function setApiKey(chave) {
    const valor = String(chave || '').trim();

    if (!valor) {
        if (DEFAULT_API_KEY.trim()) {
            localStorage.setItem(STORAGE_KEYS.apiKey, DEFAULT_API_KEY.trim());
        } else {
            localStorage.removeItem(STORAGE_KEYS.apiKey);
        }
        return;
    }

    localStorage.setItem(STORAGE_KEYS.apiKey, valor);
}

function mostrarMensagem(elemento, mensagem, tipo = 'info') {
    if (!elemento) {
        return;
    }

    elemento.textContent = mensagem;
    elemento.className = `status-message status-${tipo}`;
}

function atualizarVisibilidadeConfiguracaoApi() {
    const box = document.querySelector('.api-config-box');
    if (!box) {
        return;
    }

    const chaveAtiva = getApiKey();
    box.style.display = chaveAtiva ? 'none' : 'block';
}

function selecionarCliente(cliente) {
    state.clienteSelecionado = cliente;

    const clienteCard = document.getElementById('cliente-selecionado');
    if (!clienteCard) {
        return;
    }

    if (!cliente) {
        clienteCard.innerHTML = '<p>Nenhum cliente selecionado.</p>';
        return;
    }

    clienteCard.innerHTML = `
        <div class="selected-client-header">
            <span class="badge badge-success">Cliente confirmado</span>
            <strong>${cliente.nome}</strong>
        </div>
        <ul>
            <li><span>CPF:</span> ${cliente.cpf || 'Não informado'}</li>
            <li><span>Telefone:</span> ${cliente.telefone || 'Não informado'}</li>
            <li><span>E-mail:</span> ${cliente.email || 'Não informado'}</li>
        </ul>
    `;

    const clienteResumo = document.getElementById('cliente-nome-resumo');
    if (clienteResumo) {
        clienteResumo.value = cliente.nome;
    }
}

function renderListaClientes(clientes) {
    const container = document.getElementById('resultado-clientes');
    if (!container) {
        return;
    }

    if (!clientes.length) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Aguardando integração com a aba de clientes.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = clientes
        .slice(0, 6)
        .map(
            (cliente) => `
                <button
                    type="button"
                    class="client-option"
                    data-cliente-id="${cliente.id}"
                    aria-label="Selecionar cliente ${cliente.nome}"
                >
                    <strong>${cliente.nome}</strong>
                    <span>${cliente.cpf || cliente.telefone || 'Cliente cadastrado'}</span>
                </button>
            `
        )
        .join('');

    container.querySelectorAll('.client-option').forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.dataset.clienteId;
            const cliente = getClientes().find((item) => item.id === id);
            if (cliente) {
                selecionarCliente(cliente);
            }
        });
    });
}

function procurarClientes() {
    const input = document.getElementById('cliente-search');
    const clientes = getClientes();

    if (!input) {
        return;
    }

    const busca = input.value.trim();
    const resultados = window.MedicamentosCore
        ? window.MedicamentosCore.encontrarClientesPorTermo(clientes, busca)
        : clientes;

    renderListaClientes(resultados);
}

function limparSelecaoMedicamento() {
    state.medicamentoSelecionado = null;
    const form = document.getElementById('cadastro-medicamento-form');
    if (!form) {
        return;
    }

    form.reset();
    document.getElementById('medicamento-selecionado').innerHTML = '<p>Nenhum medicamento validado selecionado.</p>';
    form.querySelectorAll('.field-error').forEach((element) => {
        element.textContent = '';
    });
}

function renderMedicamentoSelecionado(medicamento) {
    const target = document.getElementById('medicamento-selecionado');
    if (!target) {
        return;
    }

    if (!medicamento) {
        target.innerHTML = '<p>Nenhum medicamento validado selecionado.</p>';
        return;
    }

    target.innerHTML = `
        <div class="selected-medicine-header">
            <span class="badge badge-success">Medicamento validado</span>
            <strong>${medicamento.nome}</strong>
        </div>
        <ul>
            <li><span>Princípio ativo:</span> ${medicamento.principioAtivo || 'Não informado'}</li>
            <li><span>Registro ANVISA:</span> ${medicamento.registro || 'Não informado'}</li>
            <li><span>Concentração:</span> ${medicamento.concentracao || 'Não informado'}</li>
        </ul>
    `;
}

function preencherCamposMedicamento(detalhes) {
    const form = document.getElementById('cadastro-medicamento-form');
    if (!form) {
        return;
    }

    const nomeInput = form.querySelector('[name="nomeMedicamento"]');
    const ativoInput = form.querySelector('[name="principioAtivo"]');
    const concentracaoInput = form.querySelector('[name="concentracao"]');
    const registroInput = form.querySelector('[name="registroAnvisa"]');
    const apresentacaoInput = form.querySelector('[name="apresentacao"]');

    if (nomeInput) nomeInput.value = detalhes.nome || '';
    if (ativoInput) ativoInput.value = detalhes.principioAtivo || '';
    if (concentracaoInput) concentracaoInput.value = detalhes.concentracao || '';
    if (registroInput) registroInput.value = detalhes.registro || '';

    if (apresentacaoInput && detalhes.apresentacaoDisponivel) {
        const opcoes = Array.from(apresentacaoInput.options).map((option) => option.value.toLowerCase());
        const valor = detalhes.apresentacaoDisponivel.toLowerCase();
        if (opcoes.includes(valor)) {
            apresentacaoInput.value = valor;
        }
    }
}

async function buscarDetalhesMedicamento(registro) {
    const apiKey = getApiKey();
    if (!apiKey) {
        return null;
    }

    const url = `https://medicamentos.api.br/api/v1/medicamentos/${registro}?icms=18`;
    const resposta = await fetch(url, {
        headers: {
            'X-API-Key': apiKey,
        },
    });

    if (!resposta.ok) {
        return null;
    }

    const dados = await resposta.json();
    const apresentacaoPadrao = dados?.cmed?.apresentacoes?.[0]?.apresentacao || '';
    const concentracaoPadrao = apresentacaoPadrao.match(/\d+(?:[.,]\d+)?\s*(?:mg|g|mcg|mL|mg\/mL|ui|UI)/i)?.[0] || '';

    return {
        nome: dados?.nome || '',
        principioAtivo: dados?.principioAtivo || '',
        registro: dados?.registro || '',
        concentracao: concentracaoPadrao || dados?.principioAtivo || '',
        apresentacaoDisponivel: apresentacaoPadrao,
    };
}

async function consultarMedicamento() {
    const input = document.getElementById('medicamento-search');
    const lista = document.getElementById('resultado-medicamentos');
    const status = document.getElementById('medicamento-status');

    if (!input || !lista || !status) {
        return;
    }

    const termo = input.value.trim();
    if (termo.length < 2) {
        lista.innerHTML = '';
        mostrarMensagem(status, 'Digite pelo menos 2 caracteres para buscar.', 'info');
        return;
    }

    const apiKey = getApiKey();
    if (!apiKey) {
        lista.innerHTML = '';
        mostrarMensagem(status, 'Configure a chave da API para consultar medicamentos.', 'error');
        return;
    }

    mostrarMensagem(status, 'Consultando medicamento...', 'info');

    const url = new URL('https://medicamentos.api.br/api/v1/medicamentos');
    url.searchParams.set('nome', termo);
    url.searchParams.set('porPagina', '5');

    try {
        const resposta = await fetch(url, {
            headers: {
                'X-API-Key': apiKey,
            },
        });

        if (!resposta.ok) {
            const erro = await resposta.json().catch(() => ({}));
            const codigoErro = erro.erro;
            if (codigoErro === 'nao_autenticado' || codigoErro === 'chave_invalida') {
                throw new Error('Chave inválida ou ausente. Configure a chave local da API antes de consultar medicamentos.');
            }
            throw new Error('Não foi possível realizar a consulta naquele momento.');
        }

        const dados = await resposta.json();
        const resultados = Array.isArray(dados.resultados) ? dados.resultados : [];

        if (!resultados.length) {
            mostrarMensagem(status, 'Medicamento não localizado. Verifique a grafia ou confira as sugestões disponíveis.', 'error');
            lista.innerHTML = '';
            return;
        }

        lista.innerHTML = resultados
            .filter((item, index, array) => array.findIndex((procurado) => procurado.registro === item.registro) === index)
            .slice(0, 6)
            .map(
                (item) => `
                    <button type="button" class="medicine-option" data-registro="${item.registro}">
                        <strong>${item.nome}</strong>
                        <span>${item.principioAtivo || 'Princípio ativo não informado'}</span>
                    </button>
                `
            )
            .join('');

        lista.querySelectorAll('.medicine-option').forEach((botao) => {
            botao.addEventListener('click', async () => {
                const registro = botao.dataset.registro;
                const itemSelecionado = resultados.find((item) => item.registro === registro);
                if (!itemSelecionado) {
                    return;
                }

                mostrarMensagem(status, 'Validando medicamento selecionado...', 'info');
                const detalhes = await buscarDetalhesMedicamento(registro);
                state.medicamentoSelecionado = {
                    ...itemSelecionado,
                    ...(detalhes || {}),
                };
                renderMedicamentoSelecionado(state.medicamentoSelecionado);
                preencherCamposMedicamento(state.medicamentoSelecionado);
                mostrarMensagem(status, 'Medicamento validado com sucesso pela base da ANVISA.', 'success');
            });
        });

        mostrarMensagem(status, `${resultados.length} resultado(s) encontrado(s). Selecione o medicamento correto.`, 'success');
    } catch (error) {
        lista.innerHTML = '';
        mostrarMensagem(status, error.message || 'Não foi possível realizar a consulta naquele momento.', 'error');
    }
}

function validarFormularioMedicamento() {
    const form = document.getElementById('cadastro-medicamento-form');
    if (!form) {
        return false;
    }

    const campos = {
        apresentacao: form.querySelector('[name="apresentacao"]'),
        intervalo: form.querySelector('[name="intervaloCompra"]'),
        quantidade: form.querySelector('[name="quantidadeAdquirida"]'),
        unidade: form.querySelector('[name="unidadeQuantidade"]'),
    };

    const intervaloCustom = form.querySelector('[name="intervaloCustomizado"]');
    let valido = true;

    Object.entries(campos).forEach(([nome, campo]) => {
        const target = form.querySelector(`[data-error="${nome}"]`);
        if (!campo || !target) {
            return;
        }

        if (nome === 'apresentacao' && !campo.value) {
            target.textContent = 'Selecione a apresentação farmacêutica.';
            valido = false;
        } else if (nome === 'intervalo') {
            const valorIntervalo = campo.value === 'outro' ? (intervaloCustom?.value ?? '') : campo.value;
            if (!window.MedicamentosCore.validarIntervaloCompra(valorIntervalo)) {
                target.textContent = 'Informe um intervalo válido em dias.';
                valido = false;
            } else {
                target.textContent = '';
            }
        } else if (nome === 'quantidade' && (Number(campo.value) <= 0 || !campo.value)) {
            target.textContent = 'Quantidade inválida.';
            valido = false;
        } else if (nome === 'unidade' && !campo.value) {
            target.textContent = 'Selecione a unidade.';
            valido = false;
        } else {
            target.textContent = '';
        }
    });

    if (!state.clienteSelecionado) {
        mostrarMensagem(document.getElementById('medicamento-status'), 'Selecione um cliente válido antes de salvar.', 'error');
        return false;
    }

    if (!state.medicamentoSelecionado || !state.medicamentoSelecionado.registro) {
        mostrarMensagem(document.getElementById('medicamento-status'), 'Selecione um medicamento validado pela API antes de salvar.', 'error');
        return false;
    }

    return valido;
}

function salvarMedicamentoFormulario() {
    const form = document.getElementById('cadastro-medicamento-form');
    if (!form) {
        return;
    }

    if (!validarFormularioMedicamento()) {
        return;
    }

    const intervaloSelect = form.querySelector('[name="intervaloCompra"]');
    const intervaloCustom = form.querySelector('[name="intervaloCustomizado"]');
    const valorIntervalo = intervaloSelect.value === 'outro' ? (intervaloCustom?.value ?? '') : intervaloSelect.value;

    const payload = window.MedicamentosCore.montarPayloadMedicamento({
        clienteId: state.clienteSelecionado.id,
        clienteNome: state.clienteSelecionado.nome,
        medicamento: state.medicamentoSelecionado,
        apresentacao: form.querySelector('[name="apresentacao"]').value,
        concentracao: form.querySelector('[name="concentracao"]').value,
        quantidade: form.querySelector('[name="quantidadeAdquirida"]').value,
        unidadeQuantidade: form.querySelector('[name="unidadeQuantidade"]').value,
        intervaloCompra: valorIntervalo,
        observacoes: form.querySelector('[name="observacoes"]').value,
    });

    salvarMedicamento(payload);
    mostrarMensagem(document.getElementById('medicamento-status'), 'Cadastro concluído com sucesso.', 'success');
    form.reset();
    limparSelecaoMedicamento();
    state.medicamentoSelecionado = null;
    document.getElementById('medicamento-selecionado').innerHTML = '<p>Nenhum medicamento validado selecionado.</p>';
}

function inicializarFormularioCliente() {
    const input = document.getElementById('cliente-search');
    const lista = document.getElementById('resultado-clientes');

    if (!input || !lista) {
        return;
    }

    const clientes = ensureDemoClient();
    if (!clientes.length) {
        lista.innerHTML = `
            <div class="empty-state">
                <p>Aguardando integração com a aba de clientes.</p>
            </div>
        `;
        return;
    }

    input.addEventListener('input', () => {
        if (state.timeoutBusca) {
            clearTimeout(state.timeoutBusca);
        }

        state.timeoutBusca = setTimeout(procurarClientes, 180);
    });

    procurarClientes();
}

function inicializarCampoApi() {
    const campo = document.getElementById('api-key-input');
    const botao = document.getElementById('salvar-api-key');
    if (!campo || !botao) {
        return;
    }

    campo.value = getApiKey();
    atualizarVisibilidadeConfiguracaoApi();

    botao.addEventListener('click', () => {
        const valor = String(campo.value || '').trim();
        if (!valor) {
            mostrarMensagem(document.getElementById('medicamento-status'), 'Informe a chave da API antes de salvar.', 'error');
            return;
        }

        setApiKey(valor);
        atualizarVisibilidadeConfiguracaoApi();
        mostrarMensagem(document.getElementById('medicamento-status'), 'Chave da API salva localmente no navegador.', 'success');
    });
}

function inicializarFormularioMedicamento() {
    const form = document.getElementById('cadastro-medicamento-form');
    const botaoSalvar = document.getElementById('salvar-cadastro');
    const botaoBuscar = document.getElementById('buscar-medicamento');
    const inputBusca = document.getElementById('medicamento-search');
    const botaoVoltar = document.getElementById('botao-voltar');
    const botaoCancelar = document.getElementById('botao-cancelar');

    if (!form || !botaoSalvar || !inputBusca || !botaoBuscar) {
        return;
    }

    botaoBuscar.addEventListener('click', consultarMedicamento);
    inputBusca.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            consultarMedicamento();
        }
    });

    botaoSalvar.addEventListener('click', (event) => {
        event.preventDefault();
        salvarMedicamentoFormulario();
    });

    if (botaoCancelar) {
        botaoCancelar.addEventListener('click', () => {
            form.reset();
            state.medicamentoSelecionado = null;
            if (document.getElementById('medicamento-selecionado')) {
                document.getElementById('medicamento-selecionado').innerHTML = '<p>Nenhum medicamento validado selecionado.</p>';
            }
            mostrarMensagem(document.getElementById('medicamento-status'), 'Cadastro cancelado. Você pode iniciar novamente.', 'info');
        });
    }

    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', () => {
            window.history.back();
        });
    }

    const intervalo = form.querySelector('[name="intervaloCompra"]');
    if (intervalo) {
        intervalo.addEventListener('change', () => {
            const valor = intervalo.value;
            const campoCustom = form.querySelector('[name="intervaloCustomizado"]');
            if (campoCustom) {
                campoCustom.disabled = valor !== 'outro';
                if (valor !== 'outro') {
                    campoCustom.value = '';
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ensureDemoClient();
    selecionarCliente(null);
    inicializarFormularioCliente();
    inicializarCampoApi();
    inicializarFormularioMedicamento();
    const status = document.getElementById('medicamento-status');
    if (status) {
        const clientes = getClientes();
        if (clientes.length > 0 && clientes[0].id === 'cliente-demo') {
            mostrarMensagem(status, 'Cliente de demonstração carregado. A integração com a aba de clientes pode substituir este registro quando ela ficar pronta.', 'info');
        } else {
            mostrarMensagem(status, 'Selecione um cliente e valide um medicamento para continuar.', 'info');
        }
    }
});
