import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './container.module.css';

const Container = ({ className, children }) => (
  <div className={classNames(className, styles.container)}>
    {children}
  </div>
);

export default Container;

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};