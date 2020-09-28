const emptyString = ''
const minus = '-'
const minusRegExp = /-/
const nonDigitsRegExp = /\D+/g
const number = 'number'
const digitRegExp = /\d/
const digitRegExpNonZero = /[1-9]/
const caretTrap = '[]'

const createNumberMask = ({
  prefix,
  suffix = emptyString,
  rightToLeft = false,
  ...restOptions
}) => {
  const prefixLength = (prefix && prefix.length) || 0
  const suffixLength = (suffix && suffix.length) || 0

  const numberMask = (rawValue = emptyString) => {
    const { allowDecimal, allowNegative, decimalSymbol } = restOptions
    if (rawValue === emptyString || (rawValue[0] === prefix[0] && rawValue.length === 1)) {
      const mask = prefix
        .split(emptyString)
        .concat([digitRegExp])
        .concat(suffix.split(emptyString))
      return mask
    } else if (rawValue === decimalSymbol && allowDecimal) {
      // @ts-ignore
      return prefix
        .split(emptyString)
        .concat(['0', decimalSymbol, digitRegExp])
        .concat(suffix.split(emptyString))
    }

    if (prefixLength) rawValue = rawValue.slice(prefixLength)

    const isNegative = rawValue[0] === minus && allowNegative
    if (isNegative) {
      rawValue = rawValue.toString().substr(1)
    }

    if (rawValue.slice(suffixLength * -1) === suffix) {
      rawValue = rawValue.slice(0, suffixLength * -1)
    }

    let mask = rightToLeft
      ? numberMaskRightToLeft(rawValue, restOptions)
      : numberMaskLeftToRight(rawValue, restOptions)

    if (prefixLength > 0) {
      mask = prefix.split(emptyString).concat(mask)
    }

    if (isNegative) {
      if (mask.length === prefixLength) {
        mask.push(digitRegExp)
      }
      mask = [minusRegExp].concat(mask)
    }

    if (suffix.length > 0) {
      mask = mask.concat(suffix.split(emptyString))
    }
    return mask
  }
  numberMask.instanceOf = 'createNumberMask'
  return numberMask
}

const numberMaskLeftToRight = (
  rawValue = emptyString,
  {
    thousandsSeparatorSymbol,
    decimalSymbol,
    allowLeadingZeroes = false,
    integerLimit = undefined,
    includeThousandsSeparator = true,
    alwaysShowDecimal = false,
    allowDecimal = false,
    decimalLimit = 2,
  }
) => {
  const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol)
  const hasDecimal = indexOfLastDecimal !== -1
  const hasIntegerLimit = integerLimit && typeof integerLimit === number

  let integerValue = rawValue
    .slice(0, hasDecimal ? indexOfLastDecimal : undefined)
    .replace(nonDigitsRegExp, emptyString)

  let fractionValue =
    hasDecimal && allowDecimal
      ? rawValue.slice(indexOfLastDecimal + 1, rawValue.length)
      : emptyString

  if (!allowLeadingZeroes) {
    integerValue = integerValue.replace(/^0+(0$|[^0])/, '$1')
  }

  if (hasIntegerLimit) {
    const integerOverflow = integerValue.substring(integerLimit)
    integerValue = integerValue.slice(0, integerLimit)
    if (allowDecimal) fractionValue = integerOverflow + fractionValue
  }

  integerValue = includeThousandsSeparator
    ? addThousandsSeparator(integerValue, thousandsSeparatorSymbol)
    : integerValue

  if (allowDecimal && alwaysShowDecimal)
    fractionValue = fractionValue.replace(/^0+|0+$/, emptyString)

  fractionValue = fractionValue.slice(0, decimalLimit)

  const applyAlwaysShowDecimal =
    allowDecimal && alwaysShowDecimal && fractionValue.length < decimalLimit

  let maskInteger = convertToMaskNumber(integerValue, allowLeadingZeroes)
  let maskDecimal = convertToMaskNumber(fractionValue, true)

  if (applyAlwaysShowDecimal) {
    let addMaskCount = decimalLimit - fractionValue.length

    for (let index = 0; index < addMaskCount; index++) {
      maskDecimal = maskDecimal.concat(['0', caretTrap])
    }
  }

  if (maskDecimal.length > 0) {
    if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
      maskDecimal = [caretTrap].concat(maskDecimal)
    }
    maskDecimal = [decimalSymbol, caretTrap].concat(maskDecimal)
  }

  return maskInteger.concat(maskDecimal)
}

const numberMaskRightToLeft = (
  rawValue = emptyString,
  {
    thousandsSeparatorSymbol,
    decimalSymbol,
    allowLeadingZeroes = false,
    integerLimit = undefined,
    includeThousandsSeparator = true,
    alwaysShowDecimal = false,
    allowDecimal = false,
    decimalLimit = 2,
  }
) => {
  rawValue = rawValue.replace(nonDigitsRegExp, emptyString)
  if (!allowLeadingZeroes) {
    rawValue = rawValue.replace(/^0+(0$|[^0])/, '$1')
    if (rawValue === '0') rawValue = ''
  }

  const hasIntegerLimit = integerLimit && typeof integerLimit === number

  let fractionValue =
    allowDecimal && rawValue.length > decimalLimit ? rawValue.slice(decimalLimit * -1) : ''
  let integerValue = rawValue.substring(0, rawValue.length - fractionValue.length)
  if (hasIntegerLimit) {
    integerValue = integerValue.slice(0, integerLimit)
  }

  rawValue = integerValue + fractionValue

  const totalLength = rawValue.length
  const applyAlwaysShowDecimal = allowDecimal && alwaysShowDecimal && totalLength < decimalLimit + 1

  if (allowDecimal) {
    if (applyAlwaysShowDecimal) {
      fractionValue = integerValue
      integerValue = ''
    }
    const putDecimalSymbol = integerValue.length > 0 && fractionValue.length > 0
    rawValue = integerValue + (putDecimalSymbol ? decimalSymbol : '') + fractionValue
    if (rawValue.length === 0) return []
  }

  integerValue = includeThousandsSeparator
    ? addThousandsSeparator(integerValue, thousandsSeparatorSymbol)
    : integerValue

  let maskStart = []
  let maskInteger = convertToMaskNumber(integerValue, allowLeadingZeroes)
  let maskMiddle = []
  let maskDecimal = convertToMaskNumber(fractionValue, maskInteger.length > 0 || allowLeadingZeroes)

  if (applyAlwaysShowDecimal) {
    let addMaskCount = decimalLimit + 1 - totalLength

    maskStart = ['0', caretTrap, decimalSymbol, caretTrap]
    addMaskCount--

    for (let index = 0; index < addMaskCount; index++) {
      maskStart = maskStart.concat(['0', caretTrap])
    }
  } else if (maskDecimal.length > 0) {
    maskMiddle = [decimalSymbol, caretTrap]
  }

  return maskStart.concat(maskInteger, maskMiddle, maskDecimal)
}

const convertToMaskNumber = (number = emptyString, allowLeadingZeroes) => {
  let mask = number
    .split(emptyString)
    .map((char, index) =>
      digitRegExp.test(char)
        ? index === 0 && !allowLeadingZeroes
          ? digitRegExpNonZero
          : digitRegExp
        : char
    )
  return mask
}

const addThousandsSeparator = (n, thousandsSeparatorSymbol) =>
  n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)

export default createNumberMask
