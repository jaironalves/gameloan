import React from 'react'
import Grid from '@material-ui/core/Grid'
import AmountAvailable from './AmountAvailable'
import RecentSales from './RecentSales'

const Dashboard = () => {


  return (
    <Grid container spacing={3}>
      {/* Chart */}
      {/* <Grid item xs={12} sm={matches ? 7 : 12} md={6}>
        <Invoices data={invoiceData} />
      </Grid> */}
      {/* Amount */}
      <Grid item xs={12} sm={8} md={4}>
        <AmountAvailable  />
      </Grid>
      {/* Recent */}
      <Grid item xs={12}>
        <RecentSales />
      </Grid>
    </Grid>
  )
}

export default Dashboard
