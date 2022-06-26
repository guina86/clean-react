const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main-bundle-[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      '@presentation': path.join(__dirname, 'src/presentation'),
      '@data': path.join(__dirname, 'src/data'),
      '@domain': path.join(__dirname, 'src/domain'),
      '@infra': path.join(__dirname, 'src/infra'),
      '@main': path.join(__dirname, 'src/main')
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
