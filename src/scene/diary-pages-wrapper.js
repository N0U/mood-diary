import React, { Component } from 'react';
import PropTypes from 'prop-types'
import connect from '../utils/store-connect';
import { isLoading } from '../store/diary/selectors';
import {
  fetchEntries,
} from '../store/diary/actions';
import Spinner from '../components/spinner/spinner';

class DiaryPagesWrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool.isRequired,

    fetchEntries: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { isLoading, children } = this.props;
    return (
      <div>
        {children}
        {isLoading && <Spinner />}
      </div>
    );
  }
}

export default connect(
  {
    isLoading,
  },
  {
    fetchEntries,
  }
)(DiaryPagesWrapper);
