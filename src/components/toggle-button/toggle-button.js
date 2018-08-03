import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './toggle-button.module.css';

export const ToggleButton = ({ className, children, onClick, checked }) => (
  <div
    className={classNames(className, style.checkBox, checked && style.checked)}
    onClick={onClick}
  >
    {children}
  </div>
);

ToggleButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
};