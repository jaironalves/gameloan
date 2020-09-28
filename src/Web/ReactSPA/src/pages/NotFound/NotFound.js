import React from 'react'
import PropTypes from 'prop-types'
import NotFound from 'src/components/NotFound'
import { PublicMain } from 'src/layouts'

const PageNotFound = ({ backTo }) => {
  return (
    <PublicMain>
      <NotFound backTo={backTo} />
    </PublicMain>
  )
}

PageNotFound.propTypes = {
  backTo: PropTypes.string,
}

export default PageNotFound
