import _ from 'lodash';
import classNames from 'classnames'
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import connect from '../../utils/store-connect';
import { entries } from '../../store/diary/selectors';
import { createEntry } from '../../store/diary/actions';
import { EntryShape } from '../../data/entries';
import Container from '../../components/container/container';
import Page, { Header } from '../../layouts/page/page';
import NavBar from '../../components/nav-bar/nav-bar'
import EditEntryForm from './edit-entry-form';

class EditEntryPage extends Component {
  static propTypes = {
    entries: PropTypes.objectOf(EntryShape).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        date: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,

    createEntry: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  submitAddingForm = data => {
    const {
      createEntry,
      match: { params: { date } },
    } = this.props;
    return createEntry(data, date);
  };

  renderHeader() {
    const {
      match: { params: { date } },
      history: { goBack },
    } = this.props;
    return (
        <Header>
          <NavBar left={{
            icon: 'arrow_left',
            onClick: goBack,
          }}>{date}</NavBar>
        </Header>
    );
  }

  render() {
    const {
      entries,
      match: { params: { date } },
      history: { goBack },
    } = this.props;
    const entry = entries[date];
    return (
        <Page
            header={this.renderHeader()}
        >
          <Container>
            <EditEntryForm
                initialValues={entry}
                onSubmit={this.submitAddingForm}
                onSubmitSuccess={goBack}
            />
          </Container>
        </Page>
    );
  }
}

export default connect(
    {
      entries,
    },
    {
      createEntry,
    }
)(EditEntryPage);