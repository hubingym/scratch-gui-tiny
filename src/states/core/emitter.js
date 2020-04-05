import EventEmitter from 'events';
import { EVENT_FORCE_UPDATE } from './constants';

class Emitter extends EventEmitter {
  // constructor() {
  //   super();
  // }

  /**
   * 注册更新视图的回调
   * @param {Function} cb 
   */
  onUpdate(cb) {
    this.on(EVENT_FORCE_UPDATE, cb);
  }

  /**
   * 通知视图需要更新
   * 目前没有找到更新子数据通知变化的好方法,需要调用forceUpdate
   */
  forceUpdate() {
    this.emit(EVENT_FORCE_UPDATE);
  }
}

export default new Emitter();
