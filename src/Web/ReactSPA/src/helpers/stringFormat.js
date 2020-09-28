/**
 * @param {string} cnpj
 */
const formatCnpj = cnpj =>
  cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')

/**
 * @param {string} cpf
 */
const formatCpf = cpf =>
  cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')

/**
 * @param {string} phone
 */
const formatPhone = phone => {
  if (!phone) return ''
  let search = /(\d{2})(\d{5})(\d{4})/g
  if (phone.lenght == 10) search = /(\d{2})(\d{4})(\d{4})/g
  return phone.replace(search, '($1) $2-$3')
}

module.exports = {
  formatCnpj,
  formatCpf,
  formatPhone,
}
