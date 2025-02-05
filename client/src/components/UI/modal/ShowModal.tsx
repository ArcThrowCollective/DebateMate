import React from 'react';
import './ShowModal.css';
import { Form } from '../../views/forms/Form';
import { IoCloseCircle } from 'react-icons/io5';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'signup' | 'login' | 'channel' | 'topic' | 'vote' | null;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ type, onClose, children }) => {
  if (!type) return null;

  return (
    <div className="overlay" onClick={onClose}>
      {type !== 'vote' && <div className="bg_shape" onClick={onClose}></div>}
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <IoCloseCircle className="modal__close" size="2rem" onClick={onClose} />
        {type === 'vote' ? children : <Form type={type} onClose={onClose} />}
      </div>
    </div>
  );
};
