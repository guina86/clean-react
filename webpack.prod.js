const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }
      ]
    }
    ]
  },
  externals: {
    react: 'React',
    axios: 'axios',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:5050/api')
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html',
      favicon: './public/favicon.png'
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[contenthash].css'
    })
  ]
})
