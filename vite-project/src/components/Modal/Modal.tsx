import React from "react";
import './Modal.css'

type ModalProps = {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button className="modal__button" onClick={onConfirm}>Confirm</button>
        <button className="modal__button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
