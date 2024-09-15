import React, { useEffect } from 'react';
import Result from './Result';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

function Dummy() {
    const location = useLocation();
    const results = location.state?.results;
    const navigate = useNavigate();

    useEffect(() => {
        const generatePdf = async () => {
            const element = document.getElementById('pdf-content'); // The element to be converted

            const options = {
                margin: [10, 10, 10, 10], // Margins to avoid cutting off content
                filename: 'download.pdf', // Name of the PDF file
                html2canvas: {
                    scale: 4, // Increase scale for better re   ndering
                    useCORS: true // Handle cross-origin images
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'landscape', // Change to 'landscape' if needed
                    compress: true // Compress PDF to reduce file size
                },
                pagebreak: {
                    mode: ['css', 'legacy'] // Handle page breaks properly
                }
            };

            // Generate and download the PDF
            html2pdf().set(options).from(element).save();
        };
        if (results) {
            generatePdf();
        }
    }, []);

    useEffect(() => {
        if (!results) {
            toast.error('Select Students first!');
            navigate('/reports');
        }
    }, [results, navigate]);

    return (
        <div id='pdf-content'>
            {results?.map((result, index) => (
                <div key={index} id={`result - ${index}`}>
                    <Result result={result} />
                </div>
            ))
            }
        </div >
    );
}

export default Dummy;