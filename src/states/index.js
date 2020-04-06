import VM from 'scratch-vm';
import locales from './locales';
import projectState from './project-state';
import {STAGE_DISPLAY_SIZES} from '../lib/layout-constants';
export * from './core';

/**
 * 在这儿定义状态对应的初始化数据
 */
const state = {
  locales,
  vm: new VM(),
  stageSize: STAGE_DISPLAY_SIZES.large,
  projectChanged: false,
  projectState,
};

export default state;

/**
 * 用于外界获取数据,对调试有帮助
 */
function getState() {
  return state;
}
export { getState }
