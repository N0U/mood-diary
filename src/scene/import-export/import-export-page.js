import React, { Component } from 'react';
import PropTypes from 'prop-types'
import connect from '../../utils/store-connect';
import { entries } from '../../store/diary/selectors';
import {
  exportDiary,
} from '../../store/diary/actions';
import { EntryShape } from '../../data/entries';
import Container from '../../components/container/container';
import { BlueButton } from '../../components/button/button';

class ImportExportPage extends Component {
  static propTypes = {
    entries: PropTypes.objectOf(EntryShape).isRequired,

    exportDiary: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
  }

  exportData = () => {
    const { text } = this.state;
    const array = JSON.parse(text);
    console.log(text, array);
    if(Array.isArray(array) && array.length > 0)
      this.props.exportDiary(array);
  };

  render() {
    const { entries } = this.props;
    const { text } = this.state;
    return (
      <div>
        <Container>
          <textarea value={JSON.stringify(_.values(entries))}/>
        </Container>
        <Container>
          <textarea value={text} onChange={e => this.setState({ text: e.target.value })}/>
          <BlueButton value='Export' onClick={this.exportData}/>
        </Container>
      </div>
    );
  }
}

export default connect(
  {
    entries
  },
  {
    exportDiary,
  }
)(ImportExportPage);
