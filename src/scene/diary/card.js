import moment from "moment/moment";
import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames'
import { EntryShape, SleepLabels, ScaleSize } from '../../data/entries';
import Container from '../../components/container/container';
import { BlueButton } from '../../components/button/button';
import Row from '../../components/row/row';
import { BlueBar, YellowBar, GreenBar, PinkBlocks } from '../../components/blocks/blocks';
import { T } from '../../translations';
import styles from './card.module.css';

const Entry = ({ sleep, power, mood, insomnia, headache, heartache, comment, onEdit }) =>
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
    <BlueButton value={T('card.edit')} onClick={onEdit}/>
  </div>;

const EmptyEntry = ({ onAdd }) =>
  <div>
    <BlueButton value={T('card.add')} onClick={onAdd}/>
  </div>;

const Card = ({ entry, onEdit }) => (
  <Container>
    {entry ? <Entry {...entry} onEdit={onEdit}/> : <EmptyEntry onAdd={onEdit}/>}
  </Container>
);

export default Card;

Card.propTypes = {
  entry: PropTypes.shape(EntryShape),
  onEdit: PropTypes.func.isRequired,
};