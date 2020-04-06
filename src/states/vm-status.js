import { emitter } from './core';

export default {
  running: false,
  started: false,
  turbo: false,
  setStartedState(started) {
    this.started = started;
    emitter.forceUpdate();
  },
  setRunningState(running) {
    this.running = running;
    emitter.forceUpdate();
  },
  setTurboState(turbo) {
    this.turbo = turbo;
    emitter.forceUpdate();
  },
}
