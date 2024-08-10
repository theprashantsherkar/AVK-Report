import React from 'react';
import '../index.css';
import { NavLink } from 'react-router-dom';


function Sidebar() {
  return (
      <>
          <div className='bgcolor w-1/4 min-h-screen'>
              <NavLink to={'/'}>Dashboard</NavLink>
              <NavLink to={'/report'}>View Reports</NavLink>
              <NavLink to={'/addsubjects'}>Add Subjects</NavLink>
              <NavLink to={'/exams'}>Add Exams</NavLink>
              <NavLink to={'/users'}>Users</NavLink>
      </div>
      </>
  )
}

export default Sidebar