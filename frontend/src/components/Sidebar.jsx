import React from 'react';
import '../index.css';
import SpeedIcon from '@mui/icons-material/Speed';
import { NavLink } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import DomainAddIcon from '@mui/icons-material/DomainAdd';



function Sidebar() {
  return (
      <>
          <div className='bgcolor w-full min-h-screen py-2 text-md'>
              <ul className='px-2'>
                  <li className='p-2 flex items-center gap-2  hover:bg-gray-500 transition-all'>
                      <a href='/home' className={`text-white no-underline `}><SpeedIcon style={{ color: 'white' }} />{"  "} Dashboard</a ></li>
                  <li className='p-2 flex items-center gap-2 hover:bg-gray-500 transition-all'>
                      <a href='/report' className={`text-white no-underline`}><PictureAsPdfIcon style={{ color: 'white' }} />{"  " }View Reports</a></li>
                  <li className='p-2 flex items-center gap-2 hover:bg-gray-500 transition-all'>
                      <a href='/addsubjects' className={`text-white no-underline`}><AutoStoriesIcon style={{ color: 'white' }} />{"  "}Add Subjects</a></li>
                  <li className='p-2 flex items-center gap-2 hover:bg-gray-500 transition-all'>
                      <a href='/exam' className={`text-white no-underline`}><DomainAddIcon style={{ color: 'white' }} />{"  "}Add Exams</a>
                  </li>
                  <li className='p-2 flex items-center gap-2 hover:bg-gray-500 transition-all'>
                      <a href='/users' className={`text-white no-underline`}><PersonIcon style={{ color: 'white' }} />{"  "}Users</a>
                  </li>
              </ul>
      </div>
      </>
  )
}

export default Sidebar

