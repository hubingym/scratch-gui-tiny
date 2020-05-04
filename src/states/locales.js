import { addLocaleData } from 'react-intl';

import { localeData, isRtl } from 'scratch-l10n';
import editorMessages from 'scratch-l10n/locales/editor-msgs';

import { emitter } from './core';

addLocaleData(localeData);

const local = 'zh-cn';
document.documentElement.lang = local;
export default {
  isRtl: false,
  locale: local,
  messagesByLocale: editorMessages,
  messages: editorMessages[local],
  selectLocale(newLocale) {
    this.isRtl = isRtl(newLocale)
    this.locale = newLocale;
    this.messages = editorMessages[newLocale];
    document.documentElement.lang = newLocale;
    emitter.forceUpdate();
  }
};
