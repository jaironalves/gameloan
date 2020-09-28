import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Title = (props) => {
  const { data } = props

  const getAccountNumber = () => {
    if (data) return data.number ? data.number.replace(/.{1}$/, '-$&') : '#####-#'

    return '#####-#'
  }

  const getAccountCreateAt = () => {
    if (data) return data.created_at ? moment(data.created_at).format('DD-MM-YYYY') : '##-##-####'

    return '##-##-####'
  }

  const accountNumber = getAccountNumber()
  const accountCreateAt = getAccountCreateAt()

  return (
    <Grid container alignItems="center" justify="space-between">
      <Grid item xs={2}>
        <Typography variant="h6" component="div">
          <Box textAlign="center">Extrato</Box>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography style={{ fontWeight: 600 }} variant="subtitle1" component="div">
          <Box textAlign="center">Conta</Box>
        </Typography>
        <Typography variant="subtitle2" component="div">
          <Box textAlign="center">{accountNumber}</Box>
        </Typography>
        <Typography variant="caption" component="div">
          <Box textAlign="center">Desde {accountCreateAt}</Box>
        </Typography>
      </Grid>
    </Grid>
  )
}

Title.propTypes = {
  className: PropTypes.string,
}

export default Title
