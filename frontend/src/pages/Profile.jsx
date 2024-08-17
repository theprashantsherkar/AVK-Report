import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { LoginContext } from '../main';


function Profile() {
    const { user} = useContext(LoginContext)
   //todo: update user here itself(later part)
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
                  <div className='flex justify-center'>
                      <section className='w-1/2 min-h-max border rounded-md p-3'>
                          <table className=' table table-bordered'>
                              <tr className='py-2'>
                                  <th>Name</th>
                                  <td>
                                      <div className='p-2'>
                                          <input type="text" class="form-control" id="exampleFormControlInput1" value={user.name}></input>
                                      </div>
                                  </td>
                              </tr>
                              <tr className='py-2'>
                                  <th>Email</th>
                                  <td><div className='p-2'>
                                      {user.email}
                                  </div>
                                  </td>
                              </tr>
                              <tr className='py-2'>
                                  <th>Contact no: </th>
                                  <td>
                                      <div className='p-2'>
                                          <input type="text" class="form-control" id="exampleFormControlInput1" value={23511343}></input>
                                      </div>
                                  </td>
                              </tr>
                          </table>
                          <div className='flex justify-center'>
                              <button className='btn btn-primary'>Update</button>

                          </div>
                      </section>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Profile