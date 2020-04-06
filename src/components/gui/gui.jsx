import classNames from 'classnames';
import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import MediaQuery from 'react-responsive';

import Box from '../box/box.jsx';
import Loader from '../loader/loader.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';
import StageWrapper from '../stage/stage-wrapper.jsx';
import TargetPane from '../target-pane/target-pane.jsx';

import layout from '../../lib/layout-constants';
import { resolveStageSize } from '../../lib/screen-utils';

import styles from './gui.css';
// import addExtensionIcon from './icon--extensions.svg';
// import codeIcon from './icon--code.svg';
// import costumesIcon from './icon--costumes.svg';
// import soundsIcon from './icon--sounds.svg';

import state from '../../states';
const vm = state.vm;

// const messages = defineMessages({
//   addExtension: {
//     id: 'gui.gui.addExtension',
//     description: 'Button to add an extension in the target pane',
//     defaultMessage: 'Add Extension'
//   }
// });

const GUIComponent = props => {
  const isRtl = state.locales.isRtl;
  const stageSizeMode = state.stageSize;
  const loading = state.projectState.isFetchingWithId();

  return (<MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => {
    const stageSize = resolveStageSize(stageSizeMode, isFullSize);
    return (
      <Box
        className={styles.pageWrapper}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* TelemetryModal */}
        {loading ? (
          <Loader />
        ) : null}
        {/* {isCreating ? (
          <Loader messageId="gui.loader.creating" />
        ) : null} */}
        {/* CostumeLibrary */}
        {/* BackdropLibrary */}

        <MenuBar />
        <Box className={styles.bodyWrapper}>
          <Box className={styles.flexWrapper}>
            <Box className={styles.editorWrapper}></Box>
            <Box className={classNames(styles.stageAndTargetWrapper, styles[stageSize])}>
              <StageWrapper
                isRendererSupported={true}
                isRtl={isRtl}
                stageSize={stageSize}
                vm={vm}
              />
              <Box className={styles.targetWrapper}>
                <TargetPane
                  stageSize={stageSize}
                  vm={vm}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }}</MediaQuery>);
};

// GUIComponent.defaultProps = {
//   backpackHost: null,
//   backpackVisible: false,
//   basePath: './',
//   canChangeLanguage: true,
//   canCreateNew: false,
//   canEditTitle: false,
//   canManageFiles: true,
//   canRemix: false,
//   canSave: false,
//   canCreateCopy: false,
//   canShare: false,
//   canUseCloud: false,
//   enableCommunity: false,
//   isCreating: false,
//   isShared: false,
//   loading: false,
//   showComingSoon: false,
//   stageSizeMode: STAGE_SIZE_MODES.large
// };

export default injectIntl(GUIComponent);
