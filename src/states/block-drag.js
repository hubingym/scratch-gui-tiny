import { emitter } from './core';

export default {
  areBlocksOverGui: false,
  updateBlockDrag(areBlocksOverGui) {
    this.areBlocksOverGui = areBlocksOverGui;
    emitter.forceUpdate();
  }
}
