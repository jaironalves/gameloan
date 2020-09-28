import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

const TextFieldPassword = ({ inputRef, InputProps, ...rest }) => {
  const inputRefProp = inputRef || useRef()
  const InputPropsProp = InputProps || {}

  const { style: InputPropsStyle } = InputPropsProp
  const InputPropsPropStyle = InputPropsStyle || {}

  const [showPassword, setShowPassword] = useState(false)
  const [passwordPosition, setPasswordPosition] = useState(-1)
  const [passwordCaretHidden, setPasswordCaretHidden] = useState(false)

  useEffect(() => {
    if (passwordPosition === -1) return

    inputRefProp.current.selectionStart = passwordPosition
    inputRefProp.current.selectionEnd = inputRefProp.current.selectionStart
    setPasswordPosition(-1)
    setPasswordCaretHidden(false)
  }, [passwordPosition])

  return (
    <TextField
      {...rest}
      InputProps={{
        ...InputPropsProp,
        style: passwordCaretHidden
          ? { ...InputPropsPropStyle, color: 'transparent' }
          : { ...InputPropsPropStyle },
        endAdornment: (
          <InputAdornment>
            <IconButton
              aria-label="modificar visibilidade senha"
              onClick={() => {
                setPasswordPosition(inputRefProp.current.selectionStart)
                setShowPassword(!showPassword)
                setPasswordCaretHidden(true)
              }}
              onMouseDown={(evt) => evt.preventDefault()}
              edge="end"
              tabIndex={-1}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputRef={inputRefProp}
      type={showPassword ? 'text' : 'password'}
    />
  )
}

TextFieldPassword.propTypes = {
  inputStyle: PropTypes.object,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  InputProps: PropTypes.object,
}

export default TextFieldPassword
