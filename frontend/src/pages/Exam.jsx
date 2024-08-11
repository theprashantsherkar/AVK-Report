import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '../components/Header';

function Exam() {
    const [Class, setClass] = useState('')
    const [teacher, setTeacher] = useState('')
    const [session, setSession] = useState('');
    const [section, setSection] = useState('');

    const submitHandler = () => {
        window.alert('submit button clicked');
    }

  return (
      <><Header/>
          <div className='flex items-start'>
              <div className='w-1/6'><Sidebar /></div>
              <div className='w-5/6 p-4'>
                  <div className='text-3xl font-semibold'>
                      Create Exam
                  </div>
                  <hr />
                  <div className='flex items-center justify-center'>
                      <div className=''>
                          <Box sx={{ width: '300px', margin:'15px' }}>
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Select Class</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={Class}
                                      label="Select class"
                                      onChange={(e)=>setClass(e.target.value)}
                                  >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                              </FormControl>
                          </Box>

                          <Box sx={{ width: "300px", margin: '15px' }}>
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Select Teacher</InputLabel>

                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={teacher}
                                      label="Select teacher"
                                      onChange={(e)=>setTeacher(e.target.value)}
                                  >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                              </FormControl>
                          </Box>
                      </div>
                      <div>
                          <Box sx={{ width: '300px', margin: '15px' }}>
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Select Section</InputLabel>

                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={section}
                                      label="Select section"
                                      onChange={(e)=>setSection(e.target.value)}
                                  >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                              </FormControl>
                          </Box>

                          <Box sx={{ width: "300px", margin: '15px' }}>
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Select Session</InputLabel>

                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={session}
                                      label="Select session"
                                      onChange={(e)=>setSession(e.target.value)}
                                  >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                              </FormControl>
                          </Box>
                      </div>
                      <button className='btn btn-primary' onClick={submitHandler}>Submit</button>
                  </div>
                  <hr />
                  <div>
                      add data table here
                  </div>
              </div>
      </div>
      </>
  )
}

export default Exam