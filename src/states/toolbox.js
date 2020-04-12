import { emitter } from './core';
import makeToolboxXML from '../lib/make-toolbox-xml';

export default {
  toolboxXML: makeToolboxXML(true),
  updateToolbox(toolboxXML) {
    this.toolboxXML = toolboxXML;
    emitter.forceUpdate();
  },
}
