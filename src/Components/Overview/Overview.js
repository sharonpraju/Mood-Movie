import React from 'react'
import './Overview.css'

function Overview(prop) {
  return (
    <div className='overview' id="overview">
        <h2>Overview</h2>
        <br></br>
        <p>{prop.overview}</p>
    </div>
  )
}

export default Overview