import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const webpackUglify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
})

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
}

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'build'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const cssLoader = isProduction ? ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader') : 'style!css!sass'

const base = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, 'app', 'app.js'),
  ],
  output: {
    path: path.join(__dirname, 'app', 'static'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.scss$/,
        loader: cssLoader
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders:['file?hash=sha512&digest=hex&name=[hash].[ext]']
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[hash].[ext]',
      }
    ]
  },
  resolve: {
    root: [
      path.resolve('./app'),
      path.join(__dirname, 'app', 'static')
    ]
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}

const productionConfig = {
  output: {
    path: path.resolve(__dirname, './build/js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
  plugins: [new ExtractTextPlugin('../css/styles.css'), productionPlugin, webpackUglify]
}

export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig
)
