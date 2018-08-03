import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import PropTypes from "prop-types";
import { EntryShape } from '../../data/entries';
import Card from './card';
import styles from './calendar.module.css';

const List = ({ month, entries, onAdd }) => {
  const firstDay = moment(month).startOf('month');
  const lastDay = moment(month).endOf('month');
  const days = lastDay.diff(firstDay, 'days');
  let day = firstDay;

  return <div className={styles.cardsList}>
    {_.times(days, () => {
      const date = day.startOf('day').valueOf();
      const entry = entries[date];
      day.add(1, 'days');
      return <div key={date} className={styles.cardWrapper}>
        <Card date={date} entry={entry} onAdd={onAdd} />
      </div>;
    })}
  </div>;
};


const Calendar = ({ month, entries, onAdd }) => {
  const firstDay = moment(month).startOf('month').startOf('isoWeek');
  const lastDay = moment(month).endOf('month').endOf('isoWeek');
  const weeks = Math.ceil(lastDay.diff(firstDay, 'weeks', true));
  let day = firstDay;

  return <table className={styles.calendar}>
    <tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>
    {_.times(weeks, () => <tr>
      {_.times(7, () => {
        const date = day.startOf('day').valueOf();
        const entry = entries[date];
        day.add(1, 'days');
        return <td className={styles.cardCell} key={date} >
          <Card date={date} entry={entry} onAdd={onAdd} />
        </td>;
      })}
    </tr>)}
  </table>;
};

export default List;

Calendar.propTypes = {
  month: PropTypes.number.isRequired,
  entries: PropTypes.objectOf(EntryShape).isRequired,
  onAdd: PropTypes.func.isRequired,
};