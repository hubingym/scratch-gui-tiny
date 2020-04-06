import { emitter } from './core';

export default {
  sprite: null,
  receivedBlocks: false,
  setHoveredSprite(spriteId) {
    this.sprite = spriteId;
    this.receivedBlocks = false;
    emitter.forceUpdate();
  },
  setReceivedBlocks(receivedBlocks) {
    this.receivedBlocks = receivedBlocks;
    emitter.forceUpdate();
  },
}
