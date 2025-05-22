

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => {
  return {
    plugins: [vue()],
    base: command === 'serve' ? '/' : '/frontend/',
    resolve: {
      alias: {
        vuex: 'vuex/dist/vuex.esm-bundler.js'
      }
    },
  }
})
