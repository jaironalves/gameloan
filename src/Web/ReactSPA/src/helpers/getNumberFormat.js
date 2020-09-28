import defaults from './defaults'

const getNumberFormat = ({ locale = defaults.locale, currency = defaults.currency } = {}) => {
  const numberWithGroupAndDecimalSeparator = 1000.1
  const thousandSeparator = Intl.NumberFormat(locale)
    .formatToParts(numberWithGroupAndDecimalSeparator)
    .find(part => part.type === 'group').value

  const decimalSeparator = Intl.NumberFormat(locale)
    .formatToParts(numberWithGroupAndDecimalSeparator)
    .find(part => part.type === 'decimal').value

  const currencySymbol = Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })
    .formatToParts(numberWithGroupAndDecimalSeparator)
    .find(part => part.type === 'currency').value

  return {
    currencySymbol,
    thousandSeparator,
    decimalSeparator,
  }
}

export default getNumberFormat
