import React from 'react'
import Header from './header'

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout 