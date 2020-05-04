import classNames from 'classnames';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
// import {setProjectTitle} from '../../reducers/project-title';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import Input from '../forms/input.jsx';
import styles from './project-title-input.css';

import state from '../../states';

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
  projectTitlePlaceholder: {
    id: 'gui.gui.projectTitlePlaceholder',
    description: 'Placeholder for project title when blank',
    defaultMessage: 'Project title here'
  }
});

const ProjectTitleInput = ({
  className,
  intl,
}) => {
  const projectTitle = state.scratchGui.projectTitle.projectTitle;
  const onSubmit = dispatchProps.onSubmit;
  return <BufferedInput
    className={classNames(styles.titleField, className)}
    maxLength="100"
    placeholder={intl.formatMessage(messages.projectTitlePlaceholder)}
    tabIndex="0"
    type="text"
    value={projectTitle}
    onSubmit={onSubmit}
  />
};

ProjectTitleInput.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

const dispatchProps = {
  onSubmit: title => state.scratchGui.projectTitle.setProjectTitle(title),
};

export default injectIntl(ProjectTitleInput);
