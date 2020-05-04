import state from '../../states';

export default {
  onMonitorsUpdate(monitorList) {
    state.scratchGui.monitors.updateMonitors(monitorList);
  },
}
