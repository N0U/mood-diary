import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { Segmented, Button } from '../button/button';
import styles from './tab-bar.module.css';

const TabBar = ({ children }) => (
  <div className={styles.tabbar}>
    <Segmented>{children}</Segmented>
  </div>
);

export default TabBar;

TabBar.propTypes = {
  children: PropTypes.node.isRequired,
};

TabBar.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired
    }).isRequired,
  }).isRequired
};

export const Tab = ({ path, children }, { router: { history: { push, location } } }) => {
  console.log(location);
  return (
    <Button active={location.pathname === path} onClick={() => push(path)}>{children}</Button>
  );
};

Tab.propTypes = {
  path: PropTypes.string.isRequired,
};

Tab.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired
    }).isRequired,
  }).isRequired
};