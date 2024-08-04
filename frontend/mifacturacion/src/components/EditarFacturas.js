// EditarProducto.js
import React, { useState } from 'react';

const EditarFacturas = ({ factura, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...factura });

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
      <h3 className="text-lg font-semibold">Modificar factura</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">id</label>
          <input
            id="id"
            name="id"
            type="number"
            value={formData.id}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cliente_id" className="block text-sm font-medium text-gray-700">cliente_id</label>
          <input
            id="cliente_id"
            name="cliente_id"
            type="number"
            value={formData.cliente_id}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            value={formData.fecha}
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

export default EditarFacturas;
