import VM from 'scratch-vm';
import locales from './locales';
import projectState from './project-state';
import assetDrag from './asset-drag';
import mode from './mod';
import stageSize from './stage-size';
import vmStatus from './vm-status';
import colorPicker from './color-picker';
import targets from './targets';
import monitors from './monitors';
import modals from './modals';

export * from './core';

/**
 * 在这儿定义状态对应的初始化数据
 */
const state = {
  locales,
  vm: new VM(),
  stageSize,
  projectChanged: false,
  projectState,
  assetDrag,
  mode,
  vmStatus,
  colorPicker,
  micIndicator: false,
  targets,
  monitors,
  modals,
};

export default state;

/**
 * 用于外界获取数据,对调试有帮助
 */
function getState() {
  return state;
}
export { getState }
