import { emitter } from './core';

export default {
  dragging: false,
  currentOffset: { x: 0, y: 0 },
  img: '',
  updateAssetDrag(dragInfo) {
    Object.assign(this, dragInfo);
    emitter.forceUpdate();
  }
}
