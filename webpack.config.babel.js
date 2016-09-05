import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
}

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const cssLoader = isProduction ? ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader') : 'style!css!sass'

const base = {
  entry: {
    app: path.join(__dirname, 'app', 'app.js')
  },
  output: {
    path: path.join(__dirname, 'app', 'static'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.scss$/,loader: cssLoader},
      {test: /\.(jpe?g|png|gif|svg)$/i,loaders:['file?hash=sha512&digest=hex&name=[hash].[ext]']}
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
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    contentBase: 'app/static/'
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
  output: {
    path: path.resolve(__dirname, './build/js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
  plugins: [new ExtractTextPlugin('../css/styles.css'), productionPlugin]
}

export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig
)
