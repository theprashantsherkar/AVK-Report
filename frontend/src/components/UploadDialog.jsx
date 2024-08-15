import React, { useState } from 'react';
import { Autocomplete, TextField, Chip, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const subjectsList = [
    'English',
    'Attendance',
    'Environmental Science',
    'Computer Studies',
    'Drawing',
    'Physical Education',
    'MUSIC',
    'II Language Kannada',
    'III Language Sanskrit',
    'Mathematics',
    'YOGA'
];

function UploadDialog({showDialog, setShowDialog}) {
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const handleSubjectChange = (event, newValue) => {
        setSelectedSubjects(newValue);
    };

    const handleUpdate = () => {
        console.log('Updated subjects:', selectedSubjects);
        // Add your update logic here
        setShowDialog(false);
    };

    const handleClose = () => {
        console.log('Dialog closed');
        setShowDialog(false);
        
    };

    return (
        <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Subjects</DialogTitle>
            <DialogContent>
                <Autocomplete
                    multiple
                    options={subjectsList}
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
                            {selectedSubjects.map((subject, index) => (
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