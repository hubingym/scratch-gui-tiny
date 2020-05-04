import React from 'react';
import PropTypes from 'prop-types';
// import {connect} from 'react-redux';

// import {
//     filterInlineAlerts
// } from '../reducers/alerts';

import InlineMessageComponent from '../components/alerts/inline-message.jsx';

import state from '../states';

const InlineMessages = ({
  className
}) => {
  const alertsList = state.scratchGui.alerts.alertsList;
  if (!alertsList) {
    return null;
  }
  // only display inline alerts here
  const inlineAlerts = state.scratchGui.alerts.filterInlineAlerts(alertsList);
  if (!inlineAlerts || !inlineAlerts.length) {
    return null;
  }

  // get first alert
  const firstInlineAlert = inlineAlerts[0];
  const {
    content,
    iconSpinner,
    level
  } = firstInlineAlert;

  return (
    <InlineMessageComponent
      className={className}
      content={content}
      iconSpinner={iconSpinner}
      level={level}
    />
  );
};

InlineMessages.propTypes = {
  className: PropTypes.string
};

export default InlineMessages;
