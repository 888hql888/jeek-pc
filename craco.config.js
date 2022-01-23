const path = require('path')
// HtmlWebpackPlugin
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    configure: (webpackConfig) => {
      let cdn = {
        js: [],
        css: []
      }
      // 对webpack进行配置
      whenProd(() => {
        // 只会在生产环境执行
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux',
          'react-router-dom': 'ReactRouterDOM'
        }

        cdn = {
          js: [
            'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/redux/4.1.0/redux.min.js',
            'https://cdn.bootcdn.net/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js'
          ],
          css: []
        }
      })

      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )
      if (isFound) {
        // 找到了html的插件
        match.options.cdn = cdn
      }

      return webpackConfig
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://geek.itheima.net/v1_0/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
