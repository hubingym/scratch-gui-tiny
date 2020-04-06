export default {
  handleKeyDown(e) {
    // Don't capture keys intended for Blockly inputs.
    if (e.target !== document && e.target !== document.body) return;

    const key = (!e.key || e.key === 'Dead') ? e.keyCode : e.key;
    this.vm.postIOData('keyboard', {
      key: key,
      isDown: true
    });

    // Prevent space/arrow key from scrolling the page.
    if (e.keyCode === 32 || // 32=space
      (e.keyCode >= 37 && e.keyCode <= 40)) { // 37, 38, 39, 40 are arrows
      e.preventDefault();
    }
  },

  handleKeyUp(e) {
    // Always capture up events,
    // even those that have switched to other targets.
    const key = (!e.key || e.key === 'Dead') ? e.keyCode : e.key;
    this.vm.postIOData('keyboard', {
      key: key,
      isDown: false
    });

    // E.g., prevent scroll.
    if (e.target !== document && e.target !== document.body) {
      e.preventDefault();
    }
  }
}
