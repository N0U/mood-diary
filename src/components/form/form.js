import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { handleSubmitError } from '../../utils/forms';
import Spinner from '../spinner/spinner';
import styles from './form.module.css';

export default class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { handleSubmit, onSubmit } = this.props;
    const submit = (...args) => handleSubmitError(onSubmit(...args));
    handleSubmit(submit)(e);
  };

  render() {
    const { className, submitting, children } = this.props;
    return (
      <form className={classNames(styles.form, className)} onSubmit={this.onSubmit}>
        {children}
        {submitting && <Spinner />}
      </form>
    );
  }
}