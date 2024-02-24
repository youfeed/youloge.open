import {defineConfig,presetAttributify,presetIcons,presetTypography,presetUno,presetWebFonts,} from 'unocss'

export default defineConfig({
  shortcuts:[
    ['f-c-c', 'flex justify-center items-center'],
    ['f-c-b', 'flex justify-between items-center'],
  ],
  theme:{
    breakpoints:{}
  },
  presets: [
    presetUno({ attributifyPseudo: true,}),presetAttributify(),
    presetIcons({ scale: 1.2, warn: true,extraProperties:{'display': 'inline-block','vertical-align': 'middle'}}),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Roboto',
        script: 'Homemade Apple',
      },
    }),
  ],
})