import React from 'react'
import Header from './Header'

const Layout = ({ children, isDarkMode = false, hasFooter = true }) => {
  return (
    <div className="mw8 center layoutWrapper">
      <div className="center">
        <Header isDarkMode={isDarkMode} />
        {children}
        {hasFooter && (
          <p className="f4 b tc pt6 mt6">thisisGiorgio.com</p>
        )}
      </div>
    </div>
  )
}
// check how ken c dodds hace darkmode para no hacer props drill...
export default Layout
