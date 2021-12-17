# Vue学习记录

## CDN改造

- 创建cdn.config.js
  
```javascript
module.exports = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    'element-plus': 'ElementPlus',
    'vant': 'vant'
  },
  css: [
    // element-ui css
    '//unpkg.com/element-plus/dist/index.css',
    '//unpkg.com/vant@3.0.15/lib/index.css'
  ],
  // 国内免费（猫云）CDN https://www.bootcdn.cn/
  // 国外免费（unpkg）CDN https://unpkg.com
  // 国外免费（jsdelivr）CDN https://www.jsdelivr.com/
  js: [
    // Vue
    '//unpkg.com/vue@3.2.20/dist/vue.global.js',
    // VueRouter
    '//unpkg.com/vue-router@4.0.11/dist/vue-router.global.js',
    // Vuex
    '//unpkg.com/vuex@4.0.2/dist/vuex.global.js',
    // Axios
    '//unpkg.com/axios@0.21.1/dist/axios.min.js',
    // element-plus
    '//unpkg.com/element-plus@1.1.0-beta.24/dist/index.full.js',
    '//unpkg.com/vant@3.0.15/lib/vant.min.js'
  ]
}
```

- vue.config.js

```javascript
const path = require('path')
const CDN = require('./cdn.config')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    if (isProd) {
      // 添加自定义参数cdn
      config.plugin('html').tap(args => {
        args[0].cdn = CDN || {}
        return args
      })
    } else {
      // 添加自定义参数cdn
      config.plugin('html').tap(args => {
        args[0].cdn = { css: [], js: [] }
        return args
      })
    }
  },
  configureWebpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src/')
    if (isProd) {
      config.externals = CDN.externals
    }
  }
}
```
