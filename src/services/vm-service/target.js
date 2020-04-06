import state from '../../states';

function shouldUpdateTargets() {
  return !state.mode.isFullScreen && !state.mode.isPlayerOnly && !state.modals.soundRecorder;
}

export default {
  handleTargetsUpdate(data) {
    if (shouldUpdateTargets()) {
        state.targets.updateTargets(data.targetList, data.editingTarget);
    }
  }
}
