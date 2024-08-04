import Modal from 'react-modal'; // Asegúrate de importar Modal
import "../style/style.css"; // Importa el archivo CSS

export default function ModalUniversal({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  onConfirm, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar" 
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {content}
        <div className="flex justify-end space-x-4 mt-4">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="btn btn-confirm"
            >
              {confirmText}
            </button>
          )}
          <button
            onClick={onClose}
            className="btn btn-cancel"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
