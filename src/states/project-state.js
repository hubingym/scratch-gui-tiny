import keyMirror from 'keymirror';
import { emitter } from './core';

const LoadingState = keyMirror({
  NOT_LOADED: null,
  ERROR: null,
  AUTO_UPDATING: null,
  CREATING_COPY: null,
  CREATING_NEW: null,
  FETCHING_NEW_DEFAULT: null,
  FETCHING_WITH_ID: null,
  LOADING_VM_FILE_UPLOAD: null,
  LOADING_VM_NEW_DEFAULT: null,
  LOADING_VM_WITH_ID: null,
  MANUAL_UPDATING: null,
  REMIXING: null,
  SHOWING_WITH_ID: null,
  SHOWING_WITHOUT_ID: null,
  UPDATING_BEFORE_COPY: null,
  UPDATING_BEFORE_NEW: null
});

// const getIsFetchingWithoutId = loadingState => (
//   // LOADING_VM_FILE_UPLOAD is an honorary fetch, since there is no fetching step for file uploads
//   loadingState === LoadingState.LOADING_VM_FILE_UPLOAD ||
//   loadingState === LoadingState.FETCHING_NEW_DEFAULT
// );
const getIsFetchingWithId = loadingState => (
  loadingState === LoadingState.FETCHING_WITH_ID ||
  loadingState === LoadingState.FETCHING_NEW_DEFAULT
);
// const getIsLoadingWithId = loadingState => (
//   loadingState === LoadingState.LOADING_VM_WITH_ID ||
//   loadingState === LoadingState.LOADING_VM_NEW_DEFAULT
// );
const getIsLoading = loadingState => (
  loadingState === LoadingState.LOADING_VM_FILE_UPLOAD ||
  loadingState === LoadingState.LOADING_VM_WITH_ID ||
  loadingState === LoadingState.LOADING_VM_NEW_DEFAULT
);
// const getIsLoadingUpload = loadingState => (
//   loadingState === LoadingState.LOADING_VM_FILE_UPLOAD
// );
// const getIsCreatingNew = loadingState => (
//   loadingState === LoadingState.CREATING_NEW
// );
// const getIsAnyCreatingNewState = loadingState => (
//   loadingState === LoadingState.FETCHING_NEW_DEFAULT ||
//   loadingState === LoadingState.LOADING_VM_NEW_DEFAULT ||
//   loadingState === LoadingState.CREATING_NEW
// );
// const getIsCreatingCopy = loadingState => (
//   loadingState === LoadingState.CREATING_COPY
// );
// const getIsManualUpdating = loadingState => (
//   loadingState === LoadingState.MANUAL_UPDATING
// );
// const getIsRemixing = loadingState => (
//   loadingState === LoadingState.REMIXING
// );
const getIsUpdating = loadingState => (
  loadingState === LoadingState.AUTO_UPDATING ||
  loadingState === LoadingState.MANUAL_UPDATING ||
  loadingState === LoadingState.UPDATING_BEFORE_COPY ||
  loadingState === LoadingState.UPDATING_BEFORE_NEW
);
const getIsShowingProject = loadingState => (
  loadingState === LoadingState.SHOWING_WITH_ID ||
  loadingState === LoadingState.SHOWING_WITHOUT_ID
);
// const getIsShowingWithId = loadingState => (
//   loadingState === LoadingState.SHOWING_WITH_ID
// );
// const getIsShowingWithoutId = loadingState => (
//   loadingState === LoadingState.SHOWING_WITHOUT_ID
// );
// const getIsError = loadingState => (
//   loadingState === LoadingState.ERROR
// );

const defaultProjectId = '0'; // hardcoded id of default project

const projectState = {
  error: null,
  projectData: null,
  projectId: null,
  loadingState: LoadingState.NOT_LOADED,
  defaultProjectId,
  getIsUpdating,
  getIsShowingProject,
  isLoading() {
    return getIsLoading(this.loadingState);
  },
  isFetchingWithId() {
    return getIsFetchingWithId(this.loadingState);
  },
  setProjectId(id) {
    this.projectId = id;
    this.loadingState = id === defaultProjectId ? LoadingState.FETCHING_NEW_DEFAULT : LoadingState.FETCHING_WITH_ID;
  },
  onFetchedProjectData(data) {
    this.projectData = data;
    this.loadingState = this.projectId === defaultProjectId ? LoadingState.LOADING_VM_NEW_DEFAULT : LoadingState.LOADING_VM_WITH_ID;
  },
  manualUpdateProject() {
    if (this.loadingState === LoadingState.SHOWING_WITH_ID) {
      this.loadingState = LoadingState.MANUAL_UPDATING;

      emitter.forceUpdate();
    }
  },
};

export default projectState;
