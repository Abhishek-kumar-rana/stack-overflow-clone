import React from 'react'
import Leftsidebar from '../../Leftsidebar/Leftsidebar'
import Aibot from './Aibot'
import Aibot2 from './Aibot2'

const Overflowai = ({slidein}) => {
    return (
      <div className="home-container-1">
      <Leftsidebar slidein={slidein}/>
      <div className="home-container-2" style={{marginTop:"30px"}}>
          <h1 style={{fontWeight:"400"}}></h1>
          {/* <Aibot/> */}
          <Aibot2/>
          </div>
          </div>
    )
  }

export default Overflowai