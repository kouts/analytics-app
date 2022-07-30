const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5',
  },  
  stories: [
    "../src/components/library/**/*.stories.mdx",
    "../src/components/library/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src/'),
    })

    return config
  }
}