import { useState, useEffect } from "react";
import Modal from 'react-modal';
import EditarProducto from './EditarProducto';
import '../style/style.css';  // Importa el archivo CSS


Modal.setAppElement('#root'); // Establece el elemento raíz para accesibilidad

export default function ProducList() {
  const [productos, setProductos] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/api/productos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/producto/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProductos(productos.filter(producto => producto.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await fetch(`/api/producto/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
        setProductos(productos.map(producto => producto.id === updatedProduct.id ? updatedProduct : producto));
        setEditingProduct(null);
        setModalIsOpen(false);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditClick = (producto) => {
    setEditingProduct(producto);
    setModalIsOpen(true);
  };

  return (
    <div className="overflow-x-auto py-6 px-4">
      <div className="inline-block min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{producto.nombrepro}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.codigopro}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.preciopro}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.cantidad}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(producto.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleEditClick(producto)}
                    className="text-indigo-600 hover:text-indigo-900 ml-4"
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Editar Producto"
          className="modal"
          overlayClassName="overlay"
        >
          {editingProduct && (
            <EditarProducto
              producto={editingProduct}
              onUpdate={handleUpdate}
              onClose={() => setModalIsOpen(false)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
