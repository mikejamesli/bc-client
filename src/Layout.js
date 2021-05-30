import React, { useState, useEffect, useContext } from 'react'
import { Router, Link, Redirect } from '@reach/router'
import Home from './Home'
import Test from './Test'

function Layout() {
  return (
    <>
        <div>
            <Router style={{ height: '100%' }}>
            <Home path="/" />
            <Test path="/test" />
            </Router>
        </div>
        </>
  )
}

export default Layout
