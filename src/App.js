import React from 'react'
import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Map from './components/Map'
import Home from './components/Home'
import About from './components/About'
import AdminPortalLogin from './components/AdminPortalLogin'
import AdminRegister from './components/AdminRegister'
import Admin from './components/Admin'
import { AuthContext, AuthProvider } from './contexts/auth';

//setting up routes using react router
function App (props) {
  useEffect(() => {
  }, []);

  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<AdminPortalLogin />} />
            <Route path='/admin-portal' element={<RequireAuth><Admin /></RequireAuth>} />
            <Route path='/register' element={<AdminRegister />} />
            <Route path='/map' element={<Map />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App



function RequireAuth({ children }) {
  let auth = useContext(AuthContext);
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}