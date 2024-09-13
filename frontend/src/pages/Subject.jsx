import { useEffect, useState } from 'react';
import React from 'react'
import Sidebar from '../components/Sidebar'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { backendURL } from '../App';
import toast from 'react-hot-toast';

function Subject() {
    const [subject, setSubject] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [subjectData, setSubjectData] = useState([]);
    const [id, setId] = useState("");

    const handleUpdate = (value, subject, id) => {
        setSubject(subject)
        setIsUpdate(true)
        setId(id);

    }

    const handleSubjects = async (id) => {
        if (isUpdate) {
            const response = await axios.put(`${backendURL}/subject/${id}`, {
                subject: subject,
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                })
            if (!response.data.success) {
                return toast.error(response.data.message)
            }
            toast.success(response.data.message)
            setSubject("");
            setIsUpdate(false);

        } else {
            const { data } = await axios.post(`${backendURL}/subject/addSubject`, {
                subject
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,

            })
            toast.success(data.message);
            setSubject('');
        }
    }

    const removeSubject = async (id) => {
        const res = await axios.delete(`${backendURL}/subject/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        toast.success(res.data.message);

    }

    useEffect(() => {
        const fetchSubjects = async () => {
            const { data } = await axios.get(`${backendURL}/subject/getSubjects`,
                {
                    headers: {
                        "Content-Type": "applcation/json"
                    },
                    withCredentials: true,
                }
            )
            setSubjectData(data.subjects)
        }
        fetchSubjects();
    })

    return (
        <>
            <div>
                <Header />
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
                                    <TextField id="outlined-basic" label="Add Subject" variant="outlined" fullWidth value={subject} onChange={(e) => setSubject(e.target.value)} />
                                </FormControl>
                            </Box>


                            <button className='btn btn-primary' onClick={()=>handleSubjects(id)}>{isUpdate ? "Update Subject" : " Save Subject"}</button>
                        </div>

                        <hr />
                        <div>
                            {subjectData && (
                                <table className='w-full overflow-x-hidden table table-bordered table-hover table-stripped'>
                                    <thead>
                                        <tr className='py-2'>
                                            <th>
                                                #
                                            </th>
                                            <th>Subject</th>
                                            <th>Config</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjectData.map((element, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{element.subject}</td>
                                                <td>
                                                    <button onClick={() => removeSubject(element._id)} className='btn btn-danger p-1'><DeleteForeverIcon /></button>
                                                    {"     "}
                                                    <button className='btn btn-warning p-1' onClick={(e) => handleUpdate(e.target.value, element.subject, element._id)}><EditIcon /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subject;