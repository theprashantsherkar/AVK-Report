import React, { useEffect } from 'react';
import Result from './Result';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function Dummy() {
    const location = useLocation();
    const results = location.state?.results;
    const navigate = useNavigate();

    useEffect(() => {
        const generatePdf = async () => {
            const pdf = new jsPDF('landscape', 'mm', 'a4');

            for (let i = 0; i < results.length; i++) {
                const input = document.getElementById(`result-${i}`);

                if (input) {
                    const canvas = await html2canvas(input, { scale: 2 });
                    const imgWidth = 297; // A4 width in mm for landscape
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    const position = 0;

                    if (i > 0) {
                        pdf.addPage();  // Add a new page for every iteration after the first
                    }

                    pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
                }
            }

            pdf.save('download.pdf');
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
                <div key={index} id={`result-${index}`} style={{ marginBottom: '20px' }}>
                    <Result result={result} />
                </div>
            ))}
        </div>
    );
}

export default Dummy;
