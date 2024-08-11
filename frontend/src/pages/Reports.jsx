import { useState } from 'react';
import React from 'react'
import Sidebar from '../components/Sidebar'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import Header from '../components/Header';

function Reports() {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

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
                          Report Card
                      </div>
                      <hr />
                      <div className='flex items-center  gap-4'>
                          <Box sx={{ width: '300px' }}>
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Select Assessment</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={age}
                                      label="Select Assessment"
                                      onChange={handleChange}
                                  >
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                  </Select>
                              </FormControl>
                          </Box>


                          <button className='btn btn-primary'>Show Result</button>
                      </div>
                      <hr />
                      <div className='flex items-center justify-between text-xl font-semibold'>
                          <div>Assessment Title:{ }</div>
                          <button className='btn btn-warning'>Download Report</button>
                      </div>
                      <hr />
                      <div>
                          Add Data Table here.
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Reports