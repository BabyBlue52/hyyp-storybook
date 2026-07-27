// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ 
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler',
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Match hyyp-client: auto-import variables. Skip files that already @use them (or are variables.scss).
        additionalData: (content, filename) => {
          if (filename.includes('variables.scss')) return content
          if (content.includes('variables.scss')) return content
          return `@use "@/assets/variables.scss" as *;\n${content}`
        },
      },
    },
  },
  server: {
    port: 3000,
  },
})
