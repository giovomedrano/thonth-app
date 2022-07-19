import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <footer className="footer">
        <p>Made with <span role="img" aria-label="dog">❤️</span> from <a href="https://twitter.com/KleoLabsXYZ">Kleo Labs</a></p>
        <Link to="/about">About THONTH</Link>
    </footer>
  )
}

export default Footer