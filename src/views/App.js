import React from 'react';
import './App.css';

import state from '../states';
import { greetService } from '../services';

function changeGreet2() {
  greetService.changeGreet2('hello2');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          greet: {state.greet.val1}&nbsp;&nbsp;
          <button onClick={greetService.changeGreet}>改变问候</button>
        </p>

        <p>
          greet2: {state.greet.val2}&nbsp;&nbsp;
          <button onClick={changeGreet2}>改变问候2</button>
        </p>

      </header>
    </div>
  );
}

export default App;
