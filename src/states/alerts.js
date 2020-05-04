import { emitter } from './core';

import alertsData from '../lib/alerts/index.jsx';
import { AlertTypes, AlertLevels } from '../lib/alerts/index.jsx';
import extensionData from '../lib/libraries/extensions/index.jsx';

const filterPopupAlerts = alertsList => (
  alertsList.filter(curAlert => (
    curAlert.alertType === AlertTypes.STANDARD ||
    curAlert.alertType === AlertTypes.EXTENSION
  ))
);

const filterInlineAlerts = alertsList => (
  alertsList.filter(curAlert => (
    curAlert.alertType === AlertTypes.INLINE
  ))
);

export default {
  visible: true,
  alertsList: [],
  closeAlert(index) {
    const action = {
      index,
    }

    const newList = this.alertsList.slice();
    newList.splice(action.index, 1);

    this.alertsList = newList;

    emitter.forceUpdate();
  },
  closeAlertWithId(alertId) {
    const action = {
      alertId,
    }

    if (action.alertId) {
      action.index = this.alertsList.findIndex(a => a.alertId === action.alertId);
      if (action.index === -1) return;
    }

    const newList = this.alertsList.slice();
    newList.splice(action.index, 1);

    this.alertsList = newList;

    emitter.forceUpdate();
  },
  closeAlertsWithId(alertId) {
    this.alertsList = this.alertsList.filter(curAlert => (
      curAlert.alertId !== alertId
    ));

    emitter.forceUpdate();
  },
  filterInlineAlerts,
  filterPopupAlerts,
  showAlertWithTimeout(alertId) {
    const alertData = alertsData.find(thisAlertData => thisAlertData.alertId === alertId);
    if (alertData) {
        this.showStandardAlert(alertId);
        if (alertData.maxDisplaySecs) {
            setTimeout(() => {
                this.closeAlertsWithId(alertId);
            }, alertData.maxDisplaySecs * 1000);
        }
    }
  },
  showExtensionAlert(data) {
    const extensionId = data.extensionId;
    if (extensionId) {
      const extension = extensionData.find(ext => ext.extensionId === extensionId);
      if (extension) {
        const newList = this.alertsList.slice();
        const newAlert = {
          alertType: AlertTypes.EXTENSION,
          closeButton: true,
          extensionId: extensionId,
          extensionName: extension.name,
          iconURL: extension.connectionSmallIconURL,
          level: AlertLevels.WARN,
          showReconnect: true
        };
        newList.push(newAlert);

        this.alertsList = newList;
        emitter.forceUpdate();
      }
    }
  },
  showStandardAlert(alertId) {
    if (alertId) {
      const newAlert = {
        alertId: alertId,
        level: AlertLevels.WARN // default level
      };
      const alertData = alertsData.find(thisAlertData => thisAlertData.alertId === alertId);
      if (alertData) {
        const newList = this.alertsList.filter(curAlert => (
          !alertData.clearList || alertData.clearList.indexOf(curAlert.alertId) === -1
        ));

        newAlert.alertType = alertData.alertType || AlertTypes.STANDARD;
        newAlert.closeButton = alertData.closeButton;
        newAlert.content = alertData.content;
        newAlert.iconURL = alertData.iconURL;
        newAlert.iconSpinner = alertData.iconSpinner;
        newAlert.level = alertData.level;
        newAlert.showDownload = alertData.showDownload;
        newAlert.showSaveNow = alertData.showSaveNow;

        this.alertsList = newList;
        emitter.forceUpdate();
      }
    }
  },
}
