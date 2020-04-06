import bindAll from 'lodash.bindall';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import { intlShape, injectIntl } from 'react-intl';

import DragConstants from '../../lib/drag-constants';
import DropAreaHOC from '../../lib/drop-area-hoc.jsx';
import ThrottledPropertyHOC from '../../lib/throttled-property-hoc.jsx';
import { emptyCostume } from '../../lib/empty-assets';
import sharedMessages from '../../lib/shared-messages';
// import {fetchCode} from '../../lib/backpack-api';
import { getEventXY } from '../../lib/touch-utils';

import StageSelectorComponent from './stage-selector/stage-selector.jsx';

// import backdropLibraryContent from '../lib/libraries/backdrops.json';
// import {handleFileUpload, costumeUpload} from '../lib/file-uploader.js';

import state from '../../states';

const dragTypes = [
  DragConstants.COSTUME,
  DragConstants.SOUND,
  DragConstants.BACKPACK_COSTUME,
  DragConstants.BACKPACK_SOUND,
  DragConstants.BACKPACK_CODE
];

const DroppableThrottledStage = DropAreaHOC(dragTypes)(
  ThrottledPropertyHOC('url', 500)(StageSelectorComponent)
);

class StageSelector extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'handleClick',
      'handleNewBackdrop',
      'handleSurpriseBackdrop',
      'handleEmptyBackdrop',
      'addBackdropFromLibraryItem',
      'handleFileUploadClick',
      'handleBackdropUpload',
      'handleMouseEnter',
      'handleMouseLeave',
      'handleTouchEnd',
      'handleDrop',
      'setFileInput',
      'setRef'
    ]);
  }
  componentDidMount() {
    document.addEventListener('touchend', this.handleTouchEnd);
  }
  componentWillUnmount() {
    document.removeEventListener('touchend', this.handleTouchEnd);
  }
  handleTouchEnd(e) {
    const { x, y } = getEventXY(e);
    const { top, left, bottom, right } = this.ref.getBoundingClientRect();
    if (x >= left && x <= right && y >= top && y <= bottom) {
      this.handleMouseEnter();
    }
  }
  addBackdropFromLibraryItem(item, shouldActivateTab = true) {
    const vmBackdrop = {
      name: item.name,
      md5: item.md5,
      rotationCenterX: item.info[0] && item.info[0] / 2,
      rotationCenterY: item.info[1] && item.info[1] / 2,
      bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
      skinId: null
    };
    this.handleNewBackdrop(vmBackdrop, shouldActivateTab);
  }
  handleClick() {
    this.props.onSelect(this.props.id);
  }
  handleNewBackdrop(backdrops_, shouldActivateTab = true) {
    const backdrops = Array.isArray(backdrops_) ? backdrops_ : [backdrops_];
    return Promise.all(backdrops.map(backdrop =>
      this.props.vm.addBackdrop(backdrop.md5, backdrop)
    )).then(() => {
      if (shouldActivateTab) {
        return this.props.onActivateTab(state.editorTab.COSTUMES_TAB_INDEX);
      }
    });
  }
  handleSurpriseBackdrop(e) {
    e.stopPropagation(); // Prevent click from falling through to selecting stage.
    // @todo should this not add a backdrop you already have?
    // const item = backdropLibraryContent[Math.floor(Math.random() * backdropLibraryContent.length)];
    // this.addBackdropFromLibraryItem(item, false);
  }
  handleEmptyBackdrop(e) {
    e.stopPropagation(); // Prevent click from falling through to stage selector, select it manually below
    this.props.vm.setEditingTarget(this.props.id);
    this.handleNewBackdrop(emptyCostume(this.props.intl.formatMessage(sharedMessages.backdrop, { index: 1 })));
  }
  handleBackdropUpload(e) {
    // const storage = state.vm.runtime.storage;
    // onShowImporting();
    // handleFileUpload(e.target, (buffer, fileType, fileName, fileIndex, fileCount) => {
    //     costumeUpload(buffer, fileType, storage, vmCostumes => {
    //         this.props.vm.setEditingTarget(this.props.id);
    //         vmCostumes.forEach((costume, i) => {
    //             costume.name = `${fileName}${i ? i + 1 : ''}`;
    //         });
    //         this.handleNewBackdrop(vmCostumes).then(() => {
    //             if (fileIndex === fileCount - 1) {
    //                 onCloseImporting();
    //             }
    //         });
    //     }, onCloseImporting);
    // }, onCloseImporting);
  }
  handleFileUploadClick(e) {
    e.stopPropagation(); // Prevent click from selecting the stage, that is handled manually in backdrop upload
    this.fileInput.click();
  }
  handleMouseEnter() {
    this.props.dispatchSetHoveredSprite(this.props.id);
  }
  handleMouseLeave() {
    this.props.dispatchSetHoveredSprite(null);
  }
  handleDrop(dragInfo) {
    if (dragInfo.dragType === DragConstants.COSTUME) {
      this.props.vm.shareCostumeToTarget(dragInfo.index, this.props.id);
    } else if (dragInfo.dragType === DragConstants.SOUND) {
      this.props.vm.shareSoundToTarget(dragInfo.index, this.props.id);
    } else if (dragInfo.dragType === DragConstants.BACKPACK_COSTUME) {
      this.props.vm.addCostume(dragInfo.payload.body, {
        name: dragInfo.payload.name
      }, this.props.id);
    } else if (dragInfo.dragType === DragConstants.BACKPACK_SOUND) {
      this.props.vm.addSound({
        md5: dragInfo.payload.body,
        name: dragInfo.payload.name
      }, this.props.id);
    } else if (dragInfo.dragType === DragConstants.BACKPACK_CODE) {
      // fetchCode(dragInfo.payload.bodyUrl)
      //     .then(blocks => {
      //         this.props.vm.shareBlocksToTarget(blocks, this.props.id);
      //         this.props.vm.refreshWorkspace();
      //     });
    }
  }
  setFileInput(input) {
    this.fileInput = input;
  }
  setRef(ref) {
    this.ref = ref;
  }
  render() {
    const componentProps = omit(this.props, [
      'asset', 'dispatchSetHoveredSprite', 'id', 'intl',
      'onActivateTab', 'onSelect', 'onShowImporting', 'onCloseImporting']);
    // TODO: 处理asset和id
    // componentProps.url = asset && asset.encodeDataURI();
    // componentProps.receivedBlocks = state.hoveredTarget.receivedBlocks && state.hoveredTarget.sprite === id;
    componentProps.raised = state.blockDrag.areBlocksOverGui;
    componentProps.dragInfo = state.assetDrag;
    return (
      <DroppableThrottledStage
        componentRef={this.setRef}
        fileInputRef={this.setFileInput}
        onBackdropFileUpload={this.handleBackdropUpload}
        onBackdropFileUploadClick={this.handleFileUploadClick}
        onClick={this.handleClick}
        onDrop={this.handleDrop}
        onEmptyBackdropClick={this.handleEmptyBackdrop}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onSurpriseBackdropClick={this.handleSurpriseBackdrop}
        {...componentProps}
      />
    );
  }
}
StageSelector.propTypes = {
  ...StageSelectorComponent.propTypes,
  id: PropTypes.string,
  intl: intlShape.isRequired,
  onCloseImporting: PropTypes.func,
  onSelect: PropTypes.func,
  onShowImporting: PropTypes.func
};

StageSelector.defaultProps = {
  vm: state.vm,
  onNewBackdropClick() {
    throw new Error('没有实现');
  },
  onActivateTab(tab) {
    state.editorTab.activateTab(tab);
  },
  dispatchSetHoveredSprite(spriteId) {
    state.hoveredTarget.setHoveredSprite(spriteId)
  },
  onCloseImporting() {
    state.alerts.closeAlertWithId('importingAsset');
  },
  onShowImporting() {
    state.alerts.showStandardAlert('importingAsset');
  },
};

export default injectIntl(StageSelector);
