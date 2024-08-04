import { useState, useEffect } from "react";
import Modal from "react-modal";
import EditarFacturas from "./EditarFacturas";
import ConfirmacionModal from "./ConfirmacionModal";
import "../style/style.css"; // Importa el archivo CSS

export default function FacturaList() {
  const [facturas, setFacturas] = useState([]);
  const [editingFacturas, setEditingFacturas] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmacionIsOpen, setConfirmacionIsOpen] = useState(false);
  const [itemAEliminar, setItemAEliminar] = useState(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await fetch("/api/FacturaList");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFacturas(data);
      } catch (error) {
        console.error("Error fetching facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/factura/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFacturas(facturas.filter((factura) => factura.id !== id));
      } else {
        console.error("Failed to delete factura");
      }
    } catch (error) {
      console.error("Error deleting factura:", error);
    }
  };

  const handleUpdate = async (updatedFactura) => {
    try {
      const response = await fetch(`/api/factura/${updatedFactura.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFactura),
      });
      if (response.ok) {
        setFacturas(
          facturas.map((factura) =>
            factura.id === updatedFactura.id ? updatedFactura : factura
          )
        );
        setEditingFacturas(null);
        setModalIsOpen(false);
      } else {
        console.error("Failed to update factura");
      }
    } catch (error) {
      console.error("Error updating factura:", error);
    }
  };

  const handleEditClick = (factura) => {
    setEditingFacturas(factura);
    setModalIsOpen(true);
  };

  const handleDeleteClick = (factura) => {
    setItemAEliminar(factura);
    setConfirmacionIsOpen(true);
  };

  return (
    <div className="overflow-x-auto py-6 px-4">
      <h1 className="text-4xl font-bold mb-20 p-6 text-center">Facturas</h1>

      <div className="inline-block min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facturas.map((factura) => (
              <tr key={factura.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {factura.cliente_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {factura.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {factura.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {factura.id}
                </td>
                <td className="table-actions">
                  <button
                    onClick={() => handleDeleteClick(factura)}
                    className="btn btn-delete btn-black"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleEditClick(factura)}
                    className="btn btn-edit"
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
          contentLabel="Editar factura"
          className="modal"
          overlayClassName="overlay"
        >
          {editingFacturas && (
            <EditarFacturas
              factura={editingFacturas}
              onUpdate={handleUpdate}
              onClose={() => setModalIsOpen(false)}
            />
          )}
        </Modal>

        <ConfirmacionModal
          isOpen={confirmacionIsOpen}
          onClose={() => setConfirmacionIsOpen(false)}
          onConfirm={handleDelete}
          item={itemAEliminar}
          itemType="factura"
        />
      </div>
    </div>
  );
}
