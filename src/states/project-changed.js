import { emitter } from './core';

export default {
  projectChanged: false,
  setProjectChanged() {
    this.projectChanged = true;
    emitter.forceUpdate();
  },
  setProjectUnchanged() {
    this.projectChanged = false;
    emitter.forceUpdate();
  },
}
