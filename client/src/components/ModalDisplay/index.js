import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const ModalDisplay = ({ component: Component, isOpen, closeModal }) => {
    const onRequestClose = () => closeModal();
    return (
      <Modal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={onRequestClose}
        >
            {Component}
        </Modal>
    );
};
 
export default ModalDisplay;