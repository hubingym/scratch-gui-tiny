import locales from './locales';
import vm from './vm';
import {STAGE_DISPLAY_SIZES} from '../lib/layout-constants';
export * from './core';

/**
 * 在这儿定义状态对应的初始化数据
 */
const state = {
  locales,
  vm,
  stageSize: STAGE_DISPLAY_SIZES.large,
};

export default state;

/**
 * 用于外界获取数据,对调试有帮助
 */
function getState() {
  return state;
}
export { getState }
