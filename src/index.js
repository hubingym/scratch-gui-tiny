import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gui from './components/gui/gui.jsx';
// import * as serviceWorker from './serviceWorker';
import state, { emitter } from './states';
// import { getState } from './states';

import {IntlProvider} from 'react-intl';

const rootDom = document.getElementById('root');
function renderView() {
  // 打印全部数据,用于调试
  // console.log(getState());
  ReactDOM.render(
    <IntlProvider locale={state.locales.locale} messages={state.locales.messages}>
      <Gui />
    </IntlProvider>,
    rootDom
  );
}

emitter.onUpdate(renderView);
renderView();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
