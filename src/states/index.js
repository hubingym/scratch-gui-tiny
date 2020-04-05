// import greet from './greet';
import locales from './locales';

export * from './core/core';

/**
 * 在这儿定义状态对应的初始化数据
 */
const state = {
  locales,
};

export default state;

/**
 * 用于外界获取数据,对调试有帮助
 */
function getState() {
  return state;
}
export { getState }
