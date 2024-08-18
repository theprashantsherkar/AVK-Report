import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Chip, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { backendURL } from '../App';
import toast from 'react-hot-toast';

function UploadDialog({ showDialog, setShowDialog, id }) {
    const [subjects, setSubjects] = useState([]);
    const [addedSubjects, setAddedSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    useEffect(() => {
        if (!id) return;

        const fetchSubjects = async () => {
            try {
                const { data } = await axios.get(`${backendURL}/subject/getSubjects`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setSubjects(data.subjects || []);
            } catch (error) {
                console.error(error);
            }
        };

        const loadSubjects = async (id) => {
            try {
                const { data } = await axios.get(`${backendURL}/exam/old/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                if (!data.success) {
                    setAddedSubjects([]);
                    setSelectedSubjects([]);
                    console.log(id);
                }
                else {
                    setAddedSubjects(data.subjectNames || []);
                    setSelectedSubjects(data.subjectNames || []);
                    console.log(id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSubjects();
        loadSubjects(id);
    }, [id]);

    const handleSubjectChange = (event, newValue) => {
        setSelectedSubjects(newValue);
    };

    const handleSubjectRemove = (subjectToRemove) => {
        setSelectedSubjects((prevSubjects) =>
            prevSubjects.filter((subject) => subject !== subjectToRemove)
        );
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `${backendURL}/exam/addsubjects?id=${id}`,
                { selectedSubjects },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (!response.data.success) {
                return toast.error('Something went wrong');
            }
            toast.success(response.data.message);
            setShowDialog(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        setShowDialog(false);
    };


    return (
        <Dialog open={showDialog} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Subjects</DialogTitle>
            <DialogContent>
                <Autocomplete
                    multiple
                    options={subjects.map(subject => subject.subject)}
                    value={selectedSubjects}
                    onChange={handleSubjectChange}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                key={index}
                                label={option}
                                {...getTagProps({ index })}
                                onDelete={() => handleSubjectRemove(option)}
                            />
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
                        </tbody>
                    </table>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
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
