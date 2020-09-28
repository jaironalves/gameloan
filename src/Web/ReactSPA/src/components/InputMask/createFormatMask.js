const digitRegExp = /\d/
const OneDigit = [digitRegExp]
const OneDigitNonZero = [/[1-9]/]
const TwoDigits = Array(2).fill(digitRegExp)
const ThreeDigits = Array(3).fill(digitRegExp)
const FourDigits = Array(4).fill(digitRegExp)

const CpfMask = () => [...ThreeDigits, '.', ...ThreeDigits, '.', ...ThreeDigits, '-', ...TwoDigits]

const CnpjMask = () => [
  ...TwoDigits,
  '.',
  ...ThreeDigits,
  '.',
  ...ThreeDigits,
  '/',
  ...TwoDigits,
  ...TwoDigits,
  '-',
  ...TwoDigits,
]

const createFormatMask = typeMask => rawValue => {
  if (!typeMask || typeMask === 'phone') {
    const onlyNumber = rawValue.replace(/\D/g, '')

    let Prefix = ['(', ...OneDigitNonZero, ...OneDigit, ')']
    let Start = [...FourDigits]
    if (onlyNumber.length > 10) Start.push(...OneDigit)

    return [...Prefix, ' ', ...Start, '-', ...FourDigits]
  }

  if (typeMask === 'cep') {
    return [...ThreeDigits, ...TwoDigits, '-', ...ThreeDigits]
  }

  if (typeMask === 'cnpj') {
    return CnpjMask()
  }

  if (typeMask === 'cpf') {
    return CpfMask()
  }

  if (typeMask === 'cpf_cnpj') {
    const onlyNumber = rawValue.replace(/\D/g, '')

    if (onlyNumber.length > 11) return CnpjMask()

    return CpfMask()
  }
}

export default createFormatMask
