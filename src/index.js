import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './views';
// import * as serviceWorker from './serviceWorker';
import { emitter } from './states';
// import { getState } from './states';

const rootDom = document.getElementById('root');
function renderView() {
  // 打印全部数据,用于调试
  // console.log(getState());
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootDom
  );
}

emitter.onUpdate(renderView);
renderView();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
