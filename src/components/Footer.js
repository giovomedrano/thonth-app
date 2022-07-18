import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <footer className="footer">
        <p>Made with <span role="img" aria-label="dog">❤️</span> from Kleo Labs</p>
        <p>Copyright &copy; 2022</p>    
        <Link to="/about">About</Link>
    </footer>
  )
}

export default Footer