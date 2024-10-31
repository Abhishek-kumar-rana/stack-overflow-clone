import React from 'react'
import "./Rightsidebar.css"
import Widget from './Widget'
import Widgettag from './Widgettag'

function Rightsidebar() {
  return (
    <div>
        <aside className="right-sidebar">
            <Widget/>
            <Widgettag/>
        </aside>
        
    </div>
  )
}

export default Rightsidebar