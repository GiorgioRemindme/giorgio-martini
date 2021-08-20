import React from 'react'
import { Link } from "gatsby"

const Header = ({isDarkMode = false}) => {
  const color = isDarkMode ? "black" : "white"
  return (
    <ul className="list flex justify-center">
      <li><Link className={`ph4 ${color} no-underline`} to="/">Home</Link></li>
      <li><Link className={`ph4 ${color} no-underline`} to="/code">Code</Link></li>
      <li><Link className={`ph4 ${color} no-underline`} to="/blog">Music</Link></li>
      <li><Link className={`ph4 ${color} no-underline`} to="/blog">Photos</Link></li>
      <li><Link className={`ph4 ${color} no-underline`} to="/about">About</Link></li>
    </ul>
  )
}

export default Header
