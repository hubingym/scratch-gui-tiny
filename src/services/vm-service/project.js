import state, { emitter } from '../../states';
import storage from '../../lib/storage';

export default {
  fetchProject(projectId) {
    state.scratchGui.projectState.setProjectId(projectId);
    return storage
      .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
      .then(projectAsset => {
        if (projectAsset) {
          // console.log(projectAsset.data);
          state.scratchGui.projectState.onFetchedProjectData(projectAsset.data);
          setTimeout(() => { this.loadProject(); });
        } else {
          // Treat failure to load as an error
          // Throw to be caught by catch later on
          throw new Error('Could not find project');
        }
      })
      .catch(err => {
        // TODO: handle error
        // onError(err);
        console.error(err);
      });
  },

  loadProject() {
    return this.vm.loadProject(state.scratchGui.projectState.projectData)
      .then(() => {
        // this.onLoadedProject(this.loadingState, this.canSave);
        // Wrap in a setTimeout because skin loading in
        // the renderer can be async.
        setTimeout(() => this.onSetProjectUnchanged(false));

        // If the vm is not running, call draw on the renderer manually
        // This draws the state of the loaded project with no blocks running
        // which closely matches the 2.0 behavior, except for monitors–
        // 2.0 runs monitors and shows updates (e.g. timer monitor)
        // before the VM starts running other hat blocks.
        // if (!this.isStarted) {
        //   // Wrap in a setTimeout because skin loading in
        //   // the renderer can be async.
        //   setTimeout(() => this.vm.renderer.draw());
        // }
      })
      .catch(e => {
        this.onError(e);
      });
  },

  onSetProjectUnchanged(changed) {
    state.scratchGui.projectChanged.projectChanged = changed;
    emitter.forceUpdate();
  }
}