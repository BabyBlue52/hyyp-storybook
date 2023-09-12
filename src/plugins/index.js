/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

export function registerPlugins (app) {
  loadFonts()
  app.use(vuetify)
  app.component('EasyDataTable', Vue3EasyDataTable);
}
