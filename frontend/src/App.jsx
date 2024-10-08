import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ChangePass from './pages/ChangePass'
import Profile from './pages/Profile'
import Reports from './pages/Reports'
import Exam from './pages/Exam'
import User from './pages/User'
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Subject from './pages/Subject'
import Assessment from './pages/Assessment'
import { LoginContext } from './main'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Rubrics from './pages/Rubrics'
import Dummy from './pages/Dummy'


export const backendURL = 'http://localhost:7000'

function App() {
  const { user, setUser } = useContext(LoginContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendURL}/users/profile`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.data && response.data.User) {
          setUser(response.data.User);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [setUser, user]); // Ensure fetchUser only runs when setUser changes (initially)



  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Dashboard />} />
          <Route path='/changePassword' element={<ChangePass />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/report' element={<Reports />} />
          <Route path='/exam' element={<Exam />} />
          <Route path='/users' element={<User />} />
          <Route path='/assessment/:id' element={<Assessment />} />
          <Route path='/rubrics/:id' element={<Rubrics />} />
          <Route path='/addsubjects' element={<Subject />} />
          <Route path='/Dummy' element={<Dummy />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
