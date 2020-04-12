import { emitter } from './core';

const MODAL_BACKDROP_LIBRARY = 'backdropLibrary';
const MODAL_CAMERA_CAPTURE = 'cameraCapture';
const MODAL_COSTUME_LIBRARY = 'costumeLibrary';
const MODAL_EXTENSION_LIBRARY = 'extensionLibrary';
const MODAL_LOADING_PROJECT = 'loadingProject';
const MODAL_TELEMETRY = 'telemetryModal';
const MODAL_SOUND_LIBRARY = 'soundLibrary';
const MODAL_SPRITE_LIBRARY = 'spriteLibrary';
const MODAL_SOUND_RECORDER = 'soundRecorder';
const MODAL_CONNECTION = 'connectionModal';
const MODAL_TIPS_LIBRARY = 'tipsLibrary';

const openModal = function (modal) {
  _export[modal] = true;
  emitter.forceUpdate();
};
const closeModal = function (modal) {
  _export[modal] = false;
  emitter.forceUpdate();
};

const openBackdropLibrary = function () {
  return openModal(MODAL_BACKDROP_LIBRARY);
};
const openCameraCapture = function () {
  return openModal(MODAL_CAMERA_CAPTURE);
};
const openCostumeLibrary = function () {
  return openModal(MODAL_COSTUME_LIBRARY);
};
const openExtensionLibrary = function () {
  return openModal(MODAL_EXTENSION_LIBRARY);
};
const openLoadingProject = function () {
  return openModal(MODAL_LOADING_PROJECT);
};
const openTelemetryModal = function () {
  return openModal(MODAL_TELEMETRY);
};
const openSoundLibrary = function () {
  return openModal(MODAL_SOUND_LIBRARY);
};
const openSpriteLibrary = function () {
  return openModal(MODAL_SPRITE_LIBRARY);
};
const openSoundRecorder = function () {
  return openModal(MODAL_SOUND_RECORDER);
};
const openConnectionModal = function () {
  return openModal(MODAL_CONNECTION);
};
const openTipsLibrary = function () {
  return openModal(MODAL_TIPS_LIBRARY);
};
const closeBackdropLibrary = function () {
  return closeModal(MODAL_BACKDROP_LIBRARY);
};
const closeCameraCapture = function () {
  return closeModal(MODAL_CAMERA_CAPTURE);
};
const closeCostumeLibrary = function () {
  return closeModal(MODAL_COSTUME_LIBRARY);
};
const closeExtensionLibrary = function () {
  return closeModal(MODAL_EXTENSION_LIBRARY);
};
const closeLoadingProject = function () {
  return closeModal(MODAL_LOADING_PROJECT);
};
const closeTelemetryModal = function () {
  return closeModal(MODAL_TELEMETRY);
};
const closeSpriteLibrary = function () {
  return closeModal(MODAL_SPRITE_LIBRARY);
};
const closeSoundLibrary = function () {
  return closeModal(MODAL_SOUND_LIBRARY);
};
const closeSoundRecorder = function () {
  return closeModal(MODAL_SOUND_RECORDER);
};
const closeTipsLibrary = function () {
  return closeModal(MODAL_TIPS_LIBRARY);
};
const closeConnectionModal = function () {
  return closeModal(MODAL_CONNECTION);
};

const _export = {
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
  openBackdropLibrary,
  openCameraCapture,
  openCostumeLibrary,
  openExtensionLibrary,
  openLoadingProject,
  openSoundLibrary,
  openSpriteLibrary,
  openSoundRecorder,
  openTelemetryModal,
  openTipsLibrary,
  openConnectionModal,
  closeBackdropLibrary,
  closeCameraCapture,
  closeCostumeLibrary,
  closeExtensionLibrary,
  closeLoadingProject,
  closeSpriteLibrary,
  closeSoundLibrary,
  closeSoundRecorder,
  closeTelemetryModal,
  closeTipsLibrary,
  closeConnectionModal,
};

export default _export;
