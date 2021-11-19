import React from 'react'
import { Link } from "gatsby"

const Header = ({isDarkMode = false}) => {
  const color = isDarkMode ? "near-black" : "white"
  return (
    <ul className="list flex justify-center">
      <li><Link className={`ph4 ${color} no-underline _pink`} to="/">Home</Link></li>
      <li><Link className={`ph4 ${color} no-underline _pink`} to="/code/">Code</Link></li>
      <li><Link className={`ph4 ${color} no-underline _pink`} to="/music/">Music</Link></li>
      <li><Link className={`ph4 ${color} no-underline _pink`} to="/blog/">Photos</Link></li>
      <li><Link className={`ph4 ${color} no-underline _pink`} to="/about/">About</Link></li>
    </ul>
  )
}

export default Header
