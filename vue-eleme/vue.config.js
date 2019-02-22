let Path = require('path')
let Mock = require('./data.json')
function resolve (dir) {
  return Path.join(__dirname, dir)
}
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('components', resolve('src/components'))
    config.resolve.alias.set('common', resolve('src/common'))
  },
  devServer: {
    before(app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0,
          data: Mock
        })
      })
    }
  }
}
