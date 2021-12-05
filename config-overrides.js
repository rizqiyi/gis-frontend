require('dotenv')
const { aliasJest, configPaths, alias } = require('react-app-rewire-alias')
const fs = require('fs')
const path = require('path')
const rewireBabelLoader = require('react-app-rewire-babel-loader')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const aliasMap = configPaths('./tsconfig.base.json')

module.exports = function override(config, env) {
  config = rewireBabelLoader.include(
    config,
    resolveApp('node_modules/@react-leaflet')
  )

  config = rewireBabelLoader.include(
    config,
    resolveApp('node_modules/react-leaflet')
  )

  const newConfig = alias(aliasMap)(config, env)

  newConfig.output.publicPath = process.env.PUBLIC_URL

  return newConfig
}
module.exports.jest = aliasJest(aliasMap)
