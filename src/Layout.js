import React, { useState, useEffect, useContext } from 'react'
import { Router, Link, Redirect } from '@reach/router'
import Home from './Home'
import Home2 from './Home2'
import Home3 from './Home3'

function Layout() {
  return (
    <>
        <div>
            <Router style={{ height: '100%' }}>
            <Home path="/" />
            <Home2 path="/home2" />
            <Home3 path="/home3" />
            </Router>
        </div>
        </>
  )
}

export default Layout
