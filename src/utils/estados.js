export async function buscarEstados(signal) {
  const resposta = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
    { signal }
  )
  if (!resposta.ok) throw new Error('Não foi possível carregar os estados')

  const dados = await resposta.json()
  return dados.map(({ sigla, nome }) => ({ sigla, nome }))
}
