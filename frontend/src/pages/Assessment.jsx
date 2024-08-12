import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';



function Assessment() {

    const [title, setTitle] = useState('');
    const [term, setTerm] = useState('');
    const [maxMarks, setMaxMarks] = useState();
    const [subject, setSubject] = useState([]);
    const [type, setType] = useState('');
    const [isRubrics, setIsRubrics] = useState();
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
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ width: '300px', marginY: "10px" }}>
                                    <FormControl fullWidth>

                                        <TextField
                                            label="Maximum Marks"
                                            variant="outlined"
                                            fullWidth
                                            value={maxMarks}
                                            onChange={(e) => setMaxMarks(e.target.value)}
                                        />
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
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
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
                                            <MenuItem value={"Consolidated"}>Consolidated</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ width: '300px', marginY: "10px" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Rubrics</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={isRubrics}
                                            label="Select Rubrics"
                                            onChange={(e) => setIsRubrics(e.target.value)}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            

                        </div>
                        <div className='flex justify-center'>
                            <button
                                className='btn btn-primary'>
                                Submit
                            </button>
                        </div>
                        <hr />
                        <div>
                            add data table here
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assessment