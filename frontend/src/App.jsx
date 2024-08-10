import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ChangePass from './pages/ChangePass'
import Profile from './pages/Profile'
import Reports from './pages/Reports'
import Exam from './pages/Exam'
import User from './pages/User'

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'



function App() {
  return (
    <>
      <div className='flex'>
        <div><Sidebar/></div>
        <div><Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Dashboard />} />
            <Route path='/changePassword' element={<ChangePass />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/exam' element={<Exam />} />
            <Route path='/users' element={<User />} />

          </Routes>
        </Router></div>
      </div>
    </>
  )
}

export default App