import _ from 'lodash';
import classNames from 'classnames'
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import connect from '../../utils/store-connect';
import { entries, diaryDate } from '../../store/diary/selectors';
import {
  fetchEntries,
  createEntry,
  deleteEntry,
  setDiaryDate,
} from '../../store/diary/actions';
import { authLogout } from '../../store/auth/actions';
import { EntryShape } from '../../data/entries';
import Container from '../../components/container/container';
import { Segmented, Button } from '../../components/button/button';
import DatePickerWindow from '../../components/date-picker-window/date-picker-window';
import Card from './card';
import EditEntryForm from './edit-entry-form.js';
import styles from './diary-page.module.css';
import Page from '../../layouts/page/page';

class DiaryPage extends Component {
  static propTypes = {
    entries: PropTypes.objectOf(EntryShape).isRequired,
    date: PropTypes.string.isRequired,

    fetchEntries: PropTypes.func.isRequired,
    createEntry: PropTypes.func.isRequired,
    deleteEntry: PropTypes.func.isRequired,
    setDiaryDate: PropTypes.func.isRequired,
    authLogout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchEntries(this.props.date);
  }

  componentWillUpdate(nextProps, nextState) {
    const { date: oldDate } = this.props;
    const { date: newDate } = nextProps;
    if(!moment(oldDate).isSame(newDate, 'month'))
      this.props.fetchEntries(newDate);
  }

  showAddingForm = () => this.setState({
    showEditForm: true,
  });

  hideAddingForm = () => this.setState({
    showEditForm: false,
  });

  submitAddingForm = data => this.props.createEntry(data, this.props.date);

  nextDay = () => this.props.setDiaryDate(moment(this.props.date).add(1, 'days'));

  previousDay = () => this.props.setDiaryDate(moment(this.props.date).subtract(1, 'days'));

  showDatePicker = () => this.setState({
    showDatePicker: true,
  });

  hideDatePicker = () => this.setState({
    showDatePicker: false,
  });

  setDate = date => {
    this.setState({
      showDatePicker: false,
    });
    this.props.setDiaryDate(date);
  };

  render() {
    const { authLogout, entries, date } = this.props;
    const { showEditForm, showDatePicker } = this.state;
    const entry = entries[date];
    return (
      <Page onLogout={authLogout}>
        <Container>
          <Segmented>
            <Button onClick={this.previousDay} icon='arrow_left' />
            <Button
              className={classNames(styles.dateButton)}
              onClick={this.showDatePicker}
            >{moment(date).format('dddd, D MMMM YYYY')}</Button>
            <Button
              onClick={this.nextDay}
              disabled={moment().isSame(date, 'day')}
              icon='arrow_right'
            />
          </Segmented>
        </Container>
        <Card entry={entry} onEdit={this.showAddingForm}/>
        {showEditForm &&
          <EditEntryForm
            initialValues={entry}
            onCancel={this.hideAddingForm}
            onSubmit={this.submitAddingForm}
            onSubmitSuccess={this.hideAddingForm}
          />}
        {showDatePicker &&
          <DatePickerWindow
            date={date}
            onSelect={this.setDate}
            onClose={this.hideDatePicker}
          />
        }
      </Page>
    );
  }
}

export default connect(
  {
    entries,
    date: diaryDate,
  },
  {
    fetchEntries,
    createEntry,
    deleteEntry,
    setDiaryDate,
    authLogout,
  }
)(DiaryPage);
