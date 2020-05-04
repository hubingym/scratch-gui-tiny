import { emitter } from './core';

export default {
  projectTitle: '',
  setProjectTitle(title) {
    this.projectTitle = title;
    emitter.forceUpdate();
  },
}
