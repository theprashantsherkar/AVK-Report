import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'


function Profile() {
    const [user, setUser] = useState({
        name: "Prashant",
        email: "admin@avid.co.in",
        contact: 3724667933,

    });
  return (
      <>
          <Header />
          <div className='flex items-start w-full'>
              <div className='w-1/6'><Sidebar /></div>
              <div className='w-5/6 p-4'>
                  <div className='text-3xl font-semibold '>
                      Profile
                  </div>
                  <hr />
                  <table className='w-full table table-bordered'>
                      <tr className='py-2'>
                        <th>Name</th>
                        <td><input type="text" name="name" value={"Prashant"}  id="" /></td>
                      </tr>
                      <tr className='py-2'>
                        <th>Email</th>  
                        <td>{"admin@avid.co.in"}</td>
                      </tr>
                      <tr className='py-2'>
                        <th>Contact no: </th>
                        <td><input type="text" value={4524234} name='contact'/></td>
                      </tr>
                  </table>
              </div>
          </div>
      </>
  )
}

export default Profile