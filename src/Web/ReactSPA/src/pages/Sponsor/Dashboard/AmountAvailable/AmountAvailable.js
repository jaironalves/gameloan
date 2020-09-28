import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import MoneyIcon from '@material-ui/icons/Money'
import Skeleton from '@material-ui/lab/Skeleton'
import { Title } from 'components'
import { NumberHelper } from 'helpers'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  valueContainer: {
    height: 50,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 50,
    width: 50,
  },
  icon: {
    height: 32,
    width: 32,
  },
  percentContainer: {
    marginTop: theme.spacing(1),
    height: 24,
  },
  percentIcon: {
    color: theme.palette.primary.main,
  },
  percentValue: {
    marginLeft: theme.spacing(1) / 2,
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}))

const AmountAvailable = (props) => {
  const { className, data, isLoading, ...rest } = props

  const getAmountAvailable = () => {
    if (data) return data.currentStatement ? data.currentStatement.current_balance : 0

    return 0
  }

  const amount = getAmountAvailable()
  const classes = useStyles()

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={<Title>Saldo Conta</Title>} />
      <Divider />
      <CardContent>
        {isLoading ? (
          <React.Fragment>
            <Skeleton animation="wave" className={classes.valueContainer} />
            <Skeleton animation="wave" className={classes.percentContainer} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid
              container
              alignItems="center"
              className={classes.valueContainer}
              justify="space-between"
            >
              <Grid item>
                <Typography variant="h4">{NumberHelper.toCurrency(amount)}</Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <MoneyIcon className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  )
}

AmountAvailable.propTypes = {
  className: PropTypes.string,
}

export default AmountAvailable
