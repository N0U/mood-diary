import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './metric.module.css';
import mood0 from '../../assets/mood-0.svg'
import mood1 from '../../assets/mood-1.svg'
import mood2 from '../../assets/mood-2.svg'
import mood3 from '../../assets/mood-3.svg'

import power0 from '../../assets/power-0.svg'
import power1 from '../../assets/power-1.svg'
import power2 from '../../assets/power-2.svg'
import power3 from '../../assets/power-3.svg'

import insomnia from '../../assets/insomnia.svg';
import headache from '../../assets/headache.svg';
import heartache from '../../assets/heartache.svg';

const Icon = ({ src }) =>
  <img className={style.icon} src={src} />;

export const SleepMetric = ({ value }) => {
  const VALUE_TO_TEXT = {
    [0]: '6-8',
    [1]: '8-9',
    [2]: '9-11',
    [3]: '12+',
  };
  return <span className={style.sleep}>{VALUE_TO_TEXT[value]}</span>
};

export const PowerMetric = ({ value }) => {
  const VALUE_TO_ICON = {
    [0]: power0,
    [1]: power1,
    [2]: power2,
    [3]: power3,
  };
  return <Icon src={VALUE_TO_ICON[value]}/>
};

export const MoodMetric = ({ value }) => {
  const VALUE_TO_ICON = {
    [0]: mood0,
    [1]: mood1,
    [2]: mood2,
    [3]: mood3,
  };
  return <Icon src={VALUE_TO_ICON[value]}/>
};

export const InsomniaMetric = () => <Icon src={insomnia}/>;
export const HeadacheMetric = () => <Icon src={headache}/>;
export const HeartacheMetric = () => <Icon src={heartache}/>;