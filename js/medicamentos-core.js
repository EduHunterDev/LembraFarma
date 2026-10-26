(function (globalScope) {
    function normalizarTexto(valor) {
        return String(valor ?? '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    function validarIntervaloCompra(valor) {
        if (valor === null || valor === undefined || String(valor).trim() === '') {
            return false;
        }

        const texto = String(valor).trim().toLowerCase();
        const valorNumerico = texto.replace(/\s*dias?\s*$/i, '').replace(',', '.');
        const numero = Number(valorNumerico);

        return Number.isInteger(numero) && numero > 0;
    }

    function encontrarClientesPorTermo(clientes, termo) {
        if (!Array.isArray(clientes)) {
            return [];
        }

        const busca = normalizarTexto(termo).replace(/[^a-z0-9]/g, '');
        if (!busca) {
            return clientes.slice();
        }

        return clientes.filter((cliente) => {
            const campos = [
                cliente?.nome,
                cliente?.cpf,
                cliente?.telefone,
                cliente?.email,
                cliente?.id,
            ];

            return campos.some((campo) => {
                const valor = normalizarTexto(campo).replace(/[^a-z0-9]/g, '');
                return valor.includes(busca);
            });
        });
    }

    function montarPayloadMedicamento(dados = {}) {
        const {
            clienteId,
            clienteNome,
            medicamento,
            apresentacao,
            concentracao,
            quantidade,
            unidadeQuantidade,
            intervaloCompra,
            observacoes,
        } = dados;

        if (!clienteId || !clienteNome) {
            throw new Error('Cliente inválido. Selecione um cliente cadastrado antes de continuar.');
        }

        if (!medicamento || !medicamento.registro || !medicamento.nome) {
            throw new Error('Medicamento inválido. Selecione um medicamento validado pela API antes de salvar.');
        }

        if (!apresentacao || !String(apresentacao).trim()) {
            throw new Error('Selecione a apresentação farmacêutica do medicamento.');
        }

        const quantidadeNumero = Number(String(quantidade ?? '').replace(',', '.'));
        if (!Number.isFinite(quantidadeNumero) || quantidadeNumero <= 0) {
            throw new Error('A quantidade adquirida deve ser maior que zero.');
        }

        const textoIntervalo = String(intervaloCompra ?? '').trim().toLowerCase();
        const intervaloDias = Number(textoIntervalo.replace(/\s*dias?\s*$/i, '').replace(',', '.'));

        if (!validarIntervaloCompra(intervaloCompra) || !Number.isInteger(intervaloDias) || intervaloDias <= 0) {
            throw new Error('Informe um intervalo de compra válido em dias.');
        }

        return {
            clienteId,
            clienteNome,
            medicamento: {
                registro: String(medicamento.registro),
                nome: String(medicamento.nome),
                principioAtivo: medicamento.principioAtivo || null,
                concentracao: medicamento.concentracao || concentracao || null,
                formaFarmaceutica: medicamento.formaFarmaceutica || null,
                classificacao: medicamento.classificacao || null,
            },
            apresentacao: String(apresentacao).trim(),
            concentracao: concentracao ? String(concentracao).trim() : null,
            quantidade: quantidadeNumero,
            unidadeQuantidade: unidadeQuantidade ? String(unidadeQuantidade).trim() : 'unidade(s)',
            intervaloCompra: String(intervaloCompra).trim(),
            intervaloCompraDias: intervaloDias,
            observacoes: observacoes ? String(observacoes).trim() : '',
            criadoEm: new Date().toISOString(),
        };
    }

    const api = {
        normalizarTexto,
        validarIntervaloCompra,
        encontrarClientesPorTermo,
        montarPayloadMedicamento,
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    globalScope.MedicamentosCore = api;
}(typeof window !== 'undefined' ? window : globalThis));
