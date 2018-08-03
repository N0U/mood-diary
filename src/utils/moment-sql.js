import moment from 'moment';

const SQL_FORMAT = 'YYYY-MM-DD';

moment.fn.toSql = function() {
  return this.format(SQL_FORMAT);
};