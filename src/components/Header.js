import React from 'react'
import { Link } from "gatsby"
import { activeStyle } from '../utils'

console.log(activeStyle)

const Header = ({isDarkMode}) => {
  const color = isDarkMode ? "_white" : "_pink"
  return (
    <ul className="list flex justify-center mv4 pt2">
      <li><Link activeClassName='activeClassName' className={`f3 ph4 ${color} no-underline`} to="/">Home</Link></li>
      <li><Link activeClassName='activeClassName' className={`f3 ph4 ${color} no-underline`} to="/code/">Code</Link></li>
      <li><Link activeClassName='activeClassName' className={`f3 ph4 ${color} no-underline`} to="/music/">Music</Link></li>
      <li><Link activeClassName='activeClassName' className={`f3 ph4 ${color} no-underline`} to="/blog/">Photos</Link></li>
      <li><Link activeClassName='activeClassName' className={`f3 ph4 ${color} no-underline`} to="/about/">About</Link></li>
    </ul>
  )
}

export default Header
