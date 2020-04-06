import { STAGE_DISPLAY_SIZES } from '../lib/layout-constants';
import { emitter } from './core';

export default {
  stageSize: STAGE_DISPLAY_SIZES.large,
  setStageSize(stageSize) {
    this.stageSize = stageSize;
    emitter.forceUpdate();
  },
}