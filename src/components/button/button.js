import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles, {basic, red, blue, gray} from './button.module.css'

export const BasicButton = ({className, ...props}) => (
    <input className={classNames(className, basic)} type='Submit' onChange={() => {}} {...props} />
);

BasicButton.propTypes = {
  className: PropTypes.string,
};

export const RedButton = ({className, ...props}) => (
    <BasicButton className={classNames(red, className)} {...props} />
);

export const BlueButton = ({className, ...props}) => (
    <BasicButton className={classNames(blue, className)} {...props} />
);

export const GrayButton = ({className, ...props}) => (
  <BasicButton className={classNames(gray, className)} {...props} />
);

export const Button = ({ className, color, icon, iconSize = 20,
                         onClick, disabled = false, children }) => (
  <button
    className={classNames(styles.button, styles.buttonBlue, className)}
    disabled={disabled}
    onClick={onClick}
  >
    {icon && <i className='f7-icons' style={{ ['font-size']: iconSize }}>{icon}</i>}
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export const Segmented = ({ children }) => (
  <div className={styles.segmented}>{children}</div>
);

Segmented.propTypes = {
  children: PropTypes.node,
};
