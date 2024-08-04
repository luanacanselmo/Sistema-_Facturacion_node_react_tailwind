import React, { useState, useEffect } from "react";
import "../style/Factura.css"; // Asegúrate de tener este archivo CSS
import Facturapdf from './Facturapdf';


export default function Factura() {
  const [datosFactura, setFormData] = useState({
    numeroFactura: "", 
    fecha: "",
    cuitCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    correoCliente: "",
    direccionCliente: "",
    items: [
      {

        codigo: "",
        descripcion: "",
        cantidad: 1,
        precio: 0,
      },
    ],
  });
  const [total, setTotal] = useState(0);
  const [showPDF, setShowPDF] = useState(false); // Estado para manejar la visibilidad del PDF

  // Asegúrate de que la función calcularTotal esté definida antes de usarla en useEffect
  const calcularTotal = () => {
    const total = datosFactura.items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    setTotal(total);
  };

  useEffect(() => {
    calcularTotal();
  }, [datosFactura.items]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...datosFactura.items];
    items[index][name] = name === "cantidad" ? parseInt(value) : value;
    setFormData({ ...datosFactura, items });
  };

  const handleFacturaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos de la factura a enviar:", {
        cuitCliente: datosFactura.cuitCliente,
        fecha: datosFactura.fecha,
        total: total,
        items: datosFactura.items.map(item => ({
          codigo: item.codigo,
          cantidad: item.cantidad
        }))
      });
  
      const response = await fetch("http://localhost:5000/api/factura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeroFactura: datosFactura.numeroFactura,
          cuitCliente: datosFactura.cuitCliente,
          fecha: datosFactura.fecha,
          total: total,
          items: datosFactura.items.map(item => ({
            codigo: item.codigo,
            cantidad: item.cantidad
          }))
        }),
      });
      const data = await response.json();
    if (response.ok) {
      setFormData(prevData => ({
        ...prevData,
        numeroFactura: data.facturaId // Asumiendo que el servidor devuelve el ID como número de factura
      }));
      alert(data.message);
    } else {
      throw new Error(data.error);
    }
    } catch (error) {
      console.error("Error al guardar la factura:", error);
      alert("Error al guardar la factura: " + error.message);
    }
  };

  const buscarCliente = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/clientes/${datosFactura.cuitCliente}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const datosCliente = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        nombreCliente: datosCliente.nombre,
        apellidoCliente: datosCliente.apellido,
        correoCliente: datosCliente.correo,
        direccionCliente: datosCliente.direccion,
        telefonoCliente: datosCliente.direccion,

      }));
    } catch (error) {
      console.error("Error al buscar el cliente:", error);
      alert("No se pudo encontrar el cliente. Por favor, verifica el CUIT e intenta nuevamente.");
    }
  };

  const buscarProducto = async (index) => {
    try {
      const response = await fetch(`http://localhost:5000/api/productos/${datosFactura.items[index].codigo}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const datosProducto = await response.json();
      const items = [...datosFactura.items];
      items[index].descripcion = datosProducto.nombrepro;
      items[index].precio = datosProducto.preciopro;
      setFormData((prevData) => ({
        ...prevData,
        items,
      }));
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      alert("No se pudo encontrar el producto. Por favor, verifica el código e intenta nuevamente.");
    }
  };

  const agregarItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { codigo: "", descripcion: "", cantidad: 1, precio: 0 }],
    }));
  };
  const handleDownloadPDF = () => {
    setShowPDF(true); // Mostrar el PDF
  };

  return (
    <div className="raiz">
      <h1 className="text-3xl font-bold text-center">Factura</h1>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handleSubmit}
      >
        <div className="encabezado">
          <input
            type="text"
            name="numerofactura"
            placeholder="Número de Factura"
            className="campo"
            value={datosFactura.numeroFactura}
            onChange={handleFacturaChange}

            hidden
          />
          <input
            type="date"
            name="fecha"
            className="campo"
            value={datosFactura.fecha}
            onChange={handleFacturaChange}
          />
        </div>
        <div className="cliente">
          <input
            type="text"
            name="cuitCliente"
            placeholder="CUIT del Cliente"
            className="campo"
            value={datosFactura.cuitCliente}
            onChange={handleFacturaChange}
            onBlur={buscarCliente}
          />
          <input
            type="text"
            name="nombreCliente"
            placeholder="Nombre del Cliente"
            className="campo"
            value={datosFactura.nombreCliente}
            readOnly
          />
          <input
            type="text"
            name="apellidoCliente"
            placeholder="Apellido del Cliente"
            className="campo"
            value={datosFactura.apellidoCliente}
            readOnly
          />
          <input
            type="email"
            name="correoCliente"
            placeholder="Correo del Cliente"
            className="campo"
            value={datosFactura.correoCliente}
            readOnly
          />
          <input
            type="text"
            name="direccionCliente"
            placeholder="Dirección del Cliente"
            className="campo"
            value={datosFactura.direccionCliente}
            readOnly
          />
        </div>
        <h2 className="text-lg font-semibold mt-10">Productos</h2>
        {datosFactura.items.map((item, index) => (
          <div className="item" key={index}>
            <input
              type="text"
              name="codigo"
              placeholder="Código del Producto"
              className="campo"
              value={item.codigo}
              onChange={(e) => handleChange(e, index)}
              onBlur={() => buscarProducto(index)}
            />
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              className="campo"
              value={item.descripcion}
              readOnly
            />
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              className="campo"
              value={item.cantidad}
              onChange={(e) => handleChange(e, index)}
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              className="campo"
              value={item.precio}
              readOnly
            />
          </div>
        ))}
        <button type="button" onClick={agregarItem} className="mt-4">
          Agregar producto
        </button>
        <div className="total mt-4">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Enviar
        </button>
        <button type="button" onClick={handleDownloadPDF} className="mt-4 bg-green-500 text-white p-2 rounded">
          Generar PDF
        </button>
      </form>
      {showPDF && <Facturapdf factura={{ ...datosFactura, total, numeroFactura: datosFactura.numeroFactura }} />}
    </div>
    
    
  );
}
