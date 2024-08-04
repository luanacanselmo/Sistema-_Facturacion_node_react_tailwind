import { useState, useEffect } from "react";
import EditarClientes from "./EditarClientes";
import ModalUniversal from "./ModalUniversal"; // Importa el componente universal
import "../style/style.css"; // Importa el archivo CSS

export default function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [editingClientes, setEditingClientes] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmacionIsOpen, setConfirmacionIsOpen] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("/api/clienteslist");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async () => {
    if (clienteAEliminar) {
      try {
        const response = await fetch(`/api/clientes/${clienteAEliminar.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setClientes(clientes.filter((cliente) => cliente.id !== clienteAEliminar.id));
          setConfirmacionIsOpen(false); // Cierra el modal de confirmación después de eliminar
          setClienteAEliminar(null); // Limpia el cliente a eliminar
        } else {
          console.error("Failed to delete cliente");
        }
      } catch (error) {
        console.error("Error deleting cliente:", error);
      }
    }
  };

  const handleUpdate = async (updatedCliente) => {
    try {
      const response = await fetch(`/api/clientes/${updatedCliente.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCliente),
      });
      if (response.ok) {
        setClientes(
          clientes.map((cliente) =>
            cliente.id === updatedCliente.id ? updatedCliente : cliente
          )
        );
        setEditingClientes(null);
        setModalIsOpen(false);
      } else {
        console.error("Failed to update cliente");
      }
    } catch (error) {
      console.error("Error updating cliente:", error);
    }
  };

  const handleEditClick = (cliente) => {
    setEditingClientes(cliente);
    setModalIsOpen(true);
  };

  const handleDeleteClick = (cliente) => {
    setClienteAEliminar(cliente);
    setConfirmacionIsOpen(true);
  };

  return (
    <div className="overflow-x-auto py-6 px-4">
      <h1 className="text-4xl font-bold mb-20 p-6 text-center">Clientes</h1>

      <div className="inline-block min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.cuit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.correo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.numerotel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.direccion}</td>
                <td className="table-actions">
                  <button onClick={() => handleDeleteClick(cliente)} className="btn btn-delete">Eliminar</button>
                  <button onClick={() => handleEditClick(cliente)} className="btn btn-edit">Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ModalUniversal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          title="Editar Cliente"
          content={
            editingClientes && (
              <EditarClientes
                cliente={editingClientes}
                onUpdate={handleUpdate}
                onClose={() => setModalIsOpen(false)}
              />
            )
          }
        />

        <ModalUniversal
          isOpen={confirmacionIsOpen}
          onClose={() => setConfirmacionIsOpen(false)}
          title={`Confirmar Eliminación de Cliente`}
          content={
            clienteAEliminar && (
              <p>
                ¿Estás seguro de que deseas eliminar al cliente {clienteAEliminar.nombre} {clienteAEliminar.apellido} con ID {clienteAEliminar.id}?
              </p>
            )
          }
          onConfirm={handleDelete}
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      </div>
    </div>
  );
}
