import React from 'react'
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Map from './components/Map'
import Home from './components/Home'
import About from './components/About'
import AdminPortalLogin from './components/AdminPortalLogin'
import AdminRegister from './components/AdminRegister'
import Admin from './components/Admin'

//setting up routes using react router
function App (props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    document.title = 'Health Care Debt in Vermont';
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<AdminPortalLogin setToken={setToken} />} />
          <Route path='/admin-portal' element={<Admin />} />
          <Route path='/register' element={<AdminRegister />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
