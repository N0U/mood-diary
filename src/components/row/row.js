import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import style from './row.module.css';

const Row = ({ label, children }) => (
  <div className={style.row}>
    {label && <div className={style.label}>{label}</div>}
    <div className={style.content}>{children}</div>
  </div>);

export default Row;

Row.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};