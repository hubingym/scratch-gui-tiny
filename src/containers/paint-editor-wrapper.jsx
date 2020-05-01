import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import VM from 'scratch-vm';
import PaintEditor from 'scratch-paint/dist/scratch-paint.js';

import state from '../states';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ScratchPaintReducer } from 'scratch-paint/dist/scratch-paint.js';

class PaintEditorWrapper extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleUpdateImage',
      'handleUpdateName'
    ]);

    const reducers = {
      scratchPaint: ScratchPaintReducer,
    };
    const initialState = {};
    const reducer = combineReducers(reducers);
    this.store = createStore(
      reducer,
      initialState,
    );
  }
  shouldComponentUpdate(nextProps) {
    return this.props.imageId !== nextProps.imageId ||
      this.props.rtl !== nextProps.rtl ||
      this.props.name !== nextProps.name;
  }
  handleUpdateName(name) {
    this.props.vm.renameCostume(this.props.selectedCostumeIndex, name);
  }
  handleUpdateImage(isVector, image, rotationCenterX, rotationCenterY) {
    if (isVector) {
      this.props.vm.updateSvg(
        this.props.selectedCostumeIndex,
        image,
        rotationCenterX,
        rotationCenterY);
    } else {
      this.props.vm.updateBitmap(
        this.props.selectedCostumeIndex,
        image,
        rotationCenterX,
        rotationCenterY,
        2 /* bitmapResolution */);
    }
  }
  render() {
    if (!this.props.imageId) return null;
    const {
      selectedCostumeIndex,
      vm,
      ...componentProps
    } = this.props;

    return (
      <Provider store={this.store}>
        <PaintEditor
          {...componentProps}
          image={vm.getCostume(selectedCostumeIndex)}
          onUpdateImage={this.handleUpdateImage}
          onUpdateName={this.handleUpdateName}
        />
      </Provider>
    );
  }
}

PaintEditorWrapper.propTypes = {
  imageFormat: PropTypes.string.isRequired,
  imageId: PropTypes.string.isRequired,
  name: PropTypes.string,
  rotationCenterX: PropTypes.number,
  rotationCenterY: PropTypes.number,
  rtl: PropTypes.bool,
  selectedCostumeIndex: PropTypes.number.isRequired,
  vm: PropTypes.instanceOf(VM)
};

const PaintEditorState = ({ selectedCostumeIndex }) => {
  const editingTarget = state.vm.editingTarget;
  const targetId = editingTarget.id;
  const sprite = editingTarget.sprite;
  // Make sure the costume index doesn't go out of range.
  const index = selectedCostumeIndex < sprite.costumes.length ? selectedCostumeIndex : sprite.costumes.length - 1;
  const costume = editingTarget.sprite.costumes[index];

  const componentProps = {
    name: costume && costume.name,
    rotationCenterX: costume && costume.rotationCenterX,
    rotationCenterY: costume && costume.rotationCenterY,
    imageFormat: costume && costume.dataFormat,
    imageId: targetId && `${targetId}${costume.skinId}`,
    rtl: state.locales.isRtl,
    selectedCostumeIndex: index,
    vm: state.vm,
    zoomLevelId: targetId
  };

  return (
    <PaintEditorWrapper
      {...componentProps}
    />
  );
}

export default PaintEditorState;
