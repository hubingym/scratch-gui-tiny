import state, { emitter } from '../states';

class GreetService {
  changeGreet() {
    state.greet.val1 = 'hello';
    emitter.forceUpdate();
  }
  
  changeGreet2(val) {
    state.greet.val2 = val;
    emitter.forceUpdate();
  }
}

export default new GreetService();
