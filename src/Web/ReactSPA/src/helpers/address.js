export const UFs = [
  { id: 12, value: 'AC', label: 'Acre' },
  { id: 27, value: 'AL', label: 'Alagoas' },
  { id: 16, value: 'AP', label: 'Amapá' },
  { id: 13, value: 'AM', label: 'Amazonas' },
  { id: 29, value: 'BA', label: 'Bahia' },
  { id: 23, value: 'CE', label: 'Ceará' },
  { id: 53, value: 'DF', label: 'Distrito Federal' },
  { id: 32, value: 'ES', label: 'Espírito Santo' },
  { id: 52, value: 'GO', label: 'Goiás' },
  { id: 21, value: 'MA', label: 'Maranhão' },
  { id: 51, value: 'MT', label: 'Mato Grosso' },
  { id: 50, value: 'MS', label: 'Mato Grosso do Sul' },
  { id: 31, value: 'MG', label: 'Minas Gerais' },
  { id: 15, value: 'PA', label: 'Pará' },
  { id: 25, value: 'PB', label: 'Paraíba' },
  { id: 41, value: 'PR', label: 'Paraná' },
  { id: 26, value: 'PE', label: 'Pernambuco' },
  { id: 22, value: 'PI', label: 'Piauí' },
  { id: 33, value: 'RJ', label: 'Rio de Janeiro' },
  { id: 24, value: 'RN', label: 'Rio Grande do Norte' },
  { id: 43, value: 'RS', label: 'Rio Grande do Sul' },
  { id: 11, value: 'RO', label: 'Rondônia' },
  { id: 14, value: 'RR', label: 'Roraima' },
  { id: 42, value: 'SC', label: 'Santa Catarina' },
  { id: 35, value: 'SP', label: 'São Paulo' },
  { id: 28, value: 'SE', label: 'Sergipe' },
  { id: 17, value: 'TO', label: 'Tocantins' },
]

/**
 *
 * @param {string} ufValue
 */
export const getUfIdByValue = ufValue => {
  let found = UFs.find(uf => uf.value === ufValue)
  return found ? found.id : 0
}

/**
 *
 * @param {Number} ufValue
 */
export const getUfValueById = ufId => {
  let found = UFs.find(uf => uf.id === ufId)
  return found ? found.value : ''
}
