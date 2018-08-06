import _ from 'lodash';
import classNames from 'classnames'
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { BlueButton } from '../../components/button/button';
import Container from '../../components/container/container';
import Row from '../../components/row/row';
import styles from './about-page.module.css';

class AboutPage extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Container>
          Hello world
        </Container>
      </div>
    );
  }
}

export default AboutPage;
