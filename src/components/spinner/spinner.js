import React from 'react';
import PropTypes from 'prop-types';
import Background from '../background/background';
import style from './spinner.module.css';

const Spinner = ({ local }) => (
  <Background local={local}>
    <div className={style.spinner} />
  </Background>
);

export default Spinner;

Spinner.propTypes = {
  local: PropTypes.bool,
};