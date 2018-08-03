import _ from 'lodash';
import moment from "moment/moment";
import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames'
import { EntryShape, SleepLabels, ScaleSize } from '../../data/entries';
import { FlexibleWidthXYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
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
  const monthStart = moment(month).startOf('month');

  const monthEntries = _.values(entries)
    .filter(x => monthStart.isSame(x.date, 'month'))
    .sort((a, b) => moment(a).valueOf() - moment(b).valueOf());

  const sleepData = monthEntries.map(x => ({
      date: x.date,
      value: x.sleep,
    }));
  const powerData = monthEntries.map(x => ({
    date: x.date,
    value: x.power,
  }));
  const moodData = monthEntries.map(x => ({
    date: x.date,
    value: x.mood,
  }));

  return (
    <Container>
      <div className={styles.cardTitle}>{monthStart.format('MMMM YYYY')}</div>
      <FlexibleWidthXYPlot
        height={300}
        getY={x => moment(x.date).day()}
        getX={x => x.value}
      >
        <XAxis
          orientation='top'
        />
        <YAxis
        />
        <LineSeries color='#22aee3' data={sleepData} />
        <LineSeries color='#f7bc0a' data={powerData} />
        <LineSeries color='#6ebe41' data={moodData} />
      </FlexibleWidthXYPlot>
    </Container>
  );
};

export const Timeline = ({ entries }) => {
  const entriesList = _.values(entries)
    .sort((a, b) => moment(a).valueOf() - moment(b).valueOf());

  const sleepData = entriesList.map(x => ({
    date: x.date,
    value: x.sleep,
  }));
  const powerData = entriesList.map(x => ({
    date: x.date,
    value: x.power,
  }));
  const moodData = entriesList.map(x => ({
    date: x.date,
    value: x.mood,
  }));

  return (
    <Container>
      <FlexibleWidthXYPlot
        height={300}
        getY={x => moment(x.date).day()}
        getX={x => x.value}
      >
        <XAxis
          orientation='top'
        />
        <YAxis
        />
        <LineSeries color='#22aee3' data={sleepData} />
        <LineSeries color='#f7bc0a' data={powerData} />
        <LineSeries color='#6ebe41' data={moodData} />
      </FlexibleWidthXYPlot>
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