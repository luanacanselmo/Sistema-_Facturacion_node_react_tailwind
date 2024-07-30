import React, { useState } from "react";
import "../style/Factura.css"; // Asegúrate de tener este archivo CSS

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
        cantidad: "",
        precio: "",
      },
    ],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...datosFactura.items];
    items[index][name] = value;
    setFormData({ ...datosFactura, items });
  };

  const handleFacturaChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...datosFactura, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/factura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosFactura),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.error);
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
      items: [...prevData.items, { codigo: "", descripcion: "", cantidad: "", precio: "" }],
    }));
  };

  return (
    <div className="raiz">
      <h2 className="titulo">Factura</h2>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handleSubmit}
      >
        <div className="encabezado">
          <input
            type="text"
            name="numeroFactura"
            placeholder="Número de Factura"
            className="campo"
            value={datosFactura.numeroFactura}
            readOnly
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
            onBlur={buscarCliente} // Llama a buscarCliente cuando el campo pierde el foco
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
            type="text"
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
        <h4>Items</h4>
        {datosFactura.items.map((item, index) => (
          <div key={index} className="item">
            <input
              type="text"
              name="codigo"
              placeholder="Código"
              className="campo"
              value={item.codigo}
              onChange={(e) => handleChange(e, index)}
              onBlur={() => buscarProducto(index)} // Llama a buscarProducto cuando el campo pierde el foco
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
        <button type="button" className="boton" onClick={agregarItem}>
          Agregar Item
        </button>
        <div className="total">
          <strong>Total:</strong>
        </div>
        <button type="submit" className="boton">
          Enviar Factura
        </button>
      </form>
    </div>
  );
}
