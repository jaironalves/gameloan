import React, { useState, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { InputMask } from 'components'
import { DocumentHelper } from 'helpers'
import { useApiData } from 'hooks'

const INITIAL_VALUES = {
  bankNumber: '',
  document: '',
  account_type: '',
  agency: '',
  account: '',
  account_digit: '',
}

const BankAccountRef = React.forwardRef((props, ref) => {
  const { className, required, requiredIfAnyFilled, authGetToken } = props

  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState(INITIAL_VALUES)
  const [bankOpen, setBankOpen] = useState(false)
  const { isLoading: isLoadingBanks, data: banks } = useApiData(authGetToken, '/bank')

  const isCompany = () => values.document.replace(/\D/g, '').length > 11

  const anyFilledValues = (values) => {
    const { bankNumber, document, account_type, agency, account, account_digit } = values
    return Boolean(bankNumber || document || account_type || agency || account || account_digit)
  }

  const requiredRender = required || (requiredIfAnyFilled && anyFilledValues(values))

  const refs = {
    bankNumber: useRef(),
    document: useRef(),
    agency: useRef(),
    account: useRef(),
    account_digit: useRef(),
  }

  const handleChange = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    }

    setValues({
      ...newValues,
    })

    let newErrors = {
      ...errors,
      [event.target.name]: '',
    }

    if (!required && requiredIfAnyFilled && !anyFilledValues(newValues))
      newErrors = {
        ...INITIAL_VALUES,
      }

    setErrors({
      ...newErrors,
    })
  }

  const handleChangeBank = (_event, value) => {
    const number = (value && value.number) || undefined

    const newValues = {
      ...values,
      bankNumber: number,
    }

    setValues({
      ...newValues,
    })

    let newErrors = {
      ...errors,
      bankNumber: '',
    }

    if (!required && requiredIfAnyFilled && !anyFilledValues(newValues))
      newErrors = {
        ...INITIAL_VALUES,
      }

    setErrors({
      ...newErrors,
    })
  }

  const doValidate = () => {
    let validateErrors = {}
    let focusRef = undefined

    const doValidates = required || (requiredIfAnyFilled && anyFilledValues(values))

    if (!doValidates) {
      return {
        validated: true,
        focusRef,
      }
    }

    const { bankNumber, document, account_type, agency, account, account_digit } = values

    if (!bankNumber) {
      validateErrors = { ...validateErrors, bankNumber: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.bankNumber
      }
    }

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

    if (!account_type) {
      validateErrors = { ...validateErrors, account_type: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.account_type
      }
    }

    if (!agency) {
      validateErrors = { ...validateErrors, agency: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.agency
      }
    }

    if (!account) {
      validateErrors = { ...validateErrors, account: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.account
      }
    }

    if (!account_digit) {
      validateErrors = { ...validateErrors, account_digit: 'Campo obrigatório' }
      if (!focusRef) {
        focusRef = refs.account_digit
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
      },
      validate: doValidate,
    }),
    [values]
  )

  return (
    <Grid className={className} container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <Autocomplete
          open={bankOpen}
          onOpen={() => {
            setBankOpen(true)
          }}
          onClose={() => {
            setBankOpen(false)
          }}
          onChange={handleChangeBank}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => `${option.number} - ${option.name}`}
          options={banks}
          loading={isLoadingBanks}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Banco"
              margin="dense"
              requiredd={requiredRender}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoadingBanks ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          error={errors.document.length > 0}
          fullWidth
          helperText={errors.document}
          requiredd={requiredRender}
          InputProps={{
            inputComponent: InputMask,
            inputProps: {
              guide: false,
              typeMask: 'cpf_cnpj',
              maxLength: 18,
            },
          }}
          inputRef={refs.document}
          label="CPF/CNPJ Titular"
          margin="dense"
          name="document"
          onChange={handleChange}
          type="tel"
          value={values.document}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          error={errors.account_type.length > 0}
          helperText={errors.account_type}
          fullWidth
          label="Tipo de Conta"
          margin="dense"
          name="account_type"
          onChange={handleChange}
          requiredd={requiredRender}
          select
          SelectProps={{ native: true }}
          value={values.account_type}
          variant="outlined"
        >
          <option key="" value="" />
          <option key="CC" value="CC">
            Conta Corrente
          </option>
          <option key="CP" value="CP">
            Conta Poupança
          </option>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TextField
          error={errors.agency.length > 0}
          helperText={errors.agency}
          fullWidth
          inputRef={refs.agency}
          label="Agência"
          margin="dense"
          name="agency"
          onChange={handleChange}
          requiredd={requiredRender}
          value={values.agency}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={9} sm={9} md={4}>
        <TextField
          error={errors.account.length > 0}
          helperText={errors.account}
          fullWidth
          inputRef={refs.account}
          label="Conta"
          margin="dense"
          name="account"
          onChange={handleChange}
          requiredd={requiredRender}
          value={values.account}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3} sm={3} md={2}>
        <TextField
          error={errors.account_digit.length > 0}
          helperText={errors.account_digit}
          fullWidth
          inputRef={refs.account_digit}
          label="Dígito"
          margin="dense"
          name="account_digit"
          onChange={handleChange}
          requiredd={requiredRender}
          value={values.account_digit}
          variant="outlined"
        />
      </Grid>
    </Grid>
  )
})

BankAccountRef.displayName = 'BankAccount'

BankAccountRef.propTypes = {
  className: PropTypes.string,
}

const BankAccount = React.memo(BankAccountRef)
BankAccount.displayName = 'BankAccount'

export default BankAccount
