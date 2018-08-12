import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { Button } from '../button/button';
import styles from './nav-bar.module.css';

const NavCtrl = ({ onClick = () => {}, icon, iconSize = 20, text }) => (
  <div className={classNames(styles.navCtrl)} onClick={onClick}>
    {icon && <i className='f7-icons' style={{ ['font-size']: iconSize }}>{icon}</i>}
    {text}
  </div>
);

NavCtrl.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  text: PropTypes.string,
};

const NavBar = ({ left, children, right }) => (
  <div className={styles.navbar}>
    <NavCtrl {...left} />
    <div className={styles.navTitle}>{children}</div>
    <NavCtrl {...right} />
  </div>);

export default NavBar;

NavBar.propTypes = {
  left: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    text: PropTypes.string,
  }),
  children: PropTypes.node,
  right: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    text: PropTypes.string,
  }),
};