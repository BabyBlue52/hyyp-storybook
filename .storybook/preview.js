
import '../src/assets/main.scss';

import { setup } from "@storybook/vue3";
import { registerPlugins } from "../src/plugins";
import { withVuetifyTheme, DEFAULT_THEME } from "./withVuetifyTheme.decorator";

setup((app) => {
  // Registers your app's plugins into Storybook
  registerPlugins(app);
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
  parameters: {
    
  }
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
  options: {
    storySort: {
      order: ['HYYP','Buttons','System', 'Sidebars', 'Datatables', '*']
    }
  }
};

export const decorators = [withVuetifyTheme];