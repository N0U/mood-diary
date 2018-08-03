import React from 'react';
import PropTypes from 'prop-types';
import Background from '../background/background';
import style from './modal.module.css';

const Modal = ({ children, onBackgroundClick }) => (
  <Background onClick={onBackgroundClick}>
    <div
      className={style.container}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  </Background>
);

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onBackgroundClick: PropTypes.func,
};