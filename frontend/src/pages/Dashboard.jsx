import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Sidebar from '../components/Sidebar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, TextField } from '@mui/material';
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
    const [titles, setTitles] = useState([]);
    const [loadRubrics, setLoadRubrics] = useState([]);
    const [ass, setAss] = useState([]);
    const [marks, setMarks] = useState({});
    const [grades, setGrades] = useState({});
    const [remarks, setRemarks] = useState({});
    const [Class, section, title] = selectedClass.split(' - ');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                // if (!user || !user.name) {
                //     toast.error('User not found or not logged in');
                //     return;
                // }

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
                    setAss(response.data.assessment);
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
                combined: selectedClass,
                subject: subject
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (!response.data.success) {
                return toast.error("No students Found");
            }

            setTimeout(() => toast.success(response.data.message), 1000);
            setStudentList(response.data.student);

            const { data } = await axios.get(`${backendURL}assessment/rubrics/${assDetails._id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            setTitles(data.rubrics);
        } catch (error) {
            console.log(error);
        }
    };

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
                });
                setSubjectList(response.data.names);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSubjects();
    }, [selectedClass]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleMarksChange = (studentId, value) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [studentId]: value,
        }));
    };

    const handleGradeChange = (studentId, rubricIndex, value) => {
        setGrades(prevGrades => ({
            ...prevGrades,
            [studentId]: {
                ...prevGrades[studentId],
                [rubricIndex]: value,
            },
        }));
    };

    const handleRemarksChange = (studentId, value) => {
        setRemarks(prevRemarks => ({
            ...prevRemarks,
            [studentId]: value,
        }));
    };

    const assDetails = ass.find(exam => exam.Class === Class && exam.section === section && exam.title === title) || {};

    console.log(assDetails);

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
                            <table className='w-full table table-striped table-hover table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Roll</th>
                                        <th>Name</th>
                                        <th>Class Section</th>
                                        {assDetails.type === "Numeric" && <th>Max Marks</th>}
                                        {assDetails.type === "Numeric" ? <th>Marks</th> : <th>Rubrics</th>}
                                        {assDetails.type === "Numeric" ? <th>Remarks</th> : <th>Grade</th>}
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentList && studentList.length > 0 ? (
                                        studentList.map((student, index) => (
                                            <tr key={index}>
                                                <td>{student.rollNo}</td>
                                                <td>{student.name}</td>
                                                <td>{student.Class}</td>
                                                {assDetails.type === "Numeric" ? (
                                                    <>
                                                        <td>{assDetails.maxMarks}</td>
                                                        <td>
                                                            <TextField
                                                                type='number'
                                                                value={marks[student._id] || ''}
                                                                onChange={(e) => handleMarksChange(student._id, e.target.value)}
                                                            />
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>
                                                            {titles.map((element, idx) => (
                                                                <div className='py-2' key={idx}>{element}</div>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            {titles.map((element, idx) => (
                                                                <div className='py-1' key={idx}>
                                                                    <select
                                                                        className='border border-black p-2'
                                                                        value={grades[student._id]?.[idx] || ''}
                                                                        onChange={(e) => handleGradeChange(student._id, idx, e.target.value)}
                                                                    >
                                                                        <option value="O">O</option>
                                                                        <option value="A">A</option>
                                                                        <option value="B">B</option>
                                                                        <option value="C">C</option>
                                                                        <option value="D">D</option>
                                                                        <option value="E">E</option>
                                                                        <option value="F">F</option>
                                                                    </select>
                                                                </div>
                                                            ))}
                                                        </td>
                                                    </>
                                                )}
                                                <td><div className=' '><input className="px-1 border border-black  rounded-sm" type="text" name="" id="" /></div></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No students found.</td>
                                        </tr>
                                    )}

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
