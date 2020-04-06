import { emitter } from './core';

export default {
  backdropLibrary: false,
  cameraCapture: false,
  costumeLibrary: false,
  extensionLibrary: false,
  loadingProject: false,
  telemetryModal: false,
  soundLibrary: false,
  spriteLibrary: false,
  soundRecorder: false,
  connectionModal: false,
  tipsLibrary: false,
  openBackdropLibrary() {
    this.backdropLibrary = true;
    emitter.forceUpdate();
  },
  openSpriteLibrary() {
    this.spriteLibrary = true;
    emitter.forceUpdate();
  },
  closeSpriteLibrary() {
    this.spriteLibrary = false;
    emitter.forceUpdate();
  },
}
