/**
 * @param {Number} value
 * @param {Number} decimalPlaces default 2
 */
const round10 = (value, decimalPlaces = 2) => {
  var newNumber = new Number(value + '').toFixed(parseInt(decimalPlaces))
  return parseFloat(newNumber)
}

export default round10
