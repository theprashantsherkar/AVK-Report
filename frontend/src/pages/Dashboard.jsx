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
    const { user, setCanEdit, canEdit } = useContext(LoginContext);
    const [titles, setTitles] = useState([]);
    const [ass, setAss] = useState([]);
    const [details, setDetails] = useState({});
    const [marks, setMarks] = useState({});
    const [grades, setGrades] = useState({});
    const [remarks, setRemarks] = useState({});
    const [Class, section, title] = selectedClass.split(' - ');
    const [existingResults, setExistingResults] = useState([]);


    useEffect(() => {
        const fetchClasses = async () => {
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

            toast.success(response.data.message);
            setStudentList(response.data.students);
            const details = response.data.details[0];
            setDetails(details);
            console.log(details);

            const { data } = await axios.get(`${backendURL}/rubrics/getRubrics/${details._id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setTitles(data.rubrics);

            // existing kharab results
            // const initialMarks = {};
            // const initialGrades = {};
            // const initialRemarks = {};
            // response.data.students.forEach(student => {
            //     initialMarks[student._id] = student.results[0]?.marks || '';
            //     initialGrades[student._id] = student.results[0]?.grades || '';
            //     initialRemarks[student._id] = student.results[0]?.remarks || '';
            // });
            // setMarks(initialMarks);
            // setGrades(initialGrades);
            // setRemarks(initialRemarks);

            // new approach
            setExistingResults(response.data.existingResults);

        } catch (error) {
            console.log(error);
        }
    };

    const loadMarks = (e, id) => {
        const newMarks = {};
        const newRemarks = {};
        if (!existingResults || existingResults.length == 0) {
            setMarks(newMarks);
            setRemarks(newRemarks);
        }
        else {
            const result = existingResults.filter(result => result.student == id);
            setMarks(result.marks);
            setRemarks(result.remarks);
        }

    }

    const handleUpdate = async (id) => {
        const studentId = id;
        const examId = details.parentExam?._id;
        const assessmentId = details._id;

        try {
            if (details?.type === "Numeric") {
                const { data } = await axios.post(`${backendURL}/report/sendEachMarks/?examId=${examId}&assessmentId=${assessmentId}&studentId=${studentId}`, {
                    marks: marks[studentId],
                    remarks: remarks[studentId],
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });
                if (!data.success) {
                    toast.error("Something went wrong");
                }
                toast.success(data.message);
            } else if (details?.type === "Graded") {
                if (details?.isRubrics === "Yes") {
                    const { data } = await axios.post(`${backendURL}/report/sendEachGrades/?examId=${examId}&assessmentId=${assessmentId}&studentId=${studentId}`, {
                        grade: grades[studentId],
                        remarks: remarks[studentId],
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true,
                    });
                    if (!data.success) {
                        toast.error("Something went wrong");
                    }
                    toast.success(data.message);
                } else {
                    const { data } = await axios.post(`${backendURL}/report/sendJustGrade/?examId=${examId}&assessmentId=${assessmentId}&studentId=${studentId}`, {
                        grade: grades[studentId],
                        remarks: remarks[studentId],
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true,
                    });
                    if (!data.success) {
                        toast.error("Something went wrong");
                    }
                    toast.success(data.message);
                }
            }
            setCanEdit(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.post(`${backendURL}/teacher/subjects`, {
                    Combined: selectedClass,
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
        }

        if (selectedClass) {
            fetchSubjects();
        }
    }, [selectedClass]);

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleMarksChange = (studentId, value) => {
        setMarks(prevState => ({
            ...prevState,
            [studentId]: value
        }));
    };

    const handleRemarksChange = (studentId, value) => {
        setRemarks(prevState => ({ ...prevState, [studentId]: value }));
    };

    const handleGradeChange = (studentId, index, value) => {
        setGrades(prevState => ({
            ...prevState,
            [studentId]: {
                ...prevState[studentId],
                [index]: value
            }
        }));
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
                            <button className='btn btn-danger' disabled >Update All</button>
                        </div>
                        <hr />
                        <div className='w-full'>
                            <table className='w-full table table-striped table-hover table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Roll</th>
                                        <th>Name</th>
                                        <th>Class Section</th>
                                        {details?.type === "Numeric" ? <th>Max Marks</th> : (details?.isRubrics === "Yes" ? <th>Rubrics</th> : null)}
                                        {details?.type === "Numeric" ? <th>Marks</th> : <th>Grades</th>}
                                        <th>Remarks</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentList && studentList.length > 0 ? (
                                        studentList.map((student, index) => (
                                            <tr key={index}>
                                                <td>{student.rollNo}</td>
                                                <td>{student.name}</td>
                                                <td>{`${student.Class} - ${student.section}`}</td>
                                                {details?.type === "Numeric" ? (
                                                    <>
                                                        <td>{details?.maxMarks}</td>
                                                        <td>
                                                            <input className='border border-black px-1' onLoad={(e) => loadMarks(e, student._id)} type="text" name=""
                                                                value={marks[student._id] || ''}
                                                                onChange={(e) => handleMarksChange(student._id, e.target.value)} />
                                                        </td>
                                                    </>
                                                ) : (
                                                    details?.isRubrics === "Yes" ? <>
                                                        <td>
                                                            {titles.length > 0 ? titles.map((element, idx) => (
                                                                <div className='py-2' key={idx}>{element.rubric}</div>
                                                            )) : <div className='py-2'>No Rubrics Added</div>}
                                                        </td>
                                                        <td>
                                                            {titles.map((element, idx) => (
                                                                <div className='py-1' key={idx}>
                                                                    <select
                                                                        className='border border-black p-2'
                                                                        value={grades[student._id]?.[idx] || ''}
                                                                        onChange={(e) => handleGradeChange(student._id, idx, e.target.value)}
                                                                    >
                                                                        <option value="" disabled>Select</option>
                                                                        <option value="A">A</option>
                                                                        <option value="B">B</option>
                                                                        <option value="C">C</option>
                                                                        <option value="D">D</option>
                                                                        <option value="E">E</option>
                                                                        <option value="AB">AB</option>
                                                                        <option value="NO">NO</option>
                                                                        <option value="ML">ML</option>
                                                                    </select>
                                                                </div>
                                                            ))}
                                                        </td>
                                                    </> : <>
                                                        <div className='py-2'>
                                                            <input
                                                                className="px-1 border border-black rounded-sm"
                                                                type="text"
                                                                value={grades[student._id] || ''}
                                                                onChange={(e) => handleGradeChange(student._id, 0, e.target.value)}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                <td>
                                                    <div className=' '>
                                                        <input
                                                            className="px-1 border border-black rounded-sm"
                                                            type="text"
                                                            value={remarks[student._id] || ''}
                                                            onChange={(e) => handleRemarksChange(student._id, e.target.value)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <button className='btn btn-primary' onClick={() => handleUpdate(student._id)}>Update</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No students found.</td>
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
