import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import { NumberHelper } from 'src/helpers'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  containerDivider: {
    display: 'flex',
    alignItems: 'center',
  },
  dividerTransparent: {
    backgroundColor: 'transparent',
  },
  containerInformation: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0, 1.5, 0),
  },
  containerDate: {
    width: 160,
  },
  containerValue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(0.5) * -1,
  },
  arrow: {
    borderColor: `transparent transparent ${theme.palette.action.selected}`,
    borderStyle: 'solid',
    borderWidth: 8,
    height: 0,
    width: 0,
  },
  paper: {
    backgroundColor: theme.palette.action.selected,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.5, 1, 0.25, 1),
    width: 180,
  },
  previousDescription: {
    fontWeight: 500,
  },
  typography: {
    padding: theme.spacing(0, 0.5),
  },
  typographyGreen: {
    color: 'green',
  },
  typographyRed: {
    color: 'red',
  },
}))

const Balance = (props) => {
  const { date, amount, hideDivider } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.containerDivider}>
        <Divider
          className={clsx({
            [classes.dividerTransparent]: hideDivider,
          })}
          orientation="vertical"
          flexItem
        />
      </div>
      <div className={classes.containerInformation}>
        <Chip
          className={classes.containerDate}
          color="primary"
          size="small"
          label={
            (moment(date).isSame(moment(), 'day') ? 'Hoje, ' : '') +
            moment(date).format('DD [de] MMMM')
          }
          variant="outlined"
        />
        {amount && (
          <div className={classes.containerValue}>
            <div className={classes.arrow}></div>
            <Paper className={classes.paper} elevation={2}>
              <Typography
                className={classes.previousDescription}
                component="span"
                variant="caption"
              >
                saldo do dia
              </Typography>
              <Typography
                component="span"
                className={clsx(classes.typography, {
                  [classes.typographyGreen]: amount > 0,
                  [classes.typographyRed]: amount < 0,
                })}
                variant="caption"
              >
                {NumberHelper.toCurrency(amount)}
              </Typography>
            </Paper>
          </div>
        )}
      </div>
    </div>
  )
}

Balance.propTypes = {
  className: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  amount: PropTypes.number,
  hideDivider: PropTypes.bool,
}

export default Balance
