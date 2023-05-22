import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onClose, modal }) => {
  useEffect(() => {
    const handlKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handlKeyDown);
    window.removeEventListener('keydown', handlKeyDown);
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdrop}>
      <div className={css.Modal}>
        <img src={modal.url} alt={modal.tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propType = {
  modal: PropTypes.objectOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default Modal;