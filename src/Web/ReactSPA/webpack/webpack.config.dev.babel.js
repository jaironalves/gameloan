import Common from './webpack.common.js'
import Merge from 'webpack-merge'
import Webpack from 'webpack'
import paths from './paths'

const optionsCommon = {
  mode: 'development',
  namePattern: '[name]',
  styleLoaderInitial: 'style-loader',
}

export default Merge(Common(optionsCommon), {
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    contentBase: paths.outputPath,
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
})
