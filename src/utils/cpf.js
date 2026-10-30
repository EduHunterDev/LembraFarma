export function mascararCPF(valor) {
  return String(valor ?? '')
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function validarCPF(cpf) {
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) return false

  const nums = cpf.replace(/\D/g, '')
  if (/^(\d)\1{10}$/.test(nums)) return false

  const calcDigito = (base, pesoInicial) => {
    const soma = [...base].reduce((acc, d, i) => acc + Number(d) * (pesoInicial - i), 0)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }

  return (
    calcDigito(nums.slice(0, 9), 10) === Number(nums[9]) &&
    calcDigito(nums.slice(0, 10), 11) === Number(nums[10])
  )
}
