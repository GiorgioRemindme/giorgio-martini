import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className="mw8 center">
      <div className="center">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
