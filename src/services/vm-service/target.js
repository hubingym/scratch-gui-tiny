import state from '../../states';

function shouldUpdateTargets() {
  return !state.scratchGui.mode.isFullScreen && !state.scratchGui.mode.isPlayerOnly && !state.scratchGui.modals.soundRecorder;
}

export default {
  handleTargetsUpdate(data) {
    if (shouldUpdateTargets()) {
        state.scratchGui.targets.updateTargets(data.targetList, data.editingTarget);
    }
  }
}
