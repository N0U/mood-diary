import moment from "moment/moment";
import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames'
import { EntryShape, SleepLabels, ScaleSize } from '../../data/entries';
import Container from '../../components/container/container';
import { Button } from '../../components/button/button';
import Row from '../../components/row/row';
import { BlueBar, YellowBar, GreenBar, PinkBlocks } from '../../components/blocks/blocks';
import { T } from '../../translations';
import styles from './card.module.css';

const Entry = ({ date, sleep, power, mood, insomnia, headache, heartache, comment }) =>
  <div>
    <Row label={T('params.sleep')}><BlueBar value={sleep} max={ScaleSize} options={SleepLabels}/></Row>
    <Row label={T('params.power')}><YellowBar value={power} max={ScaleSize}/></Row>
    <Row label={T('params.mood')}><GreenBar value={mood} max={ScaleSize}/></Row>
    <hr className={styles.separator}/>
    <Row label=''>
      <PinkBlocks
        options={[
          {
            label: T('params.insomnia'),
            active: insomnia,
          },
          {
            label: T('params.headache'),
            active: headache,
          },
          {
            label: T('params.heartache'),
            active: heartache,
          },
        ]}
      />
    </Row>
    {comment && comment.trim() &&
      <Row>
        <div className={styles.comment}>{comment}</div>
      </Row>
    }
    <Button link={`/edit/${date}`}>{T('card.edit')}</Button>
  </div>;

const EmptyEntry = ({ date }) =>
  <div>
    <Button link={`/edit/${date}`}>{T('card.add')}</Button>
  </div>;

const Card = ({ date, entry }) => (
  <Container>
    {entry ? <Entry {...entry}/> : <EmptyEntry date={date}/>}
  </Container>
);

export default Card;

Card.propTypes = {
  date: PropTypes.string.isRequired,
  entry: PropTypes.shape(EntryShape),
};