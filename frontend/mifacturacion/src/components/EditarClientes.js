// EditarProducto.js
import React, { useState } from 'react';

const EditarCliente = ({ cliente, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...cliente });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Modificar Cliente</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            value={formData.apellido}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cuit" className="block text-sm font-medium text-gray-700">cuit</label>
          <input
            id="cuit"
            name="cuit"
            type="text"
            value={formData.cuit}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="correo" className="block text-sm font-medium text-gray-700">correo</label>
          <input
            id="correo"
            name="correo"
            type="Email"
            value={formData.correo}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numerotel" className="block text-sm font-medium text-gray-700">numerotel</label>
          <input
            id="numerotel"
            name="numerotel"
            type="number"
            value={formData.numerotel}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">direccion</label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            value={formData.direccion}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Guardar Cambios
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full bg-gray-600 text-white py-2 rounded-md"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarCliente;
