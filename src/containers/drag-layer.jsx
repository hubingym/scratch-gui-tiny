import React from 'react';
import DragLayer from '../components/drag-layer/drag-layer.jsx';

import state from '../states';

const DragLayerState = (props) => {
  const stateProps = {
    dragging: state.scratchGui.assetDrag.dragging,
    currentOffset: state.scratchGui.assetDrag.currentOffset,
    img: state.scratchGui.assetDrag.img
  };

  return (
    <DragLayer
      {...stateProps}
    />
  );
}

export default DragLayerState;
