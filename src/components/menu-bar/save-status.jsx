// import {connect} from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import PropTypes from 'prop-types';
import React from 'react';

import InlineMessages from '../../containers/inline-messages.jsx';

// import {
//     manualUpdateProject
// } from '../../reducers/project-state';

// import {
//     filterInlineAlerts
// } from '../../reducers/alerts';

import styles from './save-status.css';

import state from '../../states';

// Wrapper for inline messages in the nav bar, which are all related to saving.
// Show any inline messages if present, else show the "Save Now" button if the
// project has changed.
// We decided to not use an inline message for "Save Now" because it is a reflection
// of the project state, rather than an event.
const SaveStatus = () => {
  const alertsList = state.scratchGui.alerts.alertsList;
  const projectChanged = state.scratchGui.projectChanged.projectChanged;
  return state.scratchGui.alerts.filterInlineAlerts(alertsList).length > 0 ? (
    <InlineMessages />
  ) : projectChanged && (
    <div
      className={styles.saveNow}
      onClick={dispatchProps.onClickSave}
    >
      <FormattedMessage
        defaultMessage="Save Now"
        description="Title bar link for saving now"
        id="gui.menuBar.saveNowLink"
      />
    </div>
  )
};

const dispatchProps = {
  onClickSave: () => state.scratchGui.projectState.manualUpdateProject(),
};

export default SaveStatus;
