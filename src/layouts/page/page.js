import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import NavBar from '../../components/nav-bar/nav-bar'
import TabBar, { Tab } from '../../components/tab-bar/tab-bar';
import Spinner from '../../components/spinner/spinner';
import styles from './page.module.css';
import { T } from '../../translations';

export const Header = ({ children }) => (
  <div className={styles.header}>{children}</div>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

const Page = ({ header, children, onLogout, loading }) => (
  <div className={styles.page}>
    {header || <Header>
      <NavBar right={{
        icon: 'logout',
        iconSize: 28,
        onClick: onLogout,
      }}
      >
        {T('top.title')}
      </NavBar>
      <TabBar>
        <Tab path='/diary'>{T('menu.diary')}</Tab>
        <Tab path='/timeline'>{T('menu.timeline')}</Tab>
      </TabBar>
    </Header>}
    <div className={styles.content}>
      {children}
    </div>
    {loading && <Spinner />}
  </div>
);

export default Page;


Page.propTypes = {
  header: PropTypes.node,
  onLogout: PropTypes.func,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};