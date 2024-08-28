import React, { useEffect, useState } from 'react'
import Result from './Result'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';



function Dummy() {
    const location = useLocation();
    const results = location.state?.results;
    
    useEffect(() => {
        const generatePdf = async () => {
            const input = document.getElementById('result');
            html2canvas(input, { scale: 2 }).then((canvas) => {
                const imgWidth = 297; // A4 width in mm for landscape
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                const pdf = new jsPDF('landscape', 'mm', 'a4');

                const pageHeight = pdf.internal.pageSize.getHeight();
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('download.pdf');
            });
        };

        generatePdf();
    }, [results]);

    useEffect(() => {
        if (!results) {
            toast.error('Select Students first!')
            return navigate('/reports')
        }
    })

    

    return (
        <>
            <div id='result'>
                {results?.map((result) => (
                    <Result result={result} />
                ))}
            </div>

        </>
    )

}

export default Dummy