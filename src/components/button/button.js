import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {basic, red, blue, gray} from './button.module.css'

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