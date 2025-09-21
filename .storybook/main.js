
import { dirname, join } from "path";

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-docs'
  ],
  "framework": {
    "name": '@storybook/vue3-vite',
    "options": {}
  },
  "viteFinal": async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': join(__dirname, '../src'),
    };
    return config;
  },
};
export default config;