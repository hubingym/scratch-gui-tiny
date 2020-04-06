import { emitter } from './core';

export default {
  monitors: {},
  updateMonitors(monitorList) {
    this.monitors = monitorList;
    emitter.forceUpdate();
  },
};
