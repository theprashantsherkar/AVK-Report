import { useState } from 'react';
import React from 'react'
import Sidebar from '../components/Sidebar'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import Header from '../components/Header.jsx';



function Dashboard() {
    const [assessment, setAssessment] = useState('')    
    const [subject, setSubject] = useState('')    


  return (
      <>
          <div>
              <Header />
              <div className='flex items-start w-full min-h-screen'>
                  <div className='w-1/6'>
                      <Sidebar />
                  </div>
                  <div className='w-4/5 p-4'>
                      <div className='text-3xl font-semibold '>
                          All Assessment
                      </div>
                      <hr />
                      <div className='flex items-center justify-start gap-4'>
                          <Box sx={{ width: '300px' }}>
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Select Assessment</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={assessment}
                                      label="Select Assessment"
                                      onChange={(e)=>setAssessment(e.target.value)}
                                  >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                              </FormControl>
                          </Box>

                          <Box sx={{ width: "300px" }}>
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={subject}
                                      label="Select Subject"
                                      onChange={(e)=>setSubject(e.target.value)}
                                  >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                              </FormControl>
                          </Box>

                          <button className='btn btn-primary'>Show</button>
                      </div>
                      <hr />
                      <div className='flex items-center justify-between text-xl font-semibold'>
                          <div>Assessment Title:{ }</div>
                          <div>Subject Name:{ }</div>
                          <button className='btn btn-danger'>Update All</button>
                      </div>
                      <hr />
                      <div className='w-full'>
                          <table className='w-full table table-striped table-hover'>
                              <thead className=''>
                                  <tr className='py-2 text-center'>
                                      <th scope='col'>Roll no</th>
                                      <th scope='col'>Class</th>
                                      <th scope='col'>Section</th>
                                      <th scope='col'>title</th>
                                      <th scope='col'>Grades</th>
                                  </tr>
                              </thead>
                              <tbody className='py-2 table-group-divider'>
                                  <tr className='text-center'>
                                      <td scope='row'>1</td>
                                      <td>Class 5</td>
                                      <td>A</td>
                                      <td>This is a title</td>
                                      <td>A </td>
                                  </tr>
                                  <tr className='text-center'>
                                      <td scope='row'>2</td>
                                      <td>Class 5</td>
                                      <td>A</td>
                                      <td>This is a second</td>
                                      <td>A </td>
                                  </tr>
                                  <tr className='text-center'>
                                      <td scope='row'>3</td>
                                      <td>Class 5</td>
                                      <td>A</td>
                                      <td>This is a second</td>
                                      <td>A </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
      </div>
      </>
  )
}

export default Dashboard