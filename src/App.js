import React from 'react'
import { SubstrateContextProvider } from './substrate-lib';

import Layout from './Layout'

function App() {
  return (
    <SubstrateContextProvider>
      <Layout />
    </SubstrateContextProvider>
  )
}

export default App
