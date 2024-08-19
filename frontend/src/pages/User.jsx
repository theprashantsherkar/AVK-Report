import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';
import { backendURL } from '../App';

function User() {

    const [session, setSession] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get(`${backendURL}/users/getallusers`, {
                headers: {
                    "Content-Type":"application/json",
                },
                withCredentials: true,

            })

            setUsers(data.users);
        }
        fetchUsers();
    })
    return (
        <>
            <Header/>
            <div className='flex items-start w-full'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-4/5 p-4'>
                    <div className='text-3xl font-semibold '>
                        Users
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
                                    onChange={(e)=>setSession(e.target.value)}
                                >
                                    <MenuItem value={"2024-25"}>2024-25</MenuItem>
                                    <MenuItem value={"2023-24"}>2023-24</MenuItem>
                                    <MenuItem value={"2022-23"}>2022-23</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <input type="file" name="" id="" className='border border-black p-2 rounded-md' />

                        <button className='btn btn-primary'>Upload</button>
                    </div>

                    <hr />
                    <div>
                        {users && (
                            <>
                                <table className='w-full table-bordered table table-hover table-striped'>
                                    <thead>
                                        <tr className='py-2 font-semibold'>
                                            <th>Sr. no</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((element, index) => (<>
                                            <tr>
                                                <td>{ index + 1 }</td>
                                                <td>{ element.name}</td>
                                                <td>{ element.role}</td>
                                        </tr>
                                        </>))}
                                    </tbody>

                                </table>
                            </>
                        ) }
                    </div>
                </div>
            </div>
        </>
    )
}

export default User