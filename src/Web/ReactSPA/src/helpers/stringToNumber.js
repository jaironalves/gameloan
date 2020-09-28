import getNumberFormat from './getNumberFormat'

const defaultLocale = 'pt-BR'
const defaultCurrency = 'BRL'
const emptyString = ''

const stringToNumber = (
  stringNumber,
  { locale = defaultLocale, currency = defaultCurrency } = {}
) => {
  const numberFormat = getNumberFormat({ locale, currency })
  const stringToConvert = stringNumber
    .replace(numberFormat.currencySymbol, emptyString)
    .replace(' ', emptyString)
    .replace(numberFormat.thousandSeparator, emptyString)
    .replace(numberFormat.decimalSeparator, '.')
  return Number(stringToConvert)
}

export default stringToNumber
