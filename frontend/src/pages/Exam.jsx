import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { backendURL } from '../App';
import UploadDialog from '../components/UploadDialog';
import toast from 'react-hot-toast';
import { LoginContext } from '../main';

function Exam() {
    const [Class, setClass] = useState('');
    const [teacher, setTeacher] = useState('');
    const [session, setSession] = useState('');
    const [section, setSection] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [examData, setExamData] = useState([]);
    const [names, setNames] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const { canEdit } = useContext(LoginContext);

    const [selectedExamId, setSelectedExamId] = useState(null); 

    const deleteHandler = async (id) => {
        const exam = examData.find(exam => exam._id === id);
        if(!(exam.canDelete)){
            return toast.error('You are not authorized to delete this exam');
        } else {
            const res = await axios.delete(`${backendURL}/exam/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (!res.data.success) {
                return toast.error('Something went wrong');
            }
            toast.success(res.data.message);
            setExamData(examData.filter(exam => exam._id !== id));
        }
    };

    const submitHandler = async () => {
        if (!Class || !teacher || !session || !section) {
            return toast.error('Enter All fields first!');
        }
        const res = await axios.post(`${backendURL}/exam/newExam`, {
            Class,
            teacher,
            session,
            section,
        },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
        toast.success(res.data.message);
        setExamData([...examData, res.data.exam]); // Add the new exam to the state
    };

    const handleAddSubjects = (id) => {
        setSelectedExamId(id);
        setShowDialog(true);
    };

    useEffect(() => {
        const fetchExams = async () => {
            
            try {
                const { data } = await axios.get(`${backendURL}/exam/getExam`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setExamData(data.exams);
            } catch (error) {
                console.log(error);
            }
        };

        fetchExams();
    }, []);

    useEffect(() => {
        async function fetchSubjects() {
            const { data } = await axios.get(`${backendURL}/subject/getSubjects`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            setSubjects(data.subjects);
        }
        fetchSubjects();
    }, []);

    useEffect(() => {
        async function fetchTeachers() {
            const response = await axios.get(`${backendURL}/exam/getTeachers`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            setNames(response.data.names);
        }

        fetchTeachers();
    }, []);

    return (
        <>
            <Header />
            <div className='flex items-start'>
                <div className='w-1/6'><Sidebar /></div>
                <div className='w-5/6 p-4'>
                    <div className='text-3xl font-semibold'>Create Exam</div>
                    <hr />
                    <div className='flex items-center justify-center'>
                        <div className=''>
                            <Box sx={{ width: '300px', margin: '15px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Class}
                                        label="Select class"
                                        onChange={(e) => setClass(e.target.value)}
                                    >
                                        <MenuItem value={"Nursery"}>Nursery</MenuItem>
                                        <MenuItem value={"LKG"}>LKG</MenuItem>
                                        <MenuItem value={'UKG'}>UKG</MenuItem>
                                        <MenuItem value={'Class 1'}>Class 1</MenuItem>
                                        <MenuItem value={'Class 2'}>Class 2</MenuItem>
                                        <MenuItem value={'Class 3'}>Class 3</MenuItem>
                                        <MenuItem value={'Class 4'}>Class 4</MenuItem>
                                        <MenuItem value={'Class 5'}>Class 5</MenuItem>
                                        <MenuItem value={'Class 6'}>Class 6</MenuItem>
                                        <MenuItem value={'Class 7'}>Class 7</MenuItem>
                                        <MenuItem value={'Class 8'}>Class 8</MenuItem>
                                        <MenuItem value={'Class 9'}>Class 9</MenuItem>
                                        <MenuItem value={'Class 10'}>Class 10</MenuItem>
                                        <MenuItem value={'Class 11'}>Class 11</MenuItem>
                                        <MenuItem value={'Class 12'}>Class 12</MenuItem>
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
                                        onChange={(e) => setTeacher(e.target.value)}
                                    >
                                        {names.length > 0 ? (
                                            names.map((element) => (
                                                <MenuItem key={element} value={element}>
                                                    {element}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No teachers found</MenuItem>
                                        )}
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
                                        onChange={(e) => setSection(e.target.value)}
                                    >
                                        <MenuItem value={"A"}>A</MenuItem>
                                        <MenuItem value={"B"}>B</MenuItem>
                                        <MenuItem value={"C"}>C</MenuItem>
                                        <MenuItem value={"D"}>D</MenuItem>
                                        <MenuItem value={"E"}>E</MenuItem>
                                        <MenuItem value={"F"}>F</MenuItem>
                                        <MenuItem value={"G"}>G</MenuItem>

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
                                        onChange={(e) => setSession(e.target.value)}
                                    >
                                        <MenuItem value={"2024-25"}>2024-25</MenuItem>
                                        <MenuItem value={"2023-24"}>2023-24</MenuItem>
                                        <MenuItem value={"2022-23"}>2022-23</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <button className='btn btn-primary' onClick={submitHandler}>Submit</button>
                    </div>
                    <hr />
                    <div>
                        {examData && (
                            <table className='table table-bordered table-hover table-striped w-full overflow-x-hidden'>
                                <thead className='py-2'>
                                    <tr className='py-2'>
                                        <th>Class</th>
                                        <th>Section</th>
                                        <th>Session</th>
                                        <th>Teacher</th>
                                        <th>Created On</th>
                                        <th>Config</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examData.map((element, index) => (
                                        <tr key={index}>
                                            <td>{element.Class}</td>
                                            <td>{element.section}</td>
                                            <td>{element.session}</td>
                                            <td>{element.teacher}</td>
                                            <td>{element.createdAt}</td>
                                            <td>
                                                <Link onClick={() => handleAddSubjects(element._id)}>+Subjects</Link>
                                                <Link to={`/assessment/${element._id}`}>
                                                    <button className='btn btn-danger'>Assessment</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button className='btn btn-danger px-1 py-1' onClick={() => deleteHandler(element._id)}>
                                                    <DeleteForeverIcon />
                                                </button>
                                                <button className='btn btn-warning p-1'>
                                                    <EditIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            {showDialog && selectedExamId && (
                <UploadDialog
                    showDialog={showDialog}
                    id={selectedExamId}
                    setShowDialog={setShowDialog}
                />
            )}
        </>
    );
}

export default Exam;
