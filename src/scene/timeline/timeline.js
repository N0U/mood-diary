import _ from 'lodash';
import moment from "moment/moment";
import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames'
import { EntryShape, SleepLabels, ScaleSize } from '../../data/entries';
import Container from '../../components/container/container';
import styles from './timeline.module.css';

const GraphRow = ({ color, label, value }) => (
  <tr className={styles.graph}>
    {
      _.times(
        ScaleSize,
        i => (
          <td
            style={{
              backgroundColor: i <= value && color,
            }}
          > </td>
        )
      )
    }
  </tr>
);

const EntryGraphs = ({
                       sleep, power, mood, insomnia, headache, heartache,
                       showSleep, showPower, showMood,
                     }) => (
  <table className={styles.bars}>
    <tbody>
      {showSleep && <GraphRow color='#22aee3' label='S' value={sleep} />}
      {showPower && <GraphRow color='#f7bc0a' label='P' value={power} />}
      {showMood && <GraphRow color='#6ebe41' label='M' value={mood} />}
    </tbody>
  </table>
);

const Entry = ({ className, date, entry, ...props }) => (
  <tr className={classNames(className)}>
    <td className={styles.day}>{date.format('D')}</td>
    <td className={styles.barsContainer}>{entry && <EntryGraphs {...entry} {...props} />}</td>
  </tr>
);

const MonthCard = ({ month, entries, ...props }) => {
  const upperDate = moment(month).endOf('month').startOf('day');
  const lowerDate = moment(month).startOf('month').startOf('day');
  let date = upperDate.clone();

  const elems = [];
  while(date.isSameOrAfter(lowerDate, 'day')){
    const day = date.startOf('day').toSql();
    const entry = entries[day];
    elems.push(<Entry
      className={date.day() === 1 && styles.monday}
      key={`Entry-${day}`}
      date={date.clone()}
      entry={entry}
      {...props}
    />);
    date.subtract(1, 'days');
  }

  return (
    <Container>
      <div className={styles.cardTitle}>{upperDate.format('MMMM YYYY')}</div>
      <table className={styles.monthTable}>
        <tbody>
          {elems}
        </tbody>
      </table>
    </Container>
  );
};

export default MonthCard;

MonthCard.propTypes = {
  month: PropTypes.number.isRequired,
  entries: PropTypes.objectOf(EntryShape).isRequired,
  showSleep: PropTypes.bool,
  showPower: PropTypes.bool,
  showMood: PropTypes.bool,
};