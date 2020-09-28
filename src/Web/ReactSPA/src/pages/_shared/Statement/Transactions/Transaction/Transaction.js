import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
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
    padding: theme.spacing(0.5, 2, 1.5, 2),
  },
  containerInformationTitle: {},
  containerInformationValue: {
    display: 'flex',
  },
  categoryContainer: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  category: {
    backgroundColor: theme.palette.action.selected,
    padding: theme.spacing(0.25, 0, 0, 1),
    width: 100,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    fontWeight: 550,
  },
  description: {
    flex: '1',
    paddingRight: theme.spacing(0.5),
    fontWeight: 500,
  },
  paper: {
    backgroundColor: theme.palette.action.selected,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1, 0.25, 1),
  },
  typography: {
    fontWeight: 500,
  },
  typographyGreen: {
    color: 'green',
  },
  typographyRed: {
    color: 'red',
  },
  marginBottomDense: {
    marginBottom: theme.spacing(3),
  },
}))

const Transaction = (props) => {
  const { category, description, amount, hideDivider, marginBottomDense } = props

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
      <div
        className={clsx(classes.containerInformation, {
          [classes.marginBottomDense]: marginBottomDense,
        })}
      >
        <div className={classes.containerInformationTitle}>
          <div className={classes.categoryContainer}>
            <Typography className={classes.category} component="span" variant="subtitle2">
              {category}
            </Typography>
          </div>
        </div>
        <div className={classes.containerInformationValue}>
          <Typography className={classes.description} component="span" variant="body2">
            {description}
          </Typography>
          <Typography
            component="span"
            className={clsx(classes.typography, {
              [classes.typographyGreen]: amount > 0,
            })}
            variant="body2"
          >
            {NumberHelper.toCurrency(amount)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

Transaction.propTypes = {
  className: PropTypes.string,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  hideDivider: PropTypes.bool,
  marginBottomDense: PropTypes.bool,
}

export default Transaction
