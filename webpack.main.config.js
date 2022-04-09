const { BytenodeWebpackPlugin } = require('@herberttn/bytenode-webpack-plugin')
const rules = require('./webpack.rules')


/** @type {import(‘@types/webpack’).Configuration} */
module.exports = {
  entry: './src/main.ts',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new BytenodeWebpackPlugin({ compileForElectron: true }),
  ]
}