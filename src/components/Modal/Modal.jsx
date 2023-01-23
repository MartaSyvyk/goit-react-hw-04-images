import css from '../../styles.module.css';
import { createPortal } from 'react-dom';
import React, {useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const modalRoot = document.querySelector('#modal-root');
  
export const Modal = ({ onClose, modal, url }) => {

 const handleClose =  useCallback((event) => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      onClose();
    }
  }, [modal, onClose]); 

  useEffect(() => {
    window.addEventListener('keydown', handleClose);
  }, [modal, handleClose]);



  return createPortal(
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={url} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};
