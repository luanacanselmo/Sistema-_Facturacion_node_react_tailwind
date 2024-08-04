import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const FacturaPDF = ({ factura }) => {
  console.log("Factura recibida en FacturaPDF:", factura); // Verifica si el número de factura está aquí

  const handleDownloadPDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save(`Factura_${factura.numeroFactura}.pdf`); // Usar solo un nombre para el archivo
      })
      .catch(error => {
        console.error("Error al generar el PDF:", error);
      });
  };

  // Verifica si factura existe y tiene datos
  if (!factura) {
    return <p>Factura no disponible</p>;
  }

  return (
    <div>
      <div id="invoice" className="p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">FACTURA</h1>
          <p className="text-lg">N° {factura.numeroFactura}</p> {/* Corregir uso de template strings */}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold bg-gray-200 p-2">INFORMACIÓN DE CONTACTO</h2>
          <div className="p-4 border">
            <p><strong>Fecha:</strong> {factura.fecha}</p>
            <p><strong>Nombre y Apellido:</strong> {factura.nombreCliente} {factura.apellidoCliente}</p>
            <p><strong>Dirección:</strong> {factura.direccionCliente}</p>
            <p><strong>Correo:</strong> {factura.correoCliente}</p>
          </div>
        </div>

        <div className="mt-8">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">DESCRIPCIÓN</th>
                <th className="border p-2">CANTIDAD</th>
                <th className="border p-2">PRECIO</th>
                <th className="border p-2">NRO</th>
              </tr>
            </thead>
            <tbody>
              {factura.items.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.descripcion}</td>
                  <td className="border p-2">{item.cantidad}</td>
                  <td className="border p-2">${Number(item.precio).toFixed(2)}</td>
                  <td className="border p-2">{index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-right">
          <div className="inline-block border p-4">
            <h2 className="text-xl font-semibold">TOTAL</h2>
            <p className="text-2xl">${Number(factura.total).toFixed(2)}</p>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <p>261-7142180</p>
          <p>luanacanselmocaria@gmail.com</p>
          <p><a href="https://luanacanselmo.github.io/">https://luanacanselmo.github.io/</a></p>
        </footer>
      </div>

      <div className="text-center mt-8">
        <button onClick={handleDownloadPDF} className="bg-blue-500 text-white p-2 rounded">
          Descargar PDF
        </button>
      </div>
    </div>
  );
};

export default FacturaPDF;
