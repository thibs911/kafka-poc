import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';

import fr from 'react-intl/locale-data/fr';

import en from 'react-intl/locale-data/en';

import HeaderBar from '../../components/header-bar';
import Calculator from '../calculator'; // eslint-disable-line
import frMessages from '../../locale/locale-fr.json';
import enMessages from '../../locale/locale-en.json';
import { updateStack, toggleRandomMode } from '../../actions/calculator';
import { randomize } from './service';

import crudRoutes from '../../crud-routes/';
import styles from './style.css';

const locales = {
  fr: frMessages,
  en: enMessages,
};

addLocaleData([...fr, ...en]);
export class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
    };
  }
  onKeyPress = e => {
    if (e.key === ' ') {
      if (this.props.randomMode) {
        this.props.toggleRandomMode();
        clearInterval(this.state.interval);
      } else {
        this.props.toggleRandomMode();
        const interval = setInterval(this.random, 2000);
        this.setState({ interval });
      }
    }
  };

  random = () => {
    this.props.updateStack(randomize());
  };

  render() {
    return (
      <IntlProvider
        locale={this.props.languageSelected}
        messages={locales[this.props.languageSelected]}
      >
        <div
          className={styles.root}
          onKeyPress={this.onKeyPress}
          role="presentation"
        >
          <HeaderBar />
          <Switch>
            <Route path="/" component={Calculator} />
            {crudRoutes.map(route => route)}
          </Switch>
        </div>
      </IntlProvider>
    );
  }
}

Root.propTypes = {
  languageSelected: PropTypes.string,
  children: PropTypes.element,
  randomMode: PropTypes.bool,
  toggleRandomMode: PropTypes.func,
  updateStack: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    languageSelected: state.language.selected,
    randomMode: state.calculator.randomMode,
  };
}

const mapDispatchToProps = dispatch => ({
  updateStack(payload) {
    dispatch(updateStack(payload));
  },
  toggleRandomMode() {
    dispatch(toggleRandomMode());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
