import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { actions } from 'hooks'

const ACTIONS = actions.FILTER_PERIOD

const useStyles = makeStyles((theme) => ({
  root: {},
  filterContent: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2),
  },
  filterPeriod: {
    width: '100%',
    minWidth: 140,
    maxWidth: 234,
  },
}))

const FilterPeriod = (props) => {
  const { className, label, stateFilter, dispatchFilter, ...rest } = props

  const classes = useStyles()

  const sameLineInputs = useMediaQuery('(min-width:620px)')
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Paper className={classes.filterContent}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={sameLineInputs ? 4 : 12} md={3} lg={2}>
            <TextField
              className={clsx({ [classes.filterPeriod]: sameLineInputs })}
              fullWidth={!sameLineInputs}
              select
              label={label}
              value={stateFilter.period}
              onChange={(evt) =>
                dispatchFilter({ type: ACTIONS.PERIOD, payload: evt.target.value })
              }
            >
              <MenuItem value="15">Últimos 15 Dias</MenuItem>
              <MenuItem value="30">Últimos 30 Dias</MenuItem>
              <MenuItem value="90">Últimos 90 Dias</MenuItem>
              <MenuItem value="INT">Intervalo</MenuItem>
            </TextField>
          </Grid>
          {stateFilter.period === 'INT' && (
            <>
              <Grid item xs={12} sm={sameLineInputs ? 4 : 12} md={3} lg={2}>
                <KeyboardDatePicker
                  cancelLabel="Cancelar"
                  clearLabel="Limpar"
                  todayLabel="Hoje"
                  invalidDateMessage="Formato de data inválido"
                  label="Data Inicial"
                  format="DD/MM/YYYY"
                  fullWidth={!sameLineInputs}
                  maxDateMessage='Data máxima permitida é "01-01-2100"'
                  minDateMessage='Data mínima permitida é "01-01-1900"'
                  value={stateFilter.periodStart}
                  onChange={(date) => dispatchFilter({ type: ACTIONS.START, payload: date })}
                />
              </Grid>
              <Grid item xs={12} sm={sameLineInputs ? 4 : 12} md={3} lg={2}>
                <KeyboardDatePicker
                  cancelLabel="Cancelar"
                  clearLabel="Limpar"
                  todayLabel="Hoje"
                  invalidDateMessage="Formato de data inválido"
                  label="Data Final"
                  format="DD/MM/YYYY"
                  fullWidth={!sameLineInputs}
                  maxDateMessage='Data máxima permitida é "01-01-2100"'
                  minDateMessage='Data mínima permitida é "01-01-1900"'
                  value={stateFilter.periodEnd}
                  onChange={(date) => dispatchFilter({ type: ACTIONS.END, payload: date })}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </div>
  )
}

FilterPeriod.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  stateFilter: PropTypes.shape({
    period: PropTypes.string,
    periodStart: PropTypes.objectOf(Date),
    periodEnd: PropTypes.objectOf(Date),
  }).isRequired,
  dispatchFilter: PropTypes.func.isRequired,
}

export default FilterPeriod
