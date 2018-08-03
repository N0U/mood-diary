import { connect } from 'react-redux'
import selectorsConnect from './selectors';

export default (selectors, actions) => connect(selectorsConnect(selectors), actions);