import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Chip, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { backendURL } from '../App';
import toast from 'react-hot-toast';



function UploadDialog({ showDialog, setShowDialog, id }) {
    const [subject, setSubjects] = useState([]);
    const [addedSubjects, setAddedSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const handleSubjectChange = (event, newValue) => {
        setSelectedSubjects(newValue);
    };

    const subjectList = [];
    subject.map((element, index) => {
        subjectList.push(element.subject)
    })
    const handleUpdate = async(id) => {
        console.log('Updated subjects:', selectedSubjects);
        const response = await axios.post(`${backendURL}/exam/addsubjects`,
            {
                selectedSubjects,
            },
            {
                params: {
                    id
                },
                headers: {
                    "Content-Type":"application/json"
                },
                withCredentials: true,
            }
        )
        if (!response.data.success) {
            return toast.error('Something went Wrong')
        }
        toast.success(response.data.message);

        setShowDialog(false);
    };

    const handleClose = () => {
        setShowDialog(false);
        
    };


    useEffect(() => {
        async function fetchSubjects() {
            try {
                const { data } = await axios.get(`${backendURL}/subject/getSubjects`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                });
                setSubjects(data.subjects);
            } catch (error) {
                console.error(error);
            }
        }

        async function loadSubjects(id) {

            try {
                const { data } = await axios.get(`${backendURL}/exam/old/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setAddedSubjects(data.subjectNames);
                console.log(data.subjectNames);
            } catch (error) {
                console.error(error);
            }
        }

        if (id) {
            fetchSubjects();
            loadSubjects(id);
        }
    }, [id]);

    return (
        <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Subjects</DialogTitle>
            <DialogContent>
                <Autocomplete
                    multiple
                    options={subjectList}
                    value={selectedSubjects}
                    onChange={handleSubjectChange}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Select Subjects"
                            placeholder="Start typing..."
                        />
                    )}
                    fullWidth
                />
                <Box mt={2}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedSubjects.map((subject, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{subject}</td>
                                </tr>
                            ))}
                            {selectedSubjects.map((subject, index) => (
                                <tr key={index}>
                                    <td>{addedSubjects.length + index + 1}</td>
                                    <td>{subject}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={() => handleUpdate(id)}>
                    Update
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UploadDialog;