var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: {
    app:'./src/main.js',
    lib: [
        'vue',
        'axios',
        'fastclick',
        'lib-flexible',
        'vue-focus',
        'vue-router',
        'mint-ui',
        'vue-lazyload'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: '[name].[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]'
      //   }
      // }
      {test: /\.(png|jpg)$/, 
        loader:"url-loader?limit=40000000name=img/[name][hash:8].[ext]"
     }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        // use custom postcss plugins
      postcss: [require('postcss-px2rem')({
        baseDpr: 2,             // base device pixel ratio (default: 2)
        threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
        remVersion: true,       // whether to generate rem version (default: true)
        remUnit: 75,            // rem unit value (default: 75)
        remPrecision: 6         // rem precision (default: 6)
      })]
      }
    }),
    //公共模块抽取
    new webpack.optimize.CommonsChunkPlugin('lib')
  ],
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}else{
  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  }
  module.exports.devServer = {

    host:'192.168.200.85',
    historyApiFallback: true,
    noInfo: true
  }
  module.exports.plugins = [
    new webpack.LoaderOptionsPlugin({
      vue: {
        // use custom postcss plugins
      postcss: [require('postcss-px2rem')({
        baseDpr: 2,             // base device pixel ratio (default: 2)
        threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
        remVersion: true,       // whether to generate rem version (default: true)
        remUnit: 75,            // rem unit value (default: 75)
        remPrecision: 6         // rem precision (default: 6)
      })]
      }
    })
  ]
}
