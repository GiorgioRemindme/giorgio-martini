
import React from 'react'
import { Link } from "gatsby"


const Header = () => {
  return (
    <ul className="">
      <li className=""><Link className="" to="/">Home</Link></li>
      <li><Link className="" to="/code">Code</Link></li>
      <li><Link className="" to="/blog">Music</Link></li>
      <li><Link className="" to="/blog">Photos</Link></li>
      <li><Link className="" to="/about">About</Link></li>
    </ul>
  )
}

export default Header