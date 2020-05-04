import { emitter } from './core';

const MENU_ACCOUNT = 'accountMenu';
const MENU_FILE = 'fileMenu';
const MENU_EDIT = 'editMenu';
const MENU_LANGUAGE = 'languageMenu';
const MENU_LOGIN = 'loginMenu';

const openMenu = function (menu) {
  _export[menu] = true;
  emitter.forceUpdate();
};
const closeMenu = function (menu) {
  _export[menu] = false;
  emitter.forceUpdate();
};
const openAccountMenu = () => openMenu(MENU_ACCOUNT);
const closeAccountMenu = () => closeMenu(MENU_ACCOUNT);
const accountMenuOpen = state => state.scratchGui.menus[MENU_ACCOUNT];
const openFileMenu = () => openMenu(MENU_FILE);
const closeFileMenu = () => closeMenu(MENU_FILE);
const fileMenuOpen = state => state.scratchGui.menus[MENU_FILE];
const openEditMenu = () => openMenu(MENU_EDIT);
const closeEditMenu = () => closeMenu(MENU_EDIT);
const editMenuOpen = state => state.scratchGui.menus[MENU_EDIT];
const openLanguageMenu = () => openMenu(MENU_LANGUAGE);
const closeLanguageMenu = () => closeMenu(MENU_LANGUAGE);
const languageMenuOpen = state => state.scratchGui.menus[MENU_LANGUAGE];
const openLoginMenu = () => openMenu(MENU_LOGIN);
const closeLoginMenu = () => closeMenu(MENU_LOGIN);
const loginMenuOpen = state => state.scratchGui.menus[MENU_LOGIN];

const _export = {
  [MENU_ACCOUNT]: false,
  [MENU_FILE]: false,
  [MENU_EDIT]: false,
  [MENU_LANGUAGE]: false,
  [MENU_LOGIN]: false,
  openAccountMenu,
  closeAccountMenu,
  accountMenuOpen,
  openFileMenu,
  closeFileMenu,
  fileMenuOpen,
  openEditMenu,
  closeEditMenu,
  editMenuOpen,
  openLanguageMenu,
  closeLanguageMenu,
  languageMenuOpen,
  openLoginMenu,
  closeLoginMenu,
  loginMenuOpen,
};

export default _export;
