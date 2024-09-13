import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/system';
import { Grid, Table, TableRow, TableContainer, TableHead, Typography } from '@mui/material';

import logo from '../assets/logo.jpg'

function Result({ result }) {


    const styles = {
        header: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '24px',
            padding: '16px',
            border: '1px solid black'
        },
        subHeader: {
            fontWeight: 'bold',
            border: '1px solid black',
            padding: '8px',
            backgroundColor: '#f2f2f2',
            fontWeight: 'bold'
        },
        cell: {
            border: '1px solid black',
            padding: '8px',
            textAlign: 'left',
            fontWeight: 'bold'
        },
        row: {
            display: 'flex',
            borderBottom: '1px solid black',
            padding: '8px 0',
            fontSize: '20px',
            fontWeight: 'bold'
        },
        label: {
            flex: '1',
            fontWeight: 'bold'
        },
        value: {
            flex: '2',
            textAlign: 'left',
            fontWeight: 'bold'
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center min-h-screen px-2 py-3 flex-column  w-full font-bold'>
                <div className=' w-5/6  py-4 px-2 d-flex my-3 flex-column align-items-center' style={{height: '800px'}}>
                    <h1 className='font-bold py-2 text-4xl'>Acharya Vidya Kula</h1>
                    <div className=' font-medium text-xl'>Affiliated to ICSE KA 063</div>
                    <div className=' font-medium text-xl'>Aloka Road, Left Fork off</div>
                    <div className='font-medium text-xl'>Mysore-Madikeri Highway at 12th KM Stone</div>
                    <div className='my-1 py-3'>
                        <img className='w-52 h-38  logo' src={logo} alt="logo" /></div>
                    <div className='font-medium text-3xl '>Report Card 2024-25</div>
                    <div className='py-5'>
                        <Container>
                            <Grid container spacing={2} style={{fontSize: '24px', fontWeight: '500'}}>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{fontSize: '20px', fontWeight: '500'}}><strong>Student Name:</strong></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{fontSize: '20px', fontWeight: '500'}}><strong>{result[0]?.credentials.name || "Prashant Sherkar"}</strong></Typography>
                                    <Box borderBottom={1} mt={1}></Box>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{fontSize: '20px', fontWeight: '500'}} ><strong>Class :</strong></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{fontSize: '20px', fontWeight: '500'}} ><strong>{result[0]?.credentials.Class || "Class X"}</strong></Typography>
                                    <Box borderBottom={1} mt={1}></Box>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{fontSize: '20px', fontWeight: '500'}} ><strong>Roll Number:</strong></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{fontSize: '20px', fontWeight: '500'}} ><strong>{result[0]?.credentials.roll || 23} </strong></Typography>
                                    <Box borderBottom={1} mt={1}></Box>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{fontSize: '20px', fontWeight: '500'}} ><strong>Class Teacher :</strong></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{fontSize: '20px', fontWeight: '500'}} ><strong>{result[0]?.exam?.teacher || "Vivek Sir"}</strong></Typography>
                                    <Box borderBottom={1} mt={1}></Box>
                                </Grid>
                            </Grid>
                        </Container>

                    </div>

                </div>


            </div>
            <hr />
            <div className='border border-black  p-3 my-5 d-flex flex-column align-items-center  w-full' style={{height: '800px'}}>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th colSpan="3" style={styles.header}>Student Name: {result[0]?.credentials.name}</th>
                            </tr>
                            <tr>
                                <th colSpan="2" style={styles.subHeader} className='text-xl'>{result[0]?.credentials.Class}</th>
                                <th style={styles.subHeader} className='text-xl'>{result[0]?.credentials.assessment}</th>
                            </tr>
                            <tr>
                                <th style={styles.subHeader} className='text-xl'>Subjects and Skills</th>
                                <th style={styles.subHeader} className='text-xl'>Grade/Marks</th>
                                <th style={styles.subHeader} className='text-xl'>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((subject, index) => (
                            <tr key={index}>
                                <td style={styles.cell} className='text-xl'>{subject.credentials.subject}</td>
                                <td style={styles.cell} className='text-xl'>{subject.marks || "grades to be added yet"}</td>
                                <td style={styles.cell} className='text-xl'>{subject.remarks || "no remarks added"}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='my-3' style={{ width: '80%', margin: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tr>
                                <td style={styles.cell} className='text-xl'>Class Teacher's Signature</td>
                                <td style={styles.cell} className='w-1/2'></td>
                            </tr>
                            <tr>
                                <td style={styles.cell} className='text-xl'>Principal's Signature</td>
                                <td style={styles.cell} className='w-1/2'></td>
                            </tr>
                            <tr>
                                <td style={styles.cell} className='text-xl'>Parents Signature</td>
                                <td style={styles.cell} className='w-1/2'></td>
                            </tr>
                        </table>
                    </div>
                    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th colSpan="2" style={{ border: '1px solid black', backgroundColor: '#f2f2f2', padding: '10px', fontWeight: 'bold' }} className='text-xl'>GRADE INDICES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', backgroundColor: '#f2f2f2' }} className='w-1/2 text-xl'>Co-Scholastic</td>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', backgroundColor: '#f2f2f2' }} className='w-1/2 text-xl'>Scholastic</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }} className='w-1/2 text-xl'>A – Excellent</td>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }} className='w-1/2 text-xl'>A – 80-100%</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }} className='w-1/2 text-xl'>B – Very Good</td>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }} className='w-1/2 text-xl'>B – 60-79%</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }} className='w-1/2 text-xl'>C – Good</td>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }} className='w-1/2 text-xl'>C – 35-59%</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }} className='w-1/2 text-xl'>D – Scope for Improvement</td>
                                    <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }} className='w-1/2 text-xl'>D – 0-34%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Result