const mod11 = num => num % 11
const NOT = x => !x
const isEqual = a => b => b === a
const mergeDigits = (num1, num2) => `${num1}${num2}`
const getTwoLastDigits = cpf => `${cpf[9]}${cpf[10]}`

/**
 *
 * @param {string} cpf
 */
const getCpfNumeral = cpf => cpf.substr(0, 9).split('')

/**
 *
 * @param {string} str
 */
const isRepeatingChars = str => str.split('').every(elem => elem === str[0])

const toSumOfProducts = multiplier => (result, num, _i) =>
  result + num * multiplier--

const getSumOfProducts = (list, multiplier) =>
  list.reduce(toSumOfProducts(multiplier), 0)

/**
 *
 * @param {Number} multiplier
 */
const getValidationDigit = multiplier => cpf =>
  getDigit(mod11(getSumOfProducts(cpf, multiplier)))

const getDigit = num => (num > 1 ? 11 - num : 0)

const isRepeatingNumbersCpf = isRepeatingChars

/**
 *
 * @param {string} cpf
 */
const isValid = cpf => {
  const CPF = getCpfNumeral(cpf)
  const firstDigit = getValidationDigit(10)(CPF)
  const secondDigit = getValidationDigit(11)(CPF.concat(firstDigit))
  return isEqual(getTwoLastDigits(cpf))(mergeDigits(firstDigit, secondDigit))
}

/**
 *
 * @param {string} CPF
 */
const isCpfValid = CPF => {
  CPF = CPF.replace(/\D/g, '')
  return NOT(isRepeatingNumbersCpf(CPF)) && isValid(CPF)
}

export default isCpfValid
