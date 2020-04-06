import { emitter } from './core';

export default {
  showBranding: false,
  isFullScreen: false,
  isPlayerOnly: false,
  hasEverEnteredEditor: true,
  setFullScreen(isFullScreen) {
    this.isFullScreen = isFullScreen;
    emitter.forceUpdate();
  },
}
