import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import MediaQuery from 'react-responsive';

import Box from '../box/box.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';

import layout, { STAGE_SIZE_MODES } from '../../lib/layout-constants';
import { resolveStageSize } from '../../lib/screen-utils';

import styles from './gui.css';
import addExtensionIcon from './icon--extensions.svg';
import codeIcon from './icon--code.svg';
import costumesIcon from './icon--costumes.svg';
import soundsIcon from './icon--sounds.svg';

console.log(styles);

const messages = defineMessages({
  addExtension: {
    id: 'gui.gui.addExtension',
    description: 'Button to add an extension in the target pane',
    defaultMessage: 'Add Extension'
  }
});

const GUIComponent = props => {
  const {
    isRtl,
    stageSizeMode,
  } = props;
  return (<MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => {
    const stageSize = resolveStageSize(stageSizeMode, isFullSize);
    return (
      <Box
        className={styles.pageWrapper}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* TelemetryModal */}
        {/* Loader */}
        {/* CostumeLibrary */}
        {/* BackdropLibrary */}

        <MenuBar
          // accountNavOpen={accountNavOpen}
          // authorId={authorId}
          // authorThumbnailUrl={authorThumbnailUrl}
          // authorUsername={authorUsername}
          // canChangeLanguage={canChangeLanguage}
          // canCreateCopy={canCreateCopy}
          // canCreateNew={canCreateNew}
          // canEditTitle={canEditTitle}
          // canManageFiles={canManageFiles}
          // canRemix={canRemix}
          // canSave={canSave}
          // canShare={canShare}
          // className={styles.menuBarPosition}
          // enableCommunity={enableCommunity}
          // isShared={isShared}
          // logo={logo}
          // renderLogin={renderLogin}
          // showComingSoon={showComingSoon}
          // onClickAccountNav={onClickAccountNav}
          // onClickLogo={onClickLogo}
          // onCloseAccountNav={onCloseAccountNav}
          // onLogOut={onLogOut}
          // onOpenRegistration={onOpenRegistration}
          // onProjectTelemetryEvent={onProjectTelemetryEvent}
          // onSeeCommunity={onSeeCommunity}
          // onShare={onShare}
          // onToggleLoginOpen={onToggleLoginOpen}
        />
      </Box>
    );
  }}</MediaQuery>);
};

GUIComponent.defaultProps = {
  backpackHost: null,
  backpackVisible: false,
  basePath: './',
  canChangeLanguage: true,
  canCreateNew: false,
  canEditTitle: false,
  canManageFiles: true,
  canRemix: false,
  canSave: false,
  canCreateCopy: false,
  canShare: false,
  canUseCloud: false,
  enableCommunity: false,
  isCreating: false,
  isShared: false,
  loading: false,
  showComingSoon: false,
  stageSizeMode: STAGE_SIZE_MODES.large
};

export default injectIntl(GUIComponent);
