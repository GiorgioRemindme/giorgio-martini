
import React from 'react'
import { Link } from "gatsby"

const Header = () => {
  return (
    <ul className="list flex justify-center">
      <li><Link className="pa2" to="/">Home</Link></li>
      <li><Link className="pa2" to="/code">Code</Link></li>
      <li><Link className="pa2" to="/blog">Music</Link></li>
      <li><Link className="pa2" to="/blog">Photos</Link></li>
      <li><Link className="pa2" to="/about">About</Link></li>
    </ul>
  )
}

export default Header
