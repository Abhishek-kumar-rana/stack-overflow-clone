import React from 'react'
// import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
// import Rightsidebar from '../../Comnponent/Rightsidebar/Rightsidebar'
// import Homemainbar from '../../Comnponent/Homemainbar/homemainbar'
import '../../../App.css'
import Leftsidebar from '../../Leftsidebar/Leftsidebar'
import Homemainbar from '../../Homemainbar/Homemainbar'
import Rightsidebar from '../../Rightsidebar/Rightsidebar'

const Home = ({slidein}) => {
  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein}/>
      <div className="home-container-2">
        <Homemainbar/>
        <Rightsidebar />
      </div>
    </div>
  )
}

export default Home