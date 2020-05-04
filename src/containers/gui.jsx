import React from 'react';
// import VM from 'scratch-vm';
import { injectIntl } from 'react-intl';

// import {
//     getIsError,
//     getIsShowingProject
// } from '../reducers/project-state';
// import {
//     activateTab,
//     BLOCKS_TAB_INDEX,
//     COSTUMES_TAB_INDEX,
//     SOUNDS_TAB_INDEX
// } from '../reducers/editor-tab';

// import {
//     closeCostumeLibrary,
//     closeBackdropLibrary,
//     closeTelemetryModal,
//     openExtensionLibrary
// } from '../reducers/modals';

import GUIComponent from '../components/gui/gui.jsx';

import state from '../states';

class GUI extends React.Component {
  render() {
    const stateProps = mapStateToProps(state);
    return (
      <GUIComponent
        loading={false}
        stageSizeMode={state.scratchGui.stageSize.stageSize}
        {...stateProps}
        {...dispatchProps}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    activeTabIndex: state.scratchGui.editorTab.activeTabIndex,
    alertsVisible: state.scratchGui.alerts.visible,
    backdropLibraryVisible: state.scratchGui.modals.backdropLibrary,
    blocksTabVisible: state.scratchGui.editorTab.activeTabIndex === state.scratchGui.editorTab.BLOCKS_TAB_INDEX,
    // cardsVisible: state.scratchGui.cards.visible,
    connectionModalVisible: state.scratchGui.modals.connectionModal,
    costumeLibraryVisible: state.scratchGui.modals.costumeLibrary,
    costumesTabVisible: state.scratchGui.editorTab.activeTabIndex === state.scratchGui.editorTab.COSTUMES_TAB_INDEX,
    error: state.scratchGui.projectState.error,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    // loadingStateVisible: state.scratchGui.modals.loadingProject,
    // projectId: state.scratchGui.projectState.projectId,
    soundsTabVisible: state.scratchGui.editorTab.activeTabIndex === state.scratchGui.editorTab.SOUNDS_TAB_INDEX,
    targetIsStage: (
      state.scratchGui.targets.stage &&
      state.scratchGui.targets.stage.id === state.scratchGui.targets.editingTarget
    ),
    telemetryModalVisible: state.scratchGui.modals.telemetryModal,
    tipsLibraryVisible: state.scratchGui.modals.tipsLibrary,
    vm: state.scratchGui.vm
  };
};

const dispatchProps = {
  onExtensionButtonClick: () => state.scratchGui.modals.openExtensionLibrary(),
  onActivateTab: tab => state.scratchGui.editorTab.activateTab(tab),
  onActivateCostumesTab: () => state.scratchGui.editorTab.activateTab(state.scratchGui.editorTab.COSTUMES_TAB_INDEX),
  onActivateSoundsTab: () => state.scratchGui.editorTab.activateTab(state.scratchGui.editorTab.SOUNDS_TAB_INDEX),
  onRequestCloseBackdropLibrary: () => state.scratchGui.modals.closeBackdropLibrary(),
  onRequestCloseCostumeLibrary: () => state.scratchGui.modals.closeCostumeLibrary(),
  onRequestCloseTelemetryModal: () => state.scratchGui.modals.closeTelemetryModal(),
};

const ConnectedGUI = injectIntl(GUI);

export default ConnectedGUI;
