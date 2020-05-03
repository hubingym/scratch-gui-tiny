import classNames from 'classnames';
import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';

import Blocks from '../../containers/blocks.jsx';
import Box from '../box/box.jsx';
import Loader from '../loader/loader.jsx';
import DragLayer from '../drag-layer/drag-layer.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';
import StageWrapper from '../stage/stage-wrapper.jsx';
import TargetPane from '../target-pane/target-pane.jsx';
import Watermark from '../../containers/watermark.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
import SoundTab from '../../containers/sound-tab.jsx';

import layout from '../../lib/layout-constants';
import { resolveStageSize } from '../../lib/screen-utils';

import styles from './gui.css';
// import addExtensionIcon from './icon--extensions.svg';
import codeIcon from './icon--code.svg';
import costumesIcon from './icon--costumes.svg';
import soundsIcon from './icon--sounds.svg';

import state from '../../states';

// const messages = defineMessages({
//   addExtension: {
//     id: 'gui.gui.addExtension',
//     description: 'Button to add an extension in the target pane',
//     defaultMessage: 'Add Extension'
//   }
// });

const tabClassNames = {
  tabs: styles.tabs,
  tab: classNames(tabStyles.reactTabsTab, styles.tab),
  tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
  tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
  tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
  tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
};

const GUIComponent = props => {
  const vm = state.vm;
  const isRtl = state.locales.isRtl;
  const stageSizeMode = state.stageSize.stageSize;
  const loading = state.projectState.isFetchingWithId();
  const activeTabIndex = state.editorTab.activeTabIndex;
  const targetIsStage = state.targets.stage && state.targets.stage.id === state.targets.editingTarget;
  const blocksTabVisible = state.editorTab.activeTabIndex === state.editorTab.BLOCKS_TAB_INDEX;
  const costumesTabVisible = state.editorTab.activeTabIndex === state.editorTab.COSTUMES_TAB_INDEX;
  const soundsTabVisible = state.editorTab.activeTabIndex === state.editorTab.SOUNDS_TAB_INDEX;
  const {
    onActivateTab,
    onActivateCostumesTab,
    onActivateSoundsTab,
    basePath,
    canUseCloud,
  } = props;

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
            <Box className={styles.editorWrapper}>
              <Tabs
                forceRenderTabPanel
                className={tabClassNames.tabs}
                selectedIndex={activeTabIndex}
                selectedTabClassName={tabClassNames.tabSelected}
                selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                onSelect={onActivateTab}
              >
                <TabList className={tabClassNames.tabList}>
                  <Tab className={tabClassNames.tab}>
                    <img alt=''
                      draggable={false}
                      src={codeIcon}
                    />
                    <FormattedMessage
                      defaultMessage="Code"
                      description="Button to get to the code panel"
                      id="gui.gui.codeTab"
                    />
                  </Tab>
                  <Tab
                    className={tabClassNames.tab}
                    onClick={onActivateCostumesTab}
                  >
                    <img alt=''
                      draggable={false}
                      src={costumesIcon}
                    />
                    {targetIsStage ? (
                      <FormattedMessage
                        defaultMessage="Backdrops"
                        description="Button to get to the backdrops panel"
                        id="gui.gui.backdropsTab"
                      />
                    ) : (
                        <FormattedMessage
                          defaultMessage="Costumes"
                          description="Button to get to the costumes panel"
                          id="gui.gui.costumesTab"
                        />
                      )}
                  </Tab>
                  <Tab
                    className={tabClassNames.tab}
                    onClick={onActivateSoundsTab}
                  >
                    <img alt=''
                      draggable={false}
                      src={soundsIcon}
                    />
                    <FormattedMessage
                      defaultMessage="Sounds"
                      description="Button to get to the sounds panel"
                      id="gui.gui.soundsTab"
                    />
                  </Tab>
                </TabList>
                <TabPanel className={tabClassNames.tabPanel}>
                  <Box className={styles.blocksWrapper}>
                    <Blocks
                      canUseCloud={canUseCloud}
                      grow={1}
                      isVisible={blocksTabVisible}
                      options={{
                        media: `${basePath}static/blocks-media/`
                      }}
                      stageSize={stageSize}
                      vm={vm}
                      locale={state.locales.locale}
                      toolboxXML={state.toolbox.toolboxXML}
                      customProceduresVisible={state.customProcedures.active}
                      extensionLibraryVisible={state.modals.extensionLibrary}
                      anyModalVisible={Object.keys(state.modals).some(key => state.modals[key]) || state.mode.isFullScreen}
                    />
                  </Box>
                  {/* <Box className={styles.extensionButtonContainer}>
                    <button
                        className={styles.extensionButton}
                        title={intl.formatMessage(messages.addExtension)}
                        onClick={onExtensionButtonClick}
                    >
                        <img
                            className={styles.extensionButtonIcon}
                            draggable={false}
                            src={addExtensionIcon}
                        />
                    </button>
                  </Box> */}
                  <Box className={styles.watermark}>
                    <Watermark />
                  </Box>
                </TabPanel>
                <TabPanel className={tabClassNames.tabPanel}>
                  {costumesTabVisible ? <CostumeTab vm={vm} /> : null}
                </TabPanel>
                <TabPanel className={tabClassNames.tabPanel}>
                  {soundsTabVisible ? <SoundTab vm={vm} /> : null}
                </TabPanel>
              </Tabs>
            </Box>

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

        <DragLayer
          dragging={state.assetDrag.dragging}
          currentOffset={state.assetDrag.currentOffset}
          img={state.assetDrag.img}
        />
      </Box>
    );
  }}</MediaQuery>);
};

GUIComponent.defaultProps = {
  // backpackHost: null,
  // backpackVisible: false,
  basePath: './',
  // canChangeLanguage: true,
  // canCreateNew: false,
  // canEditTitle: false,
  // canManageFiles: true,
  // canRemix: false,
  // canSave: false,
  // canCreateCopy: false,
  // canShare: false,
  canUseCloud: false,
  // enableCommunity: false,
  // isCreating: false,
  // isShared: false,
  // loading: false,
  // showComingSoon: false,
  // stageSizeMode: STAGE_SIZE_MODES.large,
  onActivateTab: tab => state.editorTab.activateTab(tab),
  onActivateCostumesTab: () => state.editorTab.activateTab(state.editorTab.COSTUMES_TAB_INDEX),
  onActivateSoundsTab: () => state.editorTab.activateTab(state.editorTab.SOUNDS_TAB_INDEX),
};

export default injectIntl(GUIComponent);
