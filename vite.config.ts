import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//     plugins: [vue()],
//     base: "/",
//     resolve: {
//         alias: {
//             vuex: 'vuex/dist/vuex.esm-bundler.js'
//         }
//     },
    
// })


export default defineConfig(({ mode }) => ({
    plugins: [vue()],
    base: mode === 'production' ? '/frontend/' : '/',
    resolve: {
            alias: {
                vuex: 'vuex/dist/vuex.esm-bundler.js'
            }
        },
}))