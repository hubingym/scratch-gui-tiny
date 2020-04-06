import classNames from 'classnames';
import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

import Box from '../box/box.jsx';
import LanguageSelector from '../language-selector/language-selector.jsx';

import styles from './menu-bar.css';

// import helpIcon from '../../lib/assets/icon--tutorials.svg';
// import mystuffIcon from './icon--mystuff.png';
// import profileIcon from './icon--profile.png';
// import remixIcon from './icon--remix.svg';
import dropdownCaret from './dropdown-caret.svg';
import languageIcon from '../language-selector/language-icon.svg';

import scratchLogo from './scratch-logo.svg';

// import sharedMessages from '../../lib/shared-messages';

const ariaMessages = defineMessages({
  language: {
    id: 'gui.menuBar.LanguageSelector',
    defaultMessage: 'language selector',
    description: 'accessibility text for the language selection menu'
  },
  tutorials: {
    id: 'gui.menuBar.tutorialsLibrary',
    defaultMessage: 'Tutorials',
    description: 'accessibility text for the tutorials button'
  }
});

class MenuBar extends React.Component {
  render() {
    return (
      <Box
        className={classNames(
          this.props.className,
          styles.menuBar
        )}
      >
        <div className={styles.mainMenu}>
          <div className={styles.fileGroup}>
            <div className={classNames(styles.menuBarItem)}>
              <img
                alt="Scratch"
                className={classNames(styles.scratchLogo, {
                  [styles.clickable]: typeof this.props.onClickLogo !== 'undefined'
                })}
                draggable={false}
                src={this.props.logo}
                onClick={this.props.onClickLogo}
              />
            </div>

            {(this.props.canChangeLanguage) && (<div
              className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
            >
              <div>
                <img alt=''
                  className={styles.languageIcon}
                  src={languageIcon}
                />
                <img alt=''
                  className={styles.languageCaret}
                  src={dropdownCaret}
                />
              </div>
              <LanguageSelector label={this.props.intl.formatMessage(ariaMessages.language)} />
            </div>)}

            {(this.props.canManageFiles) && (
              <div
                className={classNames(styles.menuBarItem, styles.hoverable, {
                  [styles.active]: this.props.fileMenuOpen
                })}
              >
                <FormattedMessage
                  defaultMessage="File"
                  description="Text for file dropdown menu"
                  id="gui.menuBar.file"
                />
              </div>
            )}
          </div>
        </div>
      </Box>
    );
  }
}

MenuBar.defaultProps = {
  canChangeLanguage: true,
  canManageFiles: true,
  logo: scratchLogo,
  onShare: () => { }
};

export default injectIntl(MenuBar);
