import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import ReactDOM from 'react-dom'

import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  )
}

export default App
