import React from 'react'
import HomeContent from './Content'
import { PublicMain, PublicMenuValues } from 'src/layouts'

const Home = () => {
  return (
    <PublicMain menuValue={PublicMenuValues.Home}>
      <HomeContent />
    </PublicMain>
  )
}

export default Home
