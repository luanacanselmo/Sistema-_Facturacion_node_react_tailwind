import React from 'react';

const Inicio = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6" >
      <h1 className="text-4xl font-bold mb-20">Bienvenido</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Cuadro para subir un producto */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <i className="fas fa-box-open text-4xl text-blue-500 mb-4"></i>
          <h2 className="text-xl font-semibold mb-2">Subir Producto</h2>
          <p className="text-gray-600 text-center">Agrega un nuevo producto .</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Ir</button>
        </div>

        {/* Cuadro para agregar un cliente */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <i className="fas fa-user-plus text-4xl text-green-500 mb-4"></i>
          <h2 className="text-xl font-semibold mb-2">Agregar Cliente</h2>
          <p className="text-gray-600 text-center">Añade un nuevo cliente al sistema.</p>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">Ir</button>
        </div>

        {/* Cuadro para listar productos */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <i className="fas fa-list-ul text-4xl text-yellow-500 mb-4"></i>
          <h2 className="text-xl font-semibold mb-2">Listar Productos</h2>
          <p className="text-gray-600 text-center">Visualiza todos los productos registrados.</p>
          <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg">Ir</button>
        </div>

        {/* Cuadro para listar clientes */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <i className="fas fa-users text-4xl text-red-500 mb-4"></i>
          <h2 className="text-xl font-semibold mb-2">Listar Clientes</h2>
          <p className="text-gray-600 text-center">Visualiza todos los clientes registrados.</p>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Ir</button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
