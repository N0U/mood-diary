import PropTypes from 'prop-types'

export const EntryShape = PropTypes.shape({
  date: PropTypes.string.isRequired,
  sleep: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  mood: PropTypes.number.isRequired,
  insomnia: PropTypes.bool,
  headache: PropTypes.bool,
  heartache: PropTypes.bool,
  comment: PropTypes.string,
});

export const SleepLabels = [
  '5-',
  '6-8',
  '8-9',
  '9-11',
  '12+'
];

export const ScaleSize = SleepLabels.length;