import classNames from 'classnames'
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DatePicker from 'react-day-picker';
import Modal from '../../components/modal/modal';

const DatePickerWindow = ({ date, onSelect, onClose }) => (
  <Modal
    onBackgroundClick={onClose}
  >
    <DatePicker
      todayButton='Today'
      selectedDays={moment(date).toDate()}
      onDayClick={(date, { disabled }) => {
        if(!disabled)
          onSelect(date.getTime());
      }}
      disabledDays={d => moment(d).isAfter(moment())}
      toMonth={moment().toDate()}
      initialMonth={moment(date).toDate()}
      firstDayOfWeek={1}
      fixedWeeks
    />
  </Modal>
);

export default DatePickerWindow;

DatePickerWindow.propTypes = {
  date: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};