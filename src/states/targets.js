import { emitter } from './core';

export default {
  sprites: {},
  stage: {},
  editingTarget: null,
  highlightedTargetId: null,
  highlightedTargetTime: null,
  updateTargets(targetList, editingTarget) {
    this.sprites = targetList.filter(target => !target.isStage).reduce(
      (targets, target, listId) => Object.assign(targets, { [target.id]: { order: listId, ...target } }),
      {}
    );
    this.stage = targetList.filter(target => target.isStage)[0] || {};
    this.editingTarget = editingTarget;

    emitter.forceUpdate();
  },
  highlightTarget(targetId) {
    this.highlightedTargetId = targetId;
    this.highlightedTargetTime = Date.now();

    emitter.forceUpdate();
  },
}
