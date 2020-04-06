import classNames from 'classnames';
import React from 'react';
import {defineMessages, injectIntl} from 'react-intl';

import GreenFlag from './green-flag.jsx';
import StopAll from './stop-all.jsx';
import TurboMode from './turbo-mode.jsx';

import styles from './controls.css';

import state from '../../states';

const messages = defineMessages({
    goTitle: {
        id: 'gui.controls.go',
        defaultMessage: 'Go',
        description: 'Green flag button title'
    },
    stopTitle: {
        id: 'gui.controls.stop',
        defaultMessage: 'Stop',
        description: 'Stop button title'
    }
});

const vm = state.vm;

function onGreenFlagClick(e) {
  e.preventDefault();
  if (e.shiftKey) {
      vm.setTurboMode(!state.vmStatus);
  } else {
      if (!state.vmStatus.running) {
          vm.start();
      }
      vm.greenFlag();
  }
}

function onStopAllClick(e) {
  e.preventDefault();
  vm.stopAll();
}

const Controls = function (props) {
  const active = state.vmStatus.running;
  const turbo = state.vmStatus.turbo;
    const {
        intl,
    } = props;
    return (
        <div
            className={classNames(styles.controlsContainer)}
        >
            <GreenFlag
                active={active}
                title={intl.formatMessage(messages.goTitle)}
                onClick={onGreenFlagClick}
            />
            <StopAll
                active={active}
                title={intl.formatMessage(messages.stopTitle)}
                onClick={onStopAllClick}
            />
            {turbo ? (
                <TurboMode />
            ) : null}
        </div>
    );
};

export default injectIntl(Controls);
