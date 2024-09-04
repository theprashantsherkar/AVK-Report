import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { backendURL } from '../App';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';
import { LoginContext } from '../main';

function Assessment() {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [term, setTerm] = useState('');
    const [maxMarks, setMaxMarks] = useState();
    const [subjectList, setSubjectList] = useState([]);
    const [subject, setSubject] = useState('');
    const [type, setType] = useState('');
    const [isRubrics, setIsRubrics] = useState(false);
    const { canEdit } = useContext(LoginContext);
    const [assList, setAssList] = useState([]);

    const deleteHandler = async (id) => {
        console.log(id);
        const assessment = assList.find(assessment => assessment._id === id);
        if (!(assessment.canDelete)) {
            return toast.error("You are not authorized to delete this assessment!")
        } else {
            try {
                const response = await axios.delete(`${backendURL}/assessment/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                toast.success(response.data.message);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleSubmit = async () => {
        try {
            if (!title || !term || !type || !subject) {
                console.log("Every field is mandatory!")
                return toast.error("Every field is mandatory!")
            }
            const response = await axios.post(`${backendURL}/assessment/${id}`, {
                title,
                term,
                subject,
                type,
                maxMarks,
                isRubrics,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
            if (!response.data.success) {
                return toast.error('Something went wrong')
            }
            toast.success(response.data.message);
            setMaxMarks();
            setIsRubrics("");

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (id) {
            const fetchSubjects = async () => {
                try {
                    const response = await axios.get(`${backendURL}/assessment/sendsubjects/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    });
                    setSubjectList(response.data.subjectNames);
                } catch (error) {
                    console.error("Error fetching subjects:", error);
                }
            }
            fetchSubjects();
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            const fetchAssessments = async () => {
                try {
                    const response = await axios.get(`${backendURL}/assessment/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    });
                    setAssList(response.data.assessment);
                } catch (error) {
                    console.error("Error fetching assessments:", error);
                }
            };
            fetchAssessments();
        }
    }, [id, handleSubmit, deleteHandler]);


    return (
        <>
            <Header />
            <div className='flex items-start w-full'>
                <div className='w-1/6'><Sidebar /></div>
                <div className='w-5/6 p-4 '>
                    <div className='text-2xl font-semibold flex gap-3 items-center'>
                        <div className='max-w-fit p-1 border border-black rounded-full flex items-center hover:cursor-pointer'>
                            <Link className='flex text-black' to={'/exam'}><ArrowBackIcon /></Link>
                        </div>
                        <span>Assessment</span>
                    </div>
                    <hr />
                    <div className=''>
                        <div className='flex items-start justify-center p-2 gap-2'>
                            <div className=''>
                                <Box sx={{ width: '300px', marginY: "10px" }}>
                                    <FormControl fullWidth>
                                        <TextField id="outlined-basic" label="Select Title" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </FormControl>
                                </Box>
                                <Box sx={{ width: '300px', marginY: "10px" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Term</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={term}
                                            label="Select Term"
                                            onChange={(e) => setTerm(e.target.value)}
                                        >
                                            <MenuItem value={"Term 1"}>Term 1</MenuItem>
                                            <MenuItem value={"Term 2"}>Term 2</MenuItem>
                                            <MenuItem value={"Consolidated"}>Consolidated</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ width: '300px', marginY: "10px" }}>
                                    <FormControl fullWidth>

                                        {type == "Numeric" ? (<TextField
                                            label="Maximum Marks"
                                            variant="outlined"
                                            fullWidth
                                            value={maxMarks}
                                            onChange={(e) => setMaxMarks(e.target.value)}
                                        />) : (<TextField disabled
                                            label="Maximum Marks"
                                            variant="outlined"
                                            fullWidth
                                            value={maxMarks}
                                            onChange={(e) => setMaxMarks(e.target.value)}
                                        />)}
                                    </FormControl>
                                </Box>
                            </div>
                            <div>
                                <Box sx={{ width: '300px', marginY: "10px" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={subject}
                                            label="Select Assessment"
                                            onChange={(e) => setSubject(e.target.value)}
                                        >
                                            {subjectList && subjectList.length > 0 ? (
                                                subjectList.map((element, index) => (
                                                    <MenuItem key={index} value={element}>{element}</MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem disabled>No Subjects Added</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ width: '300px', marginY: "10px" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Evaluation Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="Select Evaluation Type"
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <MenuItem value={"Numeric"}>Numeric</MenuItem>
                                            <MenuItem value={"Graded"}>Graded</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ width: '300px', marginY: "10px" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Rubrics</InputLabel>
                                        {type == "Graded" ? (<Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={isRubrics}
                                            label="Select Rubrics"
                                            onChange={(e) => setIsRubrics(e.target.value)}
                                        >
                                            <MenuItem value={"Yes"}>Yes</MenuItem>
                                            <MenuItem value={"No"}>No</MenuItem>
                                        </Select>) : (<Select disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={isRubrics}
                                            label="Select Rubrics"
                                            onChange={(e) => setIsRubrics(e.target.value)}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>)}
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button className='btn btn-primary' onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                        <hr />
                        <div>
                            {assList.length > 0 ? (
                                <table className='table table-bordered table-striped table-hover overflow-y-scroll'>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Subject</th>
                                            <th>Term</th>
                                            <th>Evaluation Type</th>
                                            <th>Rubrics</th>
                                            <th>Maximum Marks</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assList.map((element, index) => (
                                            <tr key={index}>
                                                <td>{element.title}</td>
                                                <td>{element.subject}</td>
                                                <td>{element.term}</td>
                                                <td>{element.type}</td>
                                                <td>{element.isRubrics == "Yes" ? 'Yes' : 'No'}</td>
                                                <td>{element.type == "Numeric" ? element.maxMarks : "-"}</td>
                                                <td><button className=' bg-orange-500 rounded-md px-1 py-1' onClick={() => deleteHandler(element._id)}><DeleteForeverIcon sx={{ color: 'white' }} /></button> {"   "}
                                                    <button className='btn btn-warning p-1 '><EditIcon sx={{ color: 'white' }} /></button>{"  "}<br />
                                                    {element.isRubrics == "Yes" ? (<Link to={`/rubrics/${element._id}`}><button className='btn btn-danger'>+ Rubrics</button></Link>) : (<></>)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>No assessments added yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assessment;
