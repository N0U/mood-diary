import moment from "moment/moment";
import React from 'react';
import PropTypes from "prop-types";
import { EntryShape } from '../../data/entries';
import { BlueButton } from '../../components/button/button';
import {
  SleepMetric,
  PowerMetric,
  MoodMetric,
  InsomniaMetric,
  HeadacheMetric,
  HeartacheMetric
} from './metric';
import styles from './card.module.css';

const DayCard = ({ date, children }) =>
  <div className={styles.card}>
    <div className={styles.day}>{moment(date).format("D")}</div>
    <div>{children}</div>
  </div>;

const Entry = ({ sleep, power, mood, insomnia, headache, heartache }) =>
  <div>
    <table className={styles.metrics}>
      <tr>
        <td>
          <SleepMetric value={sleep} />
        </td>
        <td>
          <PowerMetric value={power} />
        </td>
        <td>
          <MoodMetric value={mood} />
        </td>
      </tr>
      <tr>
        <td>
          {insomnia && <InsomniaMetric />}
        </td>
        <td>
          {headache && <HeadacheMetric />}
        </td>
        <td>
          {heartache && <HeartacheMetric />}
        </td>
      </tr>
    </table>
  </div>;

const EmptyEntry = ({ onAdd }) =>
  <div>
    <BlueButton value='Add' onClick={onAdd}/>
  </div>;

const Card = ({ date, entry, onAdd }) =>
  <DayCard date={date}>
    {entry ? <Entry {...entry} /> : <EmptyEntry onAdd={() => onAdd(date)}/>}
  </DayCard>;

export default Card;

Card.propTypes = {
  date: PropTypes.number.isRequired,
  entry: PropTypes.shape(EntryShape),
  onAdd: PropTypes.func.isRequired,
};