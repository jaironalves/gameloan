import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Balance from './Balance'
import Transaction from './Transaction'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
    minHeight: 120,
  },
  container: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
  containerEmpty: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

const Transactions = ({ data, isLoading }) => {
  const classes = useStyles()

  if (!isLoading && Array.from(data).length == 0)
    return (
      <Paper className={classes.root}>
        <Container className={classes.container} maxWidth="sm">
          <div className={classes.containerEmpty}>
            <Typography component="span" variant="body1">
              Não há lançamentos para o período
            </Typography>
          </div>
        </Container>
      </Paper>
    )

  return (
    <Paper className={classes.root}>
      <Container className={classes.container} maxWidth="sm">
        {Array.from(data).map((statement, index) => {
          const lastItem = index + 1 === Array.from(data).length
          return (
            <React.Fragment key={index}>
              <Balance
                amount={statement.current_balance}
                date={moment(statement.date).toDate()}
                hideDivider={index === 0}
              />
              {Array.from(statement.account_transactions).map((transaction, indexTransacation) => {
                const lastItemTransaction =
                  indexTransacation + 1 === Array.from(statement.account_transactions).length
                return (
                  <Transaction
                    key={index}
                    category={transaction.type === 0 ? 'Pagamento' : 'Retirada'}
                    description={transaction.description}
                    amount={transaction.amount * (transaction.type === 0 ? 1 : -1)}
                    marginBottomDense={lastItemTransaction && !lastItem}
                  />
                )
              })}
            </React.Fragment>
          )
        })}
      </Container>
    </Paper>
  )
}

Transactions.propTypes = {
  className: PropTypes.string,
}

export default Transactions
