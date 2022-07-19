import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='about'>
        <p>"To hold or not to hold (THONTH)" has one goal: help investors and enthusiast evaluate cryptocurrency projects, using some basic facts / metrics that we believe are useful to make informed decisions.</p>
        <p>Version 1.0.0</p>
        <Link to="/">Go Back</Link>
    </div>
  )
}

export default About