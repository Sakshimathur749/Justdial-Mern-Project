import React from 'react'
import Bannner from '../Components/Bannner'
import Service from '../Components/Service'
import Blogs from '../Components/Blogs'
import Cards from '../Components/Card'
import TopCities from '../Components/TopCities'
import Emailblock from '../Components/Emailblock'
import HowitsWork from '../Components/HowitsWork'

const Homepage = () => {
  return (
    <div>
      <Bannner/>
      <Service/>
      <Cards/>
      <TopCities/>
      <Emailblock/>
      <HowitsWork/>
      <Blogs/>
    </div>
  )
}

export default Homepage