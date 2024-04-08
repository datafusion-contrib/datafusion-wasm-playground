import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await";
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/datafusion-playground/',
  plugins: [
    wasm(),
    topLevelAwait(),
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    UnoCSS()],
})

