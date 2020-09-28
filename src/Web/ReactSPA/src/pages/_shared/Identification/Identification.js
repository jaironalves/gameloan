import React, { useState, useRef, useImperativeHandle } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { InputMask } from 'components'
import { isEmailValid, DocumentHelper } from 'helpers'

const useStyles = makeStyles(() => ({
  root: {},
}))

const INITIAL_VALUES = {
  association: false,
  document: '',
  name_01: '',
  name_02: '',
  phone: '',
  email: '',
}

const IdentificationRef = React.forwardRef((props, ref) => {
  const classes = useStyles()

  const { className, onlyCompany, showAssociation } = props

  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState(INITIAL_VALUES)

  const refs = {
    document: useRef(),
    name_01: useRef(),
    name_02: useRef(),
    phone: useRef(),
    email: useRef(),
  }

  const handleChange = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    let error = ''
    if (event.target.name === 'email' && value.length > 0 && !isEmailValid(value)) {
      error = 'E-mail inválido - ex: usuario@provedor.com'
    }

    setValues({
      ...values,
      [event.target.name]: value,
    })

    setErrors({
      ...errors,
      [event.target.name]: error,
    })
  }

  const doValidate = () => {
    let validateErrors = {}
    let focusRef = undefined

    const { document, name_01, name_02, phone, email } = values

    if (!document) {
      validateErrors = { ...validateErrors, document: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.document
      }
    }

    if (document && !isCompany() && !DocumentHelper.isCpf(document)) {
      validateErrors = { ...validateErrors, document: 'CPF inválido' }
      if (!focusRef) {
        focusRef = refs.document
      }
    }

    if (document && isCompany() && !DocumentHelper.isCnpj(document)) {
      validateErrors = { ...validateErrors, document: 'CNPJ inválido' }
      if (!focusRef) {
        focusRef = refs.document
      }
    }

    if (!name_01) {
      validateErrors = { ...validateErrors, name_01: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.name_01
      }
    }

    if (!name_02) {
      validateErrors = { ...validateErrors, name_02: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.name_02
      }
    }

    if (!phone) {
      validateErrors = { ...validateErrors, phone: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.phone
      }
    }

    if (!email) {
      validateErrors = { ...validateErrors, email: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.email
      }
    }

    if (!isEmailValid(email)) {
      validateErrors = { ...validateErrors, email: 'E-mail inválido' }
      if (!focusRef) {
        focusRef = refs.email
      }
    }

    let validated = Object.keys(validateErrors).length === 0

    if (!validated) {
      setErrors({
        ...errors,
        ...validateErrors,
      })
    }

    return {
      validated,
      focusRef,
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      values: {
        ...values,
        isCompany: isCompany(),
        document: values.document.replace(/\D/g, ''),
        phone: values.phone.replace(/\D/g, ''),
      },
      validate: doValidate,
    }),
    [values]
  )

  const isCompany = () => onlyCompany || values.document.replace(/\D/g, '').length > 11

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={2}>
        {showAssociation && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="association"
                  checked={values.association}
                  onChange={handleChange}
                  value="association"
                  color="primary"
                />
              }
              label="Rede de Fidelidade"
            />
          </Grid>
        )}
        <Grid item md={4} xs={12}>
          <TextField
            error={errors.document.length > 0}
            helperText={errors.document}
            fullWidth
            InputProps={{
              inputComponent: InputMask,
              inputProps: {
                guide: false,
                typeMask: onlyCompany ? 'cnpj' : 'cpf_cnpj',
                maxLength: 18,
              },
            }}
            inputRef={refs.document}
            label={onlyCompany ? 'CNPJ' : 'CPF/CNPJ'}
            margin="dense"
            name="document"
            onChange={handleChange}
            required
            type="tel"
            value={values.document}
            variant="outlined"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            error={errors.name_01.length > 0}
            helperText={errors.name_01}
            fullWidth
            inputRef={refs.name_01}
            label={isCompany() ? 'Razão Social' : 'Nome'}
            margin="dense"
            name="name_01"
            onChange={handleChange}
            required
            value={values.name_01}
            variant="outlined"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            error={errors.name_02.length > 0}
            helperText={errors.name_02}
            fullWidth
            inputRef={refs.name_02}
            label={isCompany() ? 'Nome Fantasia' : 'Sobrenome'}
            margin="dense"
            name="name_02"
            onChange={handleChange}
            required
            value={values.name_02}
            variant="outlined"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            error={errors.phone.length > 0}
            helperText={errors.phone}
            fullWidth
            InputProps={{
              inputComponent: InputMask,
              inputProps: { guide: false, maxLength: 15, typeMask: 'phone' },
            }}
            inputRef={refs.phone}
            label="Telefone"
            margin="dense"
            name="phone"
            onChange={handleChange}
            required
            type="tel"
            value={values.phone}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            error={errors.email.length > 0}
            helperText={errors.email}
            fullWidth
            inputRef={refs.email}
            label="Email"
            margin="dense"
            name="email"
            onChange={handleChange}
            required
            value={values.email}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </div>
  )
})

IdentificationRef.displayName = 'Identification'

IdentificationRef.propTypes = {
  className: PropTypes.string,
  onlyCompany: PropTypes.bool,
  showAssociation: PropTypes.bool,
}

const Identification = React.memo(IdentificationRef)
Identification.displayName = 'Identification'

export default Identification
