import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import NavBar, { NavTitle, NavRight } from '../../components/nav-bar/nav-bar'
import TabBar, { Tab } from '../../components/tab-bar/tab-bar';
import styles from './page.module.css';
import { T } from '../../translations';

export const Header = ({ children }) => (
  <div className={styles.header}>{children}</div>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

const Page = ({ header, children }) => (
  <div className={styles.page}>
    {header || <Header>
      <NavBar>
        <NavTitle>{T('top.title')}</NavTitle>
        <NavRight onClick={() => {}} text={T('menu.logout')} />
      </NavBar>
      <TabBar>
        <Tab path='/diary'>{T('menu.diary')}</Tab>
        <Tab path='/timeline'>{T('menu.timeline')}</Tab>
      </TabBar>
    </Header>}
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

export default Page;


Page.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
};