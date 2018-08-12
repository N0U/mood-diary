import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import styles from './nav-bar.module.css';

const NavBar = ({ children }) => (
  <div className={styles.navbar}>
    {children}
  </div>);

export default NavBar;

NavBar.propTypes = {
  children: PropTypes.node,
};

export const NavLeft = ({ onClick, icon, iconSize = 20, text }) => (
  <button className={classNames(styles.navCtrl, styles.navLeft)} onClick={onClick}>
    {icon && <i className='f7-icons' style={{ ['font-size']: iconSize }}>{icon}</i>}
    {text}
  </button>
);

NavLeft.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  text: PropTypes.string,
};

export const NavTitle = ({ children }) => (
  <div className={styles.navTitle}>{children}</div>
);

export const NavRight = ({ onClick, icon, iconSize = 20, text }) => (
  <button className={classNames(styles.navCtrl, styles.navRight)} onClick={onClick}>
    {text}
    {icon && <i className='f7-icons' style={{ ['font-size']: iconSize }}>{icon}</i>}
  </button>
);

NavRight.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  text: PropTypes.string,
};
