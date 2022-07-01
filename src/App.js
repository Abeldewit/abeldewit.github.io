import React from 'react'

import { Header } from './containers'
import { Navbar, WorkCard } from './components'
import './App.css'

const App = () => {
  return (
    <div className="App">
        <div className="gradient__bg">
          <Navbar />
          <Header />
          <WorkCard />
        </div>
    </div>
  )
}

export default App