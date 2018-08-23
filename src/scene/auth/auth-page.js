import _ from 'lodash';
import classNames from 'classnames'
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import connect from '../../utils/store-connect';
import { isLoading, options } from '../../store/auth/selectors';
import {
  initAuth,
  loginOAuth2,
} from '../../store/auth/actions';
import Spinner from '../../components/spinner/spinner';
import { Button } from '../../components/button/button';
import Container from '../../components/container/container';
import Row from '../../components/row/row';
import NavBar, { NavTitle } from '../../components/nav-bar/nav-bar'
import Page, { Header } from '../../layouts/page/page';
import { T } from '../../translations';

import styles from './auth-page.module.css';

class AuthPage extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    options: PropTypes.objectOf(PropTypes.string).isRequired,

    initAuth: PropTypes.func.isRequired,
    loginIntoVk: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.initAuth();
  }

  vkLogin = () => {
    const { options: { vk }, loginOAuth2 } = this.props;
    vk && loginOAuth2(vk);
  };

  gDiskLogin = () => {};

  renderHeader() {
    return (
      <Header>
        <NavBar>{T('top.title')}</NavBar>
      </Header>
    );
  }

  render() {
    const { isLoading, entries } = this.props;
    return (
      <Page header={this.renderHeader()}>
        <Container>
          <Row><Button className={styles.authButton} onClick={this.vkLogin}>Vk</Button></Row>
        </Container>
        {isLoading && <Spinner />}
      </Page>
    );
  }
}

export default connect(
  {
    isLoading,
    options,
  },
  {
    initAuth,
    loginOAuth2,
  }
)(AuthPage);
