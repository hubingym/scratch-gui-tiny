import emitter from './emitter';

/**
 * 导出emitter对象
 */
export { emitter };

/**
 * 对state进行代理,设置数据的时候好通知更新视图
 */
// const _proxy = new Proxy(state, {
//   // get: function(target, prop) {
//   //   return target[prop];
//   // },
//   // set: function (target, prop, value) {
//   //   target[prop] = value;
//   //   // 发送通知
//   //   emitter.emitUpdate();
//   //   return true;
//   // },
// });
