import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import style from './background.module.css';

const Background = ({ children, local, onClick }) => (
  <div
    className={classNames(style.container, local ? style.local : style.global)}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Background;

Background.propTypes = {
  children: PropTypes.node.isRequired,
  local: PropTypes.bool,
  onClick: PropTypes.func,
};