import _ from 'lodash';
import moment from 'moment';

let entires = {};

export const fetch = (from , to) => _.values(entires)
  .filter(x => from <= x.date && x.date <= to)
  .sort((a, b) => a.date - b.date);

export const create = data => {
  const entry = {
    ...data,
    date: moment(data.date).startOf('day').valueOf(),
    id: Math.random().toString(),
  };
  entires[entry.date] = entry;
  return entry;
};

export const remove = id => {
  entires = _.omitBy(entires, x => x.id === id)
};