import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import { STAGE_DISPLAY_SIZES } from '../../lib/layout-constants.js';
import StageHeader from './stage-header.jsx';
// TODO: 继续stage的移植
import Stage from './stage-container.jsx';
import Loader from '../loader/loader.jsx';

import styles from './stage-wrapper.css';

import state from '../../states';

function onActivateColorPicker() {
  state.colorPicker.activateColorPicker();
}

function onDeactivateColorPicker(color) {
  state.colorPicker.deactivateColorPicker(color);
}

const StageWrapperComponent = function (props) {
  const {
    isFullScreen,
    isRtl,
    isRendererSupported,
    loading,
    stageSize,
    vm
  } = props;
  return (
    <Box
      className={styles.stageWrapper}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <Box className={styles.stageMenuWrapper}>
        <StageHeader
          stageSize={stageSize}
          vm={vm}
        />
      </Box>
      <Box className={styles.stageCanvasWrapper}>
        {
          isRendererSupported ?
            <Stage
              stageSize={stageSize}
              vm={vm}
              isColorPicking={state.colorPicker.active}
              isFullScreen={state.mode.isFullScreen}
              isStarted={state.vmStatus.started}
              micIndicator={state.micIndicator}
              useEditorDragStyle={!(state.mode.isFullScreen || state.mode.isPlayerOnly)}
              onActivateColorPicker={onActivateColorPicker}
              onDeactivateColorPicker={onDeactivateColorPicker}
            /> :
            null
        }
      </Box>
      {
        loading ? (
          <Loader isFullScreen={isFullScreen} />
        ) : null
      }
    </Box >
  );
};

StageWrapperComponent.propTypes = {
  isFullScreen: PropTypes.bool,
  isRendererSupported: PropTypes.bool.isRequired,
  isRtl: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
  vm: PropTypes.instanceOf(VM).isRequired
};

export default StageWrapperComponent;