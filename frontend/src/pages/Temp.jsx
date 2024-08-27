import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Temp = () => {
    
    const handlePrint = () => {
        const input = document.getElementById('temp');

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgWidth = 297;
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
    }

  return (
      <div  className="p-5  flex items-center justify-center w-full h-screen flex-col gap-8 bg-slate-600" id='temp'>
          <div className=' text-xl  bg-slate-800 w-2/3 text-white p-5 rounded-3xl' >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus praesentium ea, quidem aliquid nisi optio enim voluptates vitae tenetur est saepe quisquam iusto porro architecto sequi dignissimos. Nostrum nulla praesentium, recusandae pariatur sit sapiente? Pariatur minima tempora quam nisi exercitationem.
              <br />
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim placeat obcaecati fugiat sint dolor unde a, ipsa alias minima, at aut sed eos esse tenetur culpa velit atque odit modi doloremque eligendi nemo, sit reiciendis molestias? Delectus cupiditate saepe ab?
          </div>
          <button className='btn btn-primary' onClick={handlePrint}>Print</button>
    </div>
  )
}

export default Temp