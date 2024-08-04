// ConfirmacionModal.js
import Modal from 'react-modal';
import "../style/style.css"; // Importa el archivo CSS

export default function ConfirmacionModal({ isOpen, onClose, onConfirm, item, itemType }) {
  if (!item) return null; // Evita renderizar el modal si item es null

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={`Confirmar Eliminación de ${itemType}`}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2 className="text-lg font-bold mb-4">
          ¿Estás seguro de que deseas eliminar el {itemType} con ID {item.id}?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="btn btn-cancel"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm(item.id);
              onClose();
            }}
            className="btn btn-confirm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}
