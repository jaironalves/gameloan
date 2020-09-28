import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Tooltip from '@material-ui/core/Tooltip'
import { StatusBullet } from 'components'
import { Title } from 'components'
import { NumberHelper, DocumentHelper } from 'src/helpers'
import { RouterLink } from 'src/components'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
    overflow: 'auto',
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}))

const isCanceled = (auth) => Boolean(auth.authorization_canceled)

const statusKey = (auth) => {
  if (isCanceled(auth)) return 'canceled'
  return 'authorized'
}

const statusColors = {
  authorized: 'success',
  canceled_authorized: 'info',
  canceled: 'danger',
}

const statusDescription = {
  authorized: 'Autorizada',
  canceled_authorized: 'info',
  canceled: 'Cancelada',
}

const statusTooltip = {
  authorized: 'Venda autorizada',
  canceled: 'Venda está cancelada',
}

const RecentSales = (props) => {
  const { className, data, ...rest } = props
  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title={<Title>Últimas vendas</Title>}
        action={
          <Button
            color="primary"
            component={RouterLink}
            size="small"
            to="vendas"
            variant="contained"
          >
            Ver mais <ArrowRightIcon />
          </Button>
        }
        disableTypography={true}
      />
      <Divider />
      <CardContent className={classes.content}>
        <TableContainer className={classes.container}>
          <Table stickyHeader size="small" className={classes.inner}>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell align="right">Venda</TableCell>
                <TableCell>Parceiro</TableCell>
                <TableCell align="center">CPF/CNPJ</TableCell>
                <TableCell align="center">Data/Hora</TableCell>
                <TableCell align="right">R$ Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(data.rows).map((auth, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Tooltip enterDelay={300} title={statusTooltip[statusKey(auth)]}>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[statusKey(auth)]}
                          size="sm"
                        />
                        {statusDescription[statusKey(auth)]}
                      </div>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">{auth.number}</TableCell>
                  <TableCell>{auth.partner.fantasy_name}</TableCell>
                  <TableCell align="center">
                    {DocumentHelper.hideCpfOrCnpj(auth.partner.cnpj)}
                  </TableCell>
                  <TableCell align="center">
                    {moment(auth.date_time).format('DD-MM-YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align="right">{NumberHelper.toCurrency(auth.amount, false)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

RecentSales.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
}

export default RecentSales
