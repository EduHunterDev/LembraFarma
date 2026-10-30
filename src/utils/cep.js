export function mascararCEP(valor) {
  return String(valor ?? '')
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export async function buscarEnderecoPorCEP(cep, signal) {
  const digitos = String(cep ?? '').replace(/\D/g, '')
  if (digitos.length !== 8) throw new Error('CEP inválido')

  const resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`, { signal })
  if (!resposta.ok) throw new Error('Não foi possível consultar o CEP')

  const dados = await resposta.json()
  if (dados.erro) throw new Error('CEP não encontrado')

  return { rua: dados.logradouro ?? '', cidade: dados.localidade ?? '' }
}
