module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          primary: '#fff'
        }
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.less?$/,
          use: ['less-loader']
        }
      ]
    },
    resolve: {
      alias: {
        vue$: process.env.NODE_ENV == 'production' ? 'vue/dist/vue.min' : 'vue/dist/vue'
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: '3000'
  }
}
