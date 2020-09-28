import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactTextMask from 'react-text-mask'
import createNumberMask from './createNumberMask'
import createFormatMask from './createFormatMask'
import { NumberHelper, defaults } from 'helpers'

const digitRegExp = /\d/

const createFormatNumberMaskParam = (
  param = {
    locale: defaults.locale,
    includeThousandsSeparator: true,
    decimalLimit: 2,
    alwaysShowDecimal: true,
  }
) => {
  const { locale, prefix, ...rest } = param
  const numberFormat = NumberHelper.getNumberFormat(locale)
  let prefixReturn = prefix
  if (prefixReturn === undefined) prefixReturn = numberFormat.currencySymbol
  const returnvalue = {
    ...rest,
    prefix: prefixReturn,
    thousandsSeparatorSymbol: numberFormat.thousandSeparator,
    decimalSymbol: numberFormat.decimalSeparator,
  }
  return returnvalue
}

const InputMask = ({
  inputRef,
  numberMaskParams,
  onChange,
  onKeyDown,
  style,
  typeMask,
  ...other
}) => {
  const [value, setValue] = useState('')
  const [moveSelection, setMoveSelection] = useState(false)

  const isNumberMask = () => typeMask === 'number'
  const isNumberMaskRightToLeft = () =>
    isNumberMask() && numberMaskParams && numberMaskParams.rightToLeft

  const styleProp = {
    ...(style || {}),
    ...((isNumberMaskRightToLeft() && { textAlign: 'right' }) || {}),
  }

  const mask = isNumberMask()
    ? createNumberMask(createFormatNumberMaskParam(numberMaskParams))
    : createFormatMask(typeMask)

  const handleKeyDown = evt => {
    if (isNumberMask()) setMoveSelection(digitRegExp.test(evt.key))
    if (onKeyDown) onKeyDown(evt)
  }

  const handleChange = evt => {
    if (isNumberMask()) {
      if (value === event.target.value && moveSelection) {
        let increment = 1
        if (value[evt.target.selectionStart] === '.') increment++
        if (value[evt.target.selectionStart] === ',') increment++

        evt.target.selectionStart = event.target.selectionStart + increment
        evt.target.selectionEnd = event.target.selectionStart
      }
      setValue(evt.target.value)
    }
    if (onChange) onChange(evt)
  }

  return (
    <ReactTextMask
      {...other}
      mask={mask}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      placeholderChar={'\u2000'}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      style={styleProp}
    />
  )
}

InputMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
  typeMask: PropTypes.string.isRequired,
  numberMaskParams: PropTypes.object,
}

InputMask.defaultProps = {
  guide: true,
}

export default InputMask
