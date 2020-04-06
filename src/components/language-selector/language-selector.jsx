import PropTypes from 'prop-types';
import React from 'react';

import locales from 'scratch-l10n';
import styles from './language-selector.css';

import state from '../../states';

// supported languages to exclude from the menu, but allow as a URL option
const ignore = [];

function onChange(e) {
  const newLocale = e.target.value;
  if (state.locales.messagesByLocale[newLocale]) {
    state.locales.onChangeLanguage(newLocale);
  }
}

const LanguageSelector = (props) => {
  return (
    <select
      aria-label={props.label}
      className={styles.languageSelect}
      value={state.locales.locale}
      onChange={onChange}
    >
      {
        Object.keys(locales)
          .filter(l => !ignore.includes(l))
          .map(locale => (
            <option
              key={locale}
              value={locale}
            >
              {locales[locale].name}
            </option>
          ))
      }
    </select>
  )
};

LanguageSelector.propTypes = {
  label: PropTypes.string,
};

export default LanguageSelector;
