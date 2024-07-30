// EditarProducto.js
import React, { useState } from 'react';

const EditarProducto = ({ producto, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...producto });

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
      <h3 className="text-lg font-semibold">Modificar Producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombrepro" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="nombrepro"
            name="nombrepro"
            type="text"
            value={formData.nombrepro}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="codigopro" className="block text-sm font-medium text-gray-700">Código</label>
          <input
            id="codigopro"
            name="codigopro"
            type="text"
            value={formData.codigopro}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="preciopro" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            id="preciopro"
            name="preciopro"
            type="number"
            value={formData.preciopro}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
          <input
            id="cantidad"
            name="cantidad"
            type="number"
            value={formData.cantidad}
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

export default EditarProducto;
