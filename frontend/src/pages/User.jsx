import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendURL } from '../App';

function User() {

    const [session, setSession] = useState('');
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [file, setFile] = useState("");
    const [choice, setChoice] = useState("Students");
    const [students, setStudents] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            return toast.error('upload file first')
        }

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`${backendURL}/users/upload`, formData, {
                headers: {
                    "Content-Type": "multipart-form-data"
                },
                withCredentials: true
            });
            if (!response.data.success) {
                return toast.error(response.data.message);
            }

            toast.success(response.data.message)

        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error, try after sometime!')
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get(`${backendURL}/users/getallusers`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,

            })
            setUsers(data.users);
            setStudents(data.students);
        }
        fetchUsers();
    })
    return (
        <>
            <Header />
            <div className='flex items-start w-full'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-4/5 p-4'>
                    <div className='text-xl font-semibold '>
                        <select className='border border-black rounded-md p-2' name="" value={choice} onChange={(e)=>setChoice(e.target.value)}  id="">
                            <option value="Students">Students</option>
                            <option value="Users">Users</option>
                        </select>
                    </div>
                    <hr />
                    <div className='flex items-center  gap-4'>
                        <form className='flex items-center gap-4 'onSubmit={handleUpload}>

                            {/* <Box sx={{ width: '200px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Session</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={session}
                                        label="Select Assessment"
                                        onChange={(e) => setSession(e.target.value)}
                                    >
                                        <MenuItem value={"2024-25"}>2024-25</MenuItem>
                                        <MenuItem value={"2023-24"}>2023-24</MenuItem>
                                        <MenuItem value={"2022-23"}>2022-23</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box> */}
                            <input type="file" name="file" id="" className='border border-black p-2 rounded-md' onChange={handleFileChange}/>

                            <button className='btn btn-primary' type='submit'>Upload</button>
                        </form>
                    </div>

                    <hr />
                    <div>
                        {users && (
                            <>
                                <table className='w-full table-bordered table table-hover table-striped'>
                                    <thead>
                                        <tr className='py-2 font-semibold'>
                                            <th style={{ backgroundColor: "#f2f2f2" }}>Sr. no</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            {choice == 'Students' ? (<>
                                                <th>Class</th>
                                                <th>Admission No</th>
                                                <th>Contact No</th>
                                            </>) : (<></>)}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {choice == "Users" ? (<>{users.map((element, index) => (<>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{element.name}</td>
                                                <td>{element.role}</td>
                                                <td><button className='btn btn-primary'>View</button></td>
                                            </tr>
                                        </>))}</>) : (<>{students.map((element, index) => (<tr>
                                            <td>{index + 1}</td>
                                            <td>{element.name}</td>
                                            <td>Student</td>
                                            <td>{`${element.Class}-${element.section}`}</td>

                                            <td>{element.AdmissionNo}</td>
                                            <td>{element.ContactNo}</td>
                                            <td><button className='btn btn-primary'>View</button></td>

                                        </tr>)) }</>)}
                                    </tbody>

                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default User