import bindAll from 'lodash.bindall';
import React from 'react';

import getCostumeUrl from '../lib/get-costume-url';

import WatermarkComponent from '../components/watermark/watermark.jsx';

import state from '../states';

class Watermark extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      'getCostumeData'
    ]);
  }

  getCostumeData() {
    let asset;
    if (state.targets.stage.id === state.targets.editingTarget) {
        asset = state.targets.stage.costume.asset;
    } else if (state.targets.sprites.hasOwnProperty(state.targets.editingTarget)) {
        const currentSprite = state.targets.sprites[state.targets.editingTarget];
        asset = currentSprite.costume.asset;
    }
    return asset ? getCostumeUrl(asset) : null;
  }

  render() {
    return (
      <WatermarkComponent
        costumeURL={this.getCostumeData()}
      />
    );
  }
}

export default Watermark;
