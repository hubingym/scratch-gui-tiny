import React from 'react';
// import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';

import Box from '../box/box.jsx';

import styles from './menu-bar.css';
import scratchLogo from './scratch-logo.svg';

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
          </div>
        </div>
      </Box>
    );
  }
}

MenuBar.defaultProps = {
  logo: scratchLogo,
  onShare: () => {}
};

export default MenuBar;
