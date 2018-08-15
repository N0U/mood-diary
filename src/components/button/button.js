import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getPush } from '../../utils/router-context';
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
                         onClick, link, disabled = false, children,
                          active }, ctx) => {
  let action;
  if(onClick)
    action = onClick;
  else if(link) {
    const push = getPush(ctx);
    if(push)
      action = () => push(link);
  }
  return (<button
    className={classNames(styles.button, styles.buttonBlue, active && styles.active, className)}
    disabled={disabled}
    onClick={action}
  >
    {icon && <i className='f7-icons' style={{ ['font-size']: iconSize }}>{icon}</i>}
    {children}
  </button>);
};

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  link: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  active: PropTypes.bool,
};

Button.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired
    }).isRequired,
  }).isRequired
};

export const Segmented = ({ children }) => (
  <div className={styles.segmented}>{children}</div>
);

Segmented.propTypes = {
  children: PropTypes.node,
};
