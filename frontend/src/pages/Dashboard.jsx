import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Sidebar from '../components/Sidebar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import Header from '../components/Header.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import { backendURL } from '../App.jsx';
import { LoginContext } from '../main.jsx';

function Dashboard() {
    const [ClassList, setClassList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subject, setSubject] = useState('');
    const { user } = useContext(LoginContext);
    const [Class, section, title] = selectedClass.split(' - ');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                if (!user || !user.name) {
                    toast.error('User not found or not logged in');
                    return;
                }

                const response = await axios.post(`${backendURL}/teacher/classes/`, {
                    teacher: user.name,
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });

                if (response.data.success) {
                    setClassList(response.data.classes);
                }

            } catch (error) {
                console.error('Error fetching classes:', error);

            }
        };

        fetchClasses();

       
    }, [user]);
    
    const showHandler = async () => {
        try {
            const response = await axios.post(`${backendURL}/teacher/students`, {
                combined:selectedClass,
                subject:subject
            }, {
                headers: {
                    "Content-Type":"application/json"
                },
                withCredentials: true,
            })
            if (!response.data.success) {
                return toast.error("No students Found");
            }
            setTimeout(() => toast.success(response.data.message), 1000);
            setStudentList(response.data.student);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.post(`${backendURL}/teacher/subjects`, {
                    Combined: ClassList,

                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,

                })
                setSubjectList(response.data.names);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSubjects();
    }, [selectedClass]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
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
                            All Assessment
                        </div>
                        <hr />
                        <div className='flex items-center justify-start gap-4'>
                            <Box sx={{ width: '300px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedClass}
                                        label="Select Class"
                                        onChange={handleClassChange}
                                    >
                                        {ClassList && ClassList.length > 0 ? (
                                            ClassList.map((element, index) => (
                                                <MenuItem key={index} value={element}>
                                                    {element}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No Classes Found</MenuItem>
                                        )}
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
                                        onChange={(e) => setSubject(e.target.value)}
                                    >
                                        {subjectList && subjectList.length > 0 ? (
                                            subjectList.map((element, index) => (
                                                <MenuItem key={index} value={element}>
                                                    {element}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No Subjects Found</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>

                            <button className='btn btn-primary' onClick={showHandler}>Show</button>
                        </div>
                        <hr />
                        <div className='flex items-center justify-between text-xl font-semibold'>
                            <div>Assessment Title: {title} </div>
                            <div>Subject Name: {subject} </div>
                            <button className='btn btn-danger'>Update All</button>
                        </div>
                        <hr />
                        <div className='w-full'>
                            <table className='w-full table table-striped table-hover table-bordered '>
                                <thead className=''>
                                    <tr className='py-2 '>
                                        <th>Roll</th>
                                        <th>Name</th>
                                        <th>Class Section</th>
                                        <th>Max Marks</th>
                                        <th>Marks</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className='py-2 '>
                                    {studentList && studentList.length > 0 ? (<>
                                        {studentList.map((element, index) => (
                                            <tr>
                                                <td>{element.rollNo}</td>
                                                <td>{element.name}</td>
                                                <td>{`${element.Class} ${element.section}`}</td>
                                                <td>{"to be added"}</td>
                                                <td><div className='p-1'><input className='border border-black px-1' type="text" name="" id="" /></div></td>
                                                <td><div className='p-1'><input type="text" className='border border-black px-1' name="" id="" /></div></td>
                                               
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
    );
}

export default Dashboard;
