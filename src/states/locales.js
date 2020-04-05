import {addLocaleData} from 'react-intl';

import {localeData} from 'scratch-l10n';
import editorMessages from 'scratch-l10n/locales/editor-msgs';
// import {isRtl} from 'scratch-l10n';

addLocaleData(localeData);

export default {
  isRtl: false,
  locale: 'zh-cn',
  // messagesByLocale: editorMessages,
  messages: editorMessages['zh-cn'],
};
