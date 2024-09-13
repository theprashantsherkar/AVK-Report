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
            const input = document.getElementById('pdf-content');
            const canvas = await html2canvas(input, { scale: 2 });

            const imgWidth = 297; // A4 width in mm for landscape
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pdf = new jsPDF('landscape', 'mm', 'a4');

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }

            pdf.save('download.pdf');
        };

        if (results) {
            generatePdf();
        }
    }, [results]);

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