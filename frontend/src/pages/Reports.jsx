import { useState, useContext, useEffect } from 'react';
import React from 'react'
import Sidebar from '../components/Sidebar'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { LoginContext } from '../main';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Header from '../components/Header';

function Reports() {
    const [selectAll, setSelectAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState([]);
    const [toDownload, setToDownload] = useState(false)
    const navigate = useNavigate();
    const [studentResult, setStudentResult] = useState([]);
    const [navigateReady, setNavigateReady] = useState(false);

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [students, setStudents] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const { user } = useContext(LoginContext);


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
                setSelectedClass(response.data.classes)
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, [user]);


    const handleSelectAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        setCheckboxes(students.map(() => isChecked));
    };

    const handleCheckboxChange = (index) => (event) => {
        const isChecked = event.target.checked;
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = isChecked;
        setCheckboxes(newCheckboxes);

        setSelectAll(newCheckboxes.every(checkbox => checkbox));
    };

    const getSelectedStudentIds = () => {
        if (students.length === 0 || checkboxes.length === 0) {
            console.log("No students or checkboxes available");
            return [];
        }

        const selectedIds = students
            .map((student, index) => ({ _id: student._id, isChecked: checkboxes[index] }))
            .filter(student => student.isChecked)
            .map(student => student._id);

        return selectedIds;
    };

    const downloadHandler = async () => {
        try {
            const id = getSelectedStudentIds();
            console.log(id);
            if (id.length == 0) {
                return toast.error("Select Student First.")
            }
            const { data } = await axios.post(`${backend_URL}/result/report`, { id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            toast.success(data.message);
            console.log(data.results);
            setStudentResult(data.results);
            setNavigateReady(true);  // Set navigateReady to true after updating studentResult
        } catch (error) {
            console.error("Error fetching report:", error);
            toast.error("Failed to download report.");
        }
    };


    const ShowButton = async () => {
        try {
            const response = await axios.get(`${backend_URL}/teachers/getstudents`, {
                params: { Class: selectedClass },
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            setStudents(response.data.students);
            setCheckboxes(response.data.students.map(() => false));
            setShowTable(true);
            setToDownload(true);

        } catch (error) {
            console.log(error);
            toast.error('Internal server Error');
        }
    };

    // useEffect(() => {
    //     if (navigateReady) {
    //         console.log(studentResult);
    //         navigate(`/report/`, { state: { results: studentResult } });
    //         setNavigateReady(false);  // Reset navigateReady to false
    //     }
    // }, [navigateReady, studentResult, navigate]);



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
                          Report Card
                      </div>
                      <hr />
                      <div className='flex items-center  gap-4'>
                          <Box sx={{ width: '300px' }}>
                              <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">Select Assessment</InputLabel>
                                  <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={classes}
                                      label="Select Assessment"
                                      onChange={(e)=>setClasses(e.target.value)}
                                  >
                                      {Array.isArray(classes) && classes.length > 0 ? (
                                          classes.map((cls) => (
                                              <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                                          ))
                                      ) : (
                                          <MenuItem disabled>No classes available</MenuItem>
                                      )}

                                  </Select>
                              </FormControl>
                          </Box>


                          <button className='btn btn-primary' onClick={ShowButton}>Show Result</button>
                      </div>
                      <hr />
                      <div className='flex items-center justify-between text-xl font-semibold'>
                          <div>Assessment Title:{ }</div>
                          <button className='btn btn-warning' onClick={downloadHandler}>Download Report</button>
                      </div>
                      <hr />
                      <div className='px-2'>
                          {showTable && <>
                              
                                  <table>
                                      <thead>
                                          <tr>
                                              <td>
                                                  <label className='fw-semibold' htmlFor="select">
                                                      <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} name="" id="select" />Select All
                                                  </label>
                                              </td>
                                              <td><strong>Roll No.</strong></td>
                                              <td><strong>Name</strong></td>
                                              <td><strong>Class</strong></td>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {students.map((student, index) => (
                                              <tr key={index}>
                                                  <td>
                                                      <input type="checkbox" checked={checkboxes[index] || false} onChange={handleCheckboxChange(index)} name="" id="" />
                                                  </td>
                                                  <td>{student.rollNum}</td>
                                                  <td>{student.name}</td>
                                                  <td>{student.Class}</td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                              
                          </>}
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Reports