// import bindAll from 'lodash.bindall';
import AudioEngine from 'scratch-audio';
import state from '../../states';
import storage from '../../lib/storage';

// 将业务代码分散，使代码小巧
import keybord from './keybord';
import project from './project';
import monitor from './monitor';
import target from './target';

class VmService {
  constructor() {
    this.vm = state.vm;
    // bindAll(this, [
    // ]);

    this.locale = '';

    this.handleKeyDown = keybord.handleKeyDown.bind(this);
    this.handleKeyUp = keybord.handleKeyUp.bind(this);
    this.fetchProject = project.fetchProject.bind(this);
    this.loadProject = project.loadProject.bind(this);
    this.onSetProjectUnchanged = project.onSetProjectUnchanged.bind(this);
    this.handleTargetsUpdate = target.handleTargetsUpdate.bind(this);
    this.onMonitorsUpdate = monitor.onMonitorsUpdate.bind(this);
  }

  initialize() {
    const vm = this.vm;
    // storage
    vm.attachStorage(storage);
    // audio
    vm.attachAudioEngine(new AudioEngine());
    vm.setCompatibilityMode(true);
    vm.initialized = true;

    vm.on('targetsUpdate', this.handleTargetsUpdate);
    vm.on('MONITORS_UPDATE', this.onMonitorsUpdate);
    // vm.on('BLOCK_DRAG_UPDATE', onBlockDragUpdate);
    vm.on('TURBO_MODE_ON', () => { state.vmStatus.setTurboState(true); });
    vm.on('TURBO_MODE_OFF', () => { state.vmStatus.setTurboState(false); });
    vm.on('PROJECT_RUN_START', () => { state.vmStatus.setRunningState(true); });
    vm.on('PROJECT_RUN_STOP', () => { state.vmStatus.setRunningState(false); });
    vm.on('PROJECT_CHANGED', () => { this.onSetProjectUnchanged(true); });
    vm.on('RUNTIME_STARTED', () => { state.vmStatus.setStartedState(true); });
    vm.on('PROJECT_START', () => { console.log('onGreenFlag'); });
    // vm.on('PERIPHERAL_CONNECTION_LOST_ERROR', onShowExtensionAlert);
    // vm.on('MIC_LISTENING', onMicListeningUpdate);
    // vm.on('HAS_CLOUD_DATA_UPDATE', handleCloudDataUpdate);

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    // vm.postIOData('userData', {username: this.props.username});

    // 开启虚拟机
    vm.start();
  }

  /**
   * 监控语言是否变化,设置vm的locale
   */
  updateLocale(locale, messages) {
    if (this.locale === locale) return;
    this.locale = locale;
    this.vm.setLocale(locale, messages);
  }
}

export default new VmService();
