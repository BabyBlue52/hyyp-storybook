import { dirname, join } from "path";
/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/vue3-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../public', '../src/assets'],
};
export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
