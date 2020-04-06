import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import VM from 'scratch-vm';
import Box from '../box/box.jsx';
import greenFlag from '../controls/icon--green-flag.svg';

import state from '../../states';

class GreenFlagOverlay extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick'
        ]);
    }

    handleClick () {
        this.props.vm.start();
        this.props.vm.greenFlag();
    }

    render () {
        if (state.vmStatus.started) return null;

        return (
            <Box
                className={this.props.wrapperClass}
                onClick={this.handleClick}
            >
                <div className={this.props.className}>
                    <img alt=''
                        draggable={false}
                        src={greenFlag}
                    />
                </div>
            </Box>

        );
    }
}

GreenFlagOverlay.propTypes = {
    className: PropTypes.string,
    isStarted: PropTypes.bool,
    vm: PropTypes.instanceOf(VM),
    wrapperClass: PropTypes.string
};

GreenFlagOverlay.defaultProps = {
  vm: state.vm,
};

export default GreenFlagOverlay;
