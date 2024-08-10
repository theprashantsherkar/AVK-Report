import { useState } from 'react';
import React from 'react'
import Sidebar from '../components/Sidebar'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

function Subject() {
    const [subject, setSubject] = useState('');


    return (
        <>
            <div>
                <div className='flex items-start w-full min-h-screen'>
                    <div className='w-1/6'>
                        <Sidebar />
                    </div>
                    <div className='w-5/6 p-4'>
                        <div className='text-3xl font-semibold '>
                            Add Subjects
                        </div>
                        <hr />
                        <div className='flex items-center  gap-4'>
                            <Box sx={{ width: '300px' }}>
                                <FormControl fullWidth>
                                    <TextField id="outlined-basic" label="Add Subject" variant="outlined" fullWidth  value={subject} onChange={(e) => setSubject(e.target.value)} />
                                </FormControl>
                            </Box>


                            <button className='btn btn-primary'>Save Subject</button>
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

export default Subject;