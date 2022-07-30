module.exports = {
  lintOnSave: 'warning',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/scss/variables.scss";
        `
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'AnalyticsApp'
      args[0].meta = { description: 'An API analytics page' }

      return args
    })
  }
}
