import React from 'react'
import Header from './Header'

const Layout = ({ children, isDarkMode }) => {
  return (
    <div className="mw8 center layoutWrapper mb5 pb5">
      <div className="center">
        <Header isDarkMode={isDarkMode} />
        {children}
        {/* <p className="b tc">thisisGiorgio.com</p> */}
      </div>
    </div>
  )
}
// check how ken c dodds hace darkmode para no hacer props drill...
export default Layout
