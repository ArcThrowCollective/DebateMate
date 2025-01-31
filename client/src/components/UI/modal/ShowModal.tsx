import React from 'react';
import './ShowModal.css';
import { Form } from '../../views/forms/Form';
import { IoCloseCircle } from 'react-icons/io5';

interface ModalProps {
  type: 'signup' | 'login' | 'channel' | 'topic' | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="bg_shape" onClick={onClose}></div>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <IoCloseCircle className="modal__close" size="2rem" onClick={onClose} />
        <Form type={type} onClose={onClose} />
      </div>
    </div>
  );
};
