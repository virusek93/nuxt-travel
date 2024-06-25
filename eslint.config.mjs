import tailwind from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([...tailwind.configs['flat/recommended']]).override(
  'nuxt/vue/rules',
  {
    rules: { 'vue/require-default-prop': 0 },
  },
)
