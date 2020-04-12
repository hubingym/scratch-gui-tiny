import { emitter } from './core';

export default {
  active: false,
  callback: () => {
    throw new Error('Color picker callback not initialized');
  },
  activateColorPicker(callback) {
    this.active = true;
    this.callback = callback;
    emitter.forceUpdate();
  },
  deactivateColorPicker(color) {
    if (typeof color === 'string') {
      this.callback(color);
    }
    this.active = false;
    emitter.forceUpdate();
  },
  setCallback(callback) {
    this.callback = callback;
  },
}
