import _ from 'lodash';
import classNames from 'classnames'
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import connect from '../../utils/store-connect';
import { isLoading, entries } from '../../store/diary/selectors';
import {
  fetchEntries,
} from '../../store/diary/actions';
import { authLogout } from '../../store/auth/actions';
import { EntryShape } from '../../data/entries';
import Waypoint from 'react-waypoint';
import Container from '../../components/container/container';
import { BlueButton } from '../../components/button/button';
import Block from '../../components/blocks/blocks';
import MonthCard from './timeline';
import { T } from '../../translations';
import styles from './timeline-page.module.css';
import Page from '../../layouts/page/page';

class TimelinePage extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    entries: PropTypes.objectOf(EntryShape).isRequired,

    fetchEntries: PropTypes.func.isRequired,
    authLogout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showSleep: true,
      showPower: true,
      showMood: true,
    };
  }

  componentDidMount() {
  }

  switchSleep = () => this.setState({
    showSleep: !this.state.showSleep,
  });

  switchPower = () => this.setState({
    showPower: !this.state.showPower,
  });

  switchMood = () => this.setState({
    showMood: !this.state.showMood,
  });

  fetchNextMonth = () => {
    const { lastLoaded } = this.state;

    let fetchMonth = lastLoaded ? moment(lastLoaded).subtract(1, 'month') : moment();
    this.props.fetchEntries(fetchMonth)
      .then(() => this.setState({
        lastLoaded: fetchMonth.startOf('month').valueOf(),
      }))
    ;
  };

  render() {
    const { authLogout, isLoading, entries } = this.props;
    const { showSleep, showPower, showMood, lastLoaded } = this.state;
    const allDisabled = !(showSleep || showPower || showMood);

    const cards = [];
    if(lastLoaded) {
      let date = moment().startOf('month');
      while(date.isSameOrAfter(lastLoaded, 'month')){
        cards.push(
          <MonthCard
            key={`MonthCard-${date.toSql()}`}
            month={date.toSql()}
            entries={entries}
            showSleep={showSleep || allDisabled}
            showPower={showPower || allDisabled}
            showMood={showMood || allDisabled}
          />
        );
        date.subtract(1, 'months');
      }
    }

    return (
      <Page onLogout={authLogout}>
        <Container>
          <div className={styles.menuRow}>
            <Block
              options={[
                {
                  label: T('params.sleep'),
                  active: showSleep,
                  color: '#22aee3',
                  onClick: this.switchSleep,
                },
                {
                  label: T('params.power'),
                  active: showPower,
                  color: '#f7bc0a',
                  onClick: this.switchPower,
                },
                {
                  label: T('params.mood'),
                  active: showMood,
                  color: '#6ebe41',
                  onClick: this.switchMood,
                }
              ]}
            />
          </div>
        </Container>
        {cards}
        {!isLoading &&
          <Waypoint
            key={lastLoaded ? lastLoaded : moment().toSql()}
            onEnter={this.fetchNextMonth}
            scrollableAncestor={window}
          />
        }
      </Page>
    );
  }
}

export default connect(
  {
    isLoading,
    entries
  },
  {
    fetchEntries,
    authLogout
  }
)(TimelinePage);