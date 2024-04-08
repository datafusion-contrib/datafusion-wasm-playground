import { defineConfig } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import { presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({}),
  ],
})