module.exports = {
  extends: ['eslint-config-kouts/vue2'],
  overrides: [
    {
      // Disable multi-word-component-names for pages and components
      files: ['src/views/**/*.vue', 'src/components/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
