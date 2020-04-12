import { emitter } from './core';

export default {
  extensionId: null,
  setConnectionModalExtensionId(extensionId) {
    this.extensionId = extensionId;
    emitter.forceUpdate();
  },
}
