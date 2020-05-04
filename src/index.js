import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import ReactModal from 'react-modal';
import styles from './index.css';
import Gui from './container/gui.jsx';
// import * as serviceWorker from './serviceWorker';
import state, { emitter } from './states';
// import { getState } from './states';
import { vmService } from './services';

// 初始化vm
vmService.initialize();

// 点击了scratch logo
const onClickLogo = () => {
  // window.location = 'https://scratch.mit.edu';
};

// location.hash中有projectId
function handleHashChange () {
  const hashMatch = window.location.hash.match(/#(\d+)/);
  const hashProjectId = hashMatch === null ? state.scratchGui.projectState.defaultProjectId : hashMatch[1];
  vmService.fetchProject(hashProjectId.toString());
}
window.addEventListener('hashchange', handleHashChange);
handleHashChange(); // 提取projectId

// 确认离开网页
// function leavePageConfirm(e) {
//   if (state.scratchGui.projectChanged) {
//     // both methods of returning a value may be necessary for browser compatibility
//     (e || window.event).returnValue = true;
//     return true;
//   }
//   return; // Returning undefined prevents the prompt from coming up
// }
// window.onbeforeunload = e => leavePageConfirm(e);

const rootDom = document.getElementById('root');
rootDom.className = styles.app;
function renderView() {
  // 打印全部数据,用于调试
  // console.log(getState());

  const locale = state.locales.locale;
  const messages = state.locales.messages;

  // 设置vm locale
  vmService.updateLocale(locale, messages);

  ReactDOM.render(
    <IntlProvider locale={locale} messages={messages}>
      <Gui
        canEditTitle
        showComingSoon
        canSave={false}
        onClickLogo={onClickLogo}
      />
    </IntlProvider>,
    rootDom
  );
}
emitter.onUpdate(renderView);
ReactModal.setAppElement(rootDom);
renderView();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
