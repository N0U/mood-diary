import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { Field, Fields } from 'redux-form';
import { ToggleButton } from '../toggle-button/toggle-button';
import style from './fields.module.css';

const RenderTextInput = ({ className, meta: { touched, invalid }, input, ...props }) => (
  <div className={style.inputWrapper}>
    <input className={classNames(style.text, className)} type="text" {...props} {...input}/>
  </div>
);

export const TextField = ({ name, ...props }) => (
  <Field
    name={name}
    component={RenderTextInput}
    {...props}
  />
);

TextField.propTypes = {
  name: PropTypes.string.isRequired,
};

const RenderTextAreaInput = ({ className, meta: { touched, invalid }, input, ...props }) => (
  <div className={style.inputWrapper}>
    <textarea className={classNames(style.textArea, className)} type="text" {...props} {...input} />
  </div>
);

export const TextAreaField = ({ name, ...props }) => (
  <Field
    name={name}
    component={RenderTextAreaInput}
    {...props}
  />
);

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
};

const RenderSelectInput = ({ className, options, meta: { touched, invalid }, input, ...props }) => (
  <div className={style.inputWrapper}>
    <select className={classNames(style.select, className)} {...props} {...input}>
      {options.map(x => <option value={x.value}>{x.label || x.value}</option>)}
    </select>
  </div>
);

export const SelectField = ({ name, ...props }) => (
  <Field
    name={name}
    component={RenderSelectInput}
    {...props}
  />
);

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string,
  })).isRequired,
};

const RenderCheckBox = ({ className, meta: { touched, invalid }, children, input: { value, onChange }, ...props }) => (
  <ToggleButton className={className} onClick={() => onChange(!value)} checked={!!value} {...props}>
    {children}
  </ToggleButton>
);

export const CheckBoxField = ({ name, ...props }) => (
  <Field
    name={name}
    component={RenderCheckBox}
    {...props}
  />
);

CheckBoxField.propTypes = {
  ...ToggleButton.propTypes,
  name: PropTypes.string.isRequired,
};

const RenderRadioBox = ({ className, options, meta: { touched, invalid }, children, option, input: { value, onChange }, ...props }) => (
  <ToggleButton className={className} onClick={() => onChange(option)} checked={option === value} {...props}>
    {children}
  </ToggleButton>
);

export const RadioBoxField = ({ name, ...props }) => (
  <Field
    name={name}
    component={RenderRadioBox}
    {...props}
  />
);

RadioBoxField.propTypes = {
  ...ToggleButton.propTypes,
  option: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
};

const RenderBarInput = ({ meta: { touched, invalid }, input: { value, onChange }, bar, ...props }) => {
  const Bar = bar;
  return <Bar
    value={value}
    onClick={onChange}
    {...props}
  />;
};

export const BarField = ({ name, ...props }) => (
  <Field
    name={name}
    component={RenderBarInput}
    {...props}
  />
);

BarField.propTypes = {
  name: PropTypes.string.isRequired,
  bar: PropTypes.func.isRequired,
};

const RenderBlocksInput = ({ blocks, options, ...props }) => {
  const Blocks = blocks;
  return <Blocks
    onClick={i => {
      const opt = options[i];
      if(opt){
        const { input } = props[opt.name];
        input.onChange(!input.value);
      }
    }}
    options={options.map(x => ({
      label: x.label,
      active: props[x.name].input.value,
    }))}
    {...props}
  />;
};

export const BlockFields = ({ options, ...props }) => (
  <Fields
    names={options.map(x => x.name)}
    component={RenderBlocksInput}
    options={options}
    {...props}
  />
);