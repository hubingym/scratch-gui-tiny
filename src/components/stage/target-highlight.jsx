import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';

import state from '../../states';

const vm = state.vm;

class TargetHighlight extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'getPageCoords'
    ]);
  }

  // Transform scratch coordinates into page coordinates
  getPageCoords(x, y) {
    const { stageWidth, stageHeight } = this.props;
    // The renderers "nativeSize" is the [width, height] of the stage in scratch-units
    const nativeSize = vm.renderer.getNativeSize();
    return [
      ((stageWidth / nativeSize[0]) * x) + (stageWidth / 2),
      -((stageHeight / nativeSize[1]) * y) + (stageHeight / 2)
    ];
  }

  render() {
    const highlightedTargetTime = state.targets.highlightedTargetTime;
    const highlightedTargetId = state.targets.highlightedTargetId;
    const {
      className,
    } = this.props;

    if (!(highlightedTargetId && vm && vm.renderer &&
      vm.runtime.getTargetById(highlightedTargetId))) return null;

    const target = vm.runtime.getTargetById(highlightedTargetId);
    const bounds = vm.renderer.getBounds(target.drawableID);
    const [left, top] = this.getPageCoords(bounds.left, bounds.top);
    const [right, bottom] = this.getPageCoords(bounds.right, bounds.bottom);

    const pad = 2; // px

    return (
      <div
        className={className}
        // Ensure new DOM element each update to restart animation
        key={highlightedTargetTime}
        style={{
          position: 'absolute',
          top: `${top - pad}px`,
          left: `${left - pad}px`,
          width: `${(right - left) + (2 * pad)}px`,
          height: `${(bottom - top) + (2 * pad)}px`
        }}
      />
    );
  }
}

TargetHighlight.propTypes = {
  className: PropTypes.string,
  stageHeight: PropTypes.number,
  stageWidth: PropTypes.number,
};

export default TargetHighlight;
