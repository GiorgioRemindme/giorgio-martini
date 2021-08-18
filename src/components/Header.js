import React from 'react'
import { Link } from "gatsby"

const Header = () => {
  return (
    <ul className="list flex justify-center">
      <li><Link className="ph4" to="/">Home</Link></li>
      <li><Link className="ph4" to="/code">Code</Link></li>
      <li><Link className="ph4" to="/blog">Music</Link></li>
      <li><Link className="ph4" to="/blog">Photos</Link></li>
      <li><Link className="ph4" to="/about">About</Link></li>
    </ul>
  )
}

export default Header
