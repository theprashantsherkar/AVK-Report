import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import '../index.css'
import logo from '../assets/fevicon (1).jpeg';

function Header() {

    const [User, setUser] = useState({});
  return (
      <>
          <div className='bgcolor w-full min-h-max flex items-center justify-between px-3 py-2'>
              <div className='text-white flex gap-2'><img src={logo} className='w-7 h-7' alt="Avid" /><Link className='text-white no-underline text-lg' to={'/home'}>Report Card System</Link></div>
              <div className='text-white flex justify-center items-center gap-5'> 
                  <span>{User.role || `Super Admin`}</span>
                  <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <PersonIcon/>
                      </button>
                      <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to={'/profile'} type="button">View Profile</Link></li>
                          <li><Link className="dropdown-item" to={'/changePassword'} type="button">Change Password</Link></li>
                          <li><Link className="dropdown-item" to={'/login'} type="button">Logout</Link></li>
                      </ul>
                  </div>
              </div>
      </div>
      
      </>
  )
}

export default Header