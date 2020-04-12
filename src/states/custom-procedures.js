import { emitter } from './core';

export default {
  active: false,
  mutator: null,
  callback: null,
  activateCustomProcedures(mutator, callback) {
    this.active = true;
    this.mutator = mutator;
    this.callback = callback;
    emitter.forceUpdate();
  },
  deactivateCustomProcedures(mutator) {
    if (mutator) {
      this.callback(mutator);
    }
    this.active = false;
    this.mutator = null;
    this.callback = null;
    emitter.forceUpdate();
  },
}
