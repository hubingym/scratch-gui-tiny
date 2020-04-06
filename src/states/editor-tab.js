import { emitter } from './core';

// Constants use numbers to make it easier to work with react-tabs
const BLOCKS_TAB_INDEX = 0;
const COSTUMES_TAB_INDEX = 1;
const SOUNDS_TAB_INDEX = 2;

export default {
  BLOCKS_TAB_INDEX,
  COSTUMES_TAB_INDEX,
  SOUNDS_TAB_INDEX,
  activeTabIndex: BLOCKS_TAB_INDEX,
  activateTab(tab) {
    this.activateTab = tab;
    emitter.forceUpdate();
  }
}