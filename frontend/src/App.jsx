import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ChangePass from './pages/ChangePass'
import Profile from './pages/Profile'
import Reports from './pages/Reports'
import Exam from './pages/Exam'
import User from './pages/User'
import Header from './components/Header'

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Subject from './pages/Subject'



function App() {
  return (
    <>
      <Router>
        <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Dashboard />} />
            <Route path='/changePassword' element={<ChangePass />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/report' element={<Reports />} />
            <Route path='/exam' element={<Exam />} />
            <Route path='/users' element={<User />} />
          <Route path='/addsubjects' element={<Subject />} />

          </Routes>
        </Router>
  
    </>
  )
}

export default App