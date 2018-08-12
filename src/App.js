import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import connect from './utils/store-connect';
import { isLogged } from './store/auth/selectors';
import { authLogout } from './store/auth/actions';
import { locale } from './store/settings/selectors';
import { setLocale } from './store/settings/actions';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import NavBar, { NavTitle } from './components/nav-bar/nav-bar';
import Row from './components/row/row';
import { BlueButton } from './components/button/button';
import Modal from './components/modal/modal';
import AuthPage from './scene/auth/auth-page';
import DiaryPage from './scene/diary/diary-page';
import TimelinePage from './scene/timeline/timeline-page';
import ImportExportPage from './scene/import-export/import-export-page';
import styles from './app.module.css';
import { T } from './translations';

const PageSwitch = ({ name, pages }) => {
  const Page = pages[name];
  return Page ? <Page /> : <div>Page not found</div>;
};

class App extends Component {
  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,

    authLogout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  showMenu = () => this.setState({
    showMenu: true,
  });

  hideMenu = () => this.setState({
    showMenu: false,
  });

  onLogout = () => {
    this.props.authLogout();
    this.hideMenu();
  };

  render() {
    const { isLogged, locale } = this.props;
    const { showMenu } = this.state;
    return (
      <Router>
        <div className={styles.container}>
          {isLogged && <Switch>
            <Route path="/diary" component={DiaryPage} />
            <Route path="/timeline" component={TimelinePage} />
            <Route path="/impexp" component={ImportExportPage} />
            <Route render={() => <Redirect to="/diary" />}/>
          </Switch>}
          {!isLogged && <Route component={AuthPage} />}
        </div>
      </Router>
    );
  }
}

export default connect(
    {
      isLogged,
      locale,
    },
    {
      authLogout,
      setLocale,
    }
)(App);
