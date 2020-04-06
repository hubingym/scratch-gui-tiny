import VM from 'scratch-vm';
import storage from '../lib/storage';

const defaultVM = new VM();
defaultVM.attachStorage(storage);

export default defaultVM;
