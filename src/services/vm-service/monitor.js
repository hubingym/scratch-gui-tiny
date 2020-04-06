import state from '../../states';

export default {
  onMonitorsUpdate(monitorList) {
    state.monitors.updateMonitors(monitorList);
  },
}
