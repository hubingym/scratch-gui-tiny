import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
// import {connect} from 'react-redux';
// import {selectLocale} from '../reducers/locales';
// import {closeLanguageMenu} from '../reducers/menus';

import LanguageSelectorComponent from '../components/language-selector/language-selector.jsx';

import state from '../states';

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleChange'
    ]);
    document.documentElement.lang = props.currentLocale;
  }
  handleChange(e) {
    const newLocale = e.target.value;
    if (this.props.messagesByLocale[newLocale]) {
      this.props.onChangeLanguage(newLocale);
      document.documentElement.lang = newLocale;
    }
  }
  render() {
    const {
      onChangeLanguage, // eslint-disable-line no-unused-vars
      messagesByLocale, // eslint-disable-line no-unused-vars
      children,
      ...props
    } = this.props;
    return (
      <LanguageSelectorComponent
        onChange={this.handleChange}
        {...props}
      >
        {children}
      </LanguageSelectorComponent>
    );
  }
}

LanguageSelector.propTypes = {
  children: PropTypes.node,
  currentLocale: PropTypes.string.isRequired,
  // Only checking key presence for messagesByLocale, no need to be more specific than object
  messagesByLocale: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChangeLanguage: PropTypes.func.isRequired
};

const dispatchProps = {
  onChangeLanguage: locale => {
    state.locales.selectLocale(locale);
    state.scratchGui.menus.closeLanguageMenu();
  }
};

const LanguageSelectorState = (props) => {
  return (
    <LanguageSelector
      {...props}
      currentLocale={state.locales.locale}
      messagesByLocale={state.locales.messagesByLocale}
      {...dispatchProps}
    />
  );
}

export default LanguageSelectorState;
