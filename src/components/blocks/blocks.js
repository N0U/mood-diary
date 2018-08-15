import _ from 'lodash';
import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames'
import styles from './blocks.module.css';

const Blocks = ({ className, color, options, onClick }) => (
  <table className={classNames(className, styles.background, onClick && styles.editable)}>
    <tbody>
      <tr>
        {
          options.map(({ label, active, color: localColor, onClick: localClick }, i) =>
            <td
              style={{
                backgroundColor: active ? (localColor || color) : undefined,
                color: 'black',
              }}
              onClick={localClick || (onClick && (() => onClick(i)))}
            >
              {label}
            </td>)
        }
      </tr>
    </tbody>
  </table>
);

Blocks.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    active: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
  onClick: PropTypes.func,
};

export default Blocks;

export const Bar = ({ value, max, options = [], ...props }) => {
  value = Number.isInteger(value) ? value : -1;
  const blocks = [];
  _.times(max, i => {
    blocks.push({
      active: i <= value,
      label: options[i],
    });
  });
  return <Blocks options={blocks} {...props} />;
};

Bar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

export const BlueBar = (props) => <Bar color='#22aee3' {...props} />;

BlueBar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

export const YellowBar = (props) => <Bar color='#f7bc0a' {...props} />;

YellowBar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

export const GreenBar = (props) => <Bar color='#6ebe41' {...props} />;

GreenBar.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

export const PinkBlocks = (props) => <Blocks color='#da397c' {...props} />;

PinkBlocks.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    active: PropTypes.bool,
  })).isRequired,
  onClick: PropTypes.func,
};
