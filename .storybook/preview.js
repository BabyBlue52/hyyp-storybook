
import '../src/assets/base.scss';
import { setup } from "@storybook/vue3";
import { registerPlugins } from "../src/plugins";
import { withVuetifyTheme, DEFAULT_THEME } from "./withVuetifyTheme.decorator";
import { createRouter, createMemoryHistory } from 'vue-router';
import logo from '../src/assets/logos/hyyp.svg';

// Create a mock router for Storybook
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/admin/venue/:venueId', name: 'venue' },
    { path: '/admin/:venueId/rooms/', name: 'rooms' },
    { path: '/admin/:venueId/requests', name: 'requests' },
    { path: '/admin/:venueId/history', name: 'history' },
    { path: '/account/:userId', name: 'account' },
  ],
});

// Set initial route
router.push('/admin/venue/12346');

setup((app) => {
  // Registers your app's plugins into Storybook
  registerPlugins(app);
  // Register router
  app.use(router);
});

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for hyyp components",
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: "paintbrush",
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: "light", title: "Light", left: "🌞" },
        { value: "dark", title: "Dark", left: "🌛" },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ['HYYP','Buttons','System', 'Modals',  'Sidebars', 'Datatables', '*']
    }
  },
};

export const decorators = [withVuetifyTheme];