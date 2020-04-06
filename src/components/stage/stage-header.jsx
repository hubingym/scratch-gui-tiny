import classNames from 'classnames';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import Controls from '../controls/controls.jsx';
import { getStageDimensions } from '../../lib/screen-utils';
import { STAGE_SIZE_MODES } from '../../lib/layout-constants';

import fullScreenIcon from './icon--fullscreen.svg';
import largeStageIcon from './icon--large-stage.svg';
import smallStageIcon from './icon--small-stage.svg';
import unFullScreenIcon from './icon--unfullscreen.svg';

import scratchLogo from '../menu-bar/scratch-logo.svg';
import styles from './stage-header.css';

import state from '../../states';

const messages = defineMessages({
  largeStageSizeMessage: {
    defaultMessage: 'Switch to large stage',
    description: 'Button to change stage size to large',
    id: 'gui.stageHeader.stageSizeLarge'
  },
  smallStageSizeMessage: {
    defaultMessage: 'Switch to small stage',
    description: 'Button to change stage size to small',
    id: 'gui.stageHeader.stageSizeSmall'
  },
  fullStageSizeMessage: {
    defaultMessage: 'Enter full screen mode',
    description: 'Button to change stage size to full screen',
    id: 'gui.stageHeader.stageSizeFull'
  },
  unFullStageSizeMessage: {
    defaultMessage: 'Exit full screen mode',
    description: 'Button to get out of full screen mode',
    id: 'gui.stageHeader.stageSizeUnFull'
  },
  fullscreenControl: {
    defaultMessage: 'Full Screen Control',
    description: 'Button to enter/exit full screen mode',
    id: 'gui.stageHeader.fullscreenControl'
  }
});

function onKeyPress(event) {
  if (event.key === 'Escape' && state.mode.isFullScreen) {
    state.mode.setFullScreen(false);
  }
}

function onSetStageLarge() {
  state.stageSize.setStageSize(STAGE_SIZE_MODES.large);
}

function onSetStageSmall() {
  state.stageSize.setStageSize(STAGE_SIZE_MODES.small);
}

function onSetStageFull() {
  state.mode.setFullScreen(true);
}

function onSetStageUnFull() {
  state.mode.setFullScreen(false);
}

const StageHeaderComponent = function (props) {
  const isFullScreen = state.mode.isFullScreen;
  const isPlayerOnly = state.mode.isPlayerOnly;
  const showBranding = state.mode.showBranding;
  const {
    stageSizeMode,
    vm
  } = props;

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, []);

  let header = null;

  if (isFullScreen) {
    const stageDimensions = getStageDimensions(null, true);
    const stageButton = showBranding ? (
      <div className={styles.embedScratchLogo}>
        <a
          href="https://scratch.mit.edu"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="Scratch"
            src={scratchLogo}
          />
        </a>
      </div>
    ) : (
        <Button
          className={styles.stageButton}
          onClick={onSetStageUnFull}
          onKeyPress={onKeyPress}
        >
          <img
            alt={props.intl.formatMessage(messages.unFullStageSizeMessage)}
            className={styles.stageButtonIcon}
            draggable={false}
            src={unFullScreenIcon}
            title={props.intl.formatMessage(messages.fullscreenControl)}
          />
        </Button>
      );
    header = (
      <Box className={styles.stageHeaderWrapperOverlay}>
        <Box
          className={styles.stageMenuWrapper}
          style={{ width: stageDimensions.width }}
        >
          <Controls vm={vm} />
          {stageButton}
        </Box>
      </Box>
    );
  } else {
    const stageControls =
      isPlayerOnly ? (
        []
      ) : (
          <div className={styles.stageSizeToggleGroup}>
            <div>
              <Button
                className={classNames(
                  styles.stageButton,
                  styles.stageButtonFirst,
                  (stageSizeMode === STAGE_SIZE_MODES.small) ? null : styles.stageButtonToggledOff
                )}
                onClick={onSetStageSmall}
              >
                <img
                  alt={props.intl.formatMessage(messages.smallStageSizeMessage)}
                  className={styles.stageButtonIcon}
                  draggable={false}
                  src={smallStageIcon}
                />
              </Button>
            </div>
            <div>
              <Button
                className={classNames(
                  styles.stageButton,
                  styles.stageButtonLast,
                  (stageSizeMode === STAGE_SIZE_MODES.large) ? null : styles.stageButtonToggledOff
                )}
                onClick={onSetStageLarge}
              >
                <img
                  alt={props.intl.formatMessage(messages.largeStageSizeMessage)}
                  className={styles.stageButtonIcon}
                  draggable={false}
                  src={largeStageIcon}
                />
              </Button>
            </div>
          </div>
        );
    header = (
      <Box className={styles.stageHeaderWrapper}>
        <Box className={styles.stageMenuWrapper}>
          <Controls vm={vm} />
          <div className={styles.stageSizeRow}>
            {stageControls}
            <div>
              <Button
                className={styles.stageButton}
                onClick={onSetStageFull}
              >
                <img
                  alt={props.intl.formatMessage(messages.fullStageSizeMessage)}
                  className={styles.stageButtonIcon}
                  draggable={false}
                  src={fullScreenIcon}
                  title={props.intl.formatMessage(messages.fullscreenControl)}
                />
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    );
  }

  return header;
};

StageHeaderComponent.propTypes = {
  stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
  vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(StageHeaderComponent);
