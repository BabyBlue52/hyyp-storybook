// This file has been automatically migrated to valid ESM format by Storybook.

import { fileURLToPath } from "node:url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  "addons": [
    '@storybook/addon-links',
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  "framework": {
    "name": '@storybook/vue3-vite',
    "options": {
      docgen: false
    }
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