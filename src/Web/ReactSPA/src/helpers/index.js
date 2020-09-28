import { default as stringToNumber } from './stringToNumber'
import { default as getNumberFormat } from './getNumberFormat'
import { default as isCpfValid } from './isCpfValid'
import { default as isCnpjValid } from './isCnpjValid'
import { default as round10 } from './round10'

const ObjectHelper = {
  propertyName: (expression) => /\.([^.;]+);?\s*\}$/.exec(expression.toString())[1],
}

const DocumentHelper = {
  isCnpj: isCnpjValid,
  isCpf: isCpfValid,
  hideCpfOrCnpj: (cpfOrCnpj) => {
    if (isCpfValid(cpfOrCnpj))
      return cpfOrCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.***.***-$4')

    if (isCnpjValid(cpfOrCnpj))
      return cpfOrCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.***.***/$4-$5')

    return ''
  },
}

const StringHelper = {
  toNumber: stringToNumber,
}

const NumberHelper = {
  getNumberFormat,
  round10,
  subtract: (value1, value2) => round10(value1 - value2),
  toCurrency: (number, useCurrency = true) => {
    let options = { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
    if (useCurrency) options = { style: 'currency', currency: 'BRL' }
    return new Intl.NumberFormat('pt-BR', options).format(number)
  },
}

const RandomHelper = {
  randomize: (stringValue, length) => {
    let result = ''
    let validChars = stringValue.replace(/[^a-z0-9]/gi, '')
    let validCharsLength = validChars.length
    for (let i = 0; i < length; i++) {
      result += validChars.charAt(Math.floor(Math.random() * validCharsLength))
    }
    return result
  },
}

export { ObjectHelper }
export { StringHelper }
export { NumberHelper }
export { DocumentHelper }
export { RandomHelper }
export { default as defaults } from './defaults'
export { default as getInitials } from './getInitials'
export { default as isEmailValid } from './isEmailValid'
export { UFs, getUfIdByValue, getUfValueById } from './address'
export { default as compareValues } from './compareValues'
export { default as reduceObject } from './reduceObject'
export { default as pathUp } from './pathUp'
export { formatCnpj, formatCpf, formatPhone } from './stringFormat'
