import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function User() {

    const [session, setSession] = useState('');
    return (
        <>
            <div className='flex items-start w-full'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-4/5 p-4'>
                    <div className='text-3xl font-semibold '>
                        Add Subjects
                    </div>
                    <hr />
                    <div className='flex items-center  gap-4'>
                        <Box sx={{ width: '200px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Session</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={session}
                                    label="Select Assessment"
                                    onChange={(e) => setSession(e.target.value)}
                                >
                                    <MenuItem value={2024 - 25}>2024-25</MenuItem>
                                    <MenuItem value={2023 - 24}>2023-24</MenuItem>
                                    <MenuItem value={2022 - 23}>2022-23</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <input type="file" name="" id="" className='border border-black p-2 rounded-md' />

                        <button className='btn btn-primary'>Upload</button>
                    </div>

                    <hr />
                    <div>
                        Add Data Table here.
                    </div>
                </div>
            </div>
        </>
    )
}

export default User