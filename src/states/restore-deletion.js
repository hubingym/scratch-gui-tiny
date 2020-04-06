import { emitter } from './core';

export default {
  restoreFun: null,
  deletedItem: '',
  setRestore(state) {
    this.restoreFun = state.restoreFun;
    this.deletedItem = state.deletedItem;
    emitter.forceUpdate();
  },
}
