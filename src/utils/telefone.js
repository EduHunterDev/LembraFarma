export function mascararTelefone(valor) {
  const digitos = String(valor ?? '').replace(/\D/g, '').slice(0, 11)

  if (digitos.length <= 2) return digitos.replace(/^(\d+)/, '($1')
  if (digitos.length <= 6) return digitos.replace(/^(\d{2})(\d+)/, '($1) $2')
  if (digitos.length <= 10) return digitos.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3')
  return digitos.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
