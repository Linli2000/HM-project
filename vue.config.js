// 官方文档：https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
// vue.config.js
const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')


module.exports = {
  // 配置Webpack
  configureWebpack: {
    //添加或更改的 webpack 配置
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 360,
          }),
        ],
      },
    },
  },
}
