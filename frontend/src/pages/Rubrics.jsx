import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Box, FormControl, TextField } from '@mui/material'
import axios from 'axios'
import { backendURL } from '../App'
import toast from 'react-hot-toast'

function Rubrics({ subject }) {

    const navigate = useNavigate();
    const { id } = useParams();


    const [rubrics, setRubrics] = useState('');
    const [rubricList, setRubricList] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`${backendURL}/assessment/rubrics/${id}`, {
                rubrics
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
            if (!response.data.success) {
                return toast.error("Something Went wrong");
            }
            toast.success(response.data.message);
            setRubricList(response.data.rubrics);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            const loadRubrics = async () => {
                const response = await axios.get(`${backendURL}/assessment/rubrics/${id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                })
                setRubricList(response.data.rubrics);
            }
            loadRubrics();
        } catch (error) {
            console.log(error)
        }
    }, [handleSubmit])

    return (
        <>
            <Header />
            <div className='flex items-start w-full'>
                <div className='w-1/6 min-h-full'><Sidebar /></div>
                <div className='w-5/6 p-4 '>
                    <div className='text-2xl font-semibold flex gap-2 items-center'>
                        <div onClick={() => navigate(-1)} className='max-w-fit p-1 border border-black rounded-full flex items-center hover:cursor-pointer'>
                            <ArrowBackIcon />
                        </div>
                        <span>Manage Rubrics {`(${subject})` || "(subject)"}</span>
                    </div>
                    <hr />

                    <div className='flex items-center justify-start flex-col p-2 gap-2'>
                        <div className='flex items-center gap-3 w-full' >
                            <Box sx={{ width: '300px', marginY: "10px" }}>
                                <FormControl fullWidth>
                                    <TextField id="outlined-basic" label="Select Title" variant="outlined" fullWidth value={rubrics} onChange={(e) => setRubrics(e.target.value)} />
                                </FormControl>
                            </Box>
                            <button className='btn btn-primary' onClick={handleSubmit}>Save</button>
                        </div>
                        <hr />
                        <div className='w-full'>
                            <table className='table table-bordered table-striped table-hover '>
                                <thead>
                                    <tr>
                                        <th>Rubrics</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(rubricList && rubricList.length > 0) ? (<>
                                        {rubricList.map((element, index) => (
                                            <tr>
                                                <td>{element}</td>
                                                <td>Dummy date</td>
                                                <td><button className='btn btn-danger'>Delete</button></td>
                                            </tr>
                                        ))}
                                    </>) : (<></>)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Rubrics