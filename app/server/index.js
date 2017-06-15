var path = require('path')

var pathToApp = path.join(__dirname, '../')

require('babel-register')({
  resolveModuleSource: require('babel-resolver')(pathToApp)
})

require('./server.js')
