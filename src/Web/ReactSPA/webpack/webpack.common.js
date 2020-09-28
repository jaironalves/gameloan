import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import InterpolateHtmlPlugin from 'interpolate-html-plugin'
import MomentTimezoneDataPlugin from 'moment-timezone-data-webpack-plugin'
import Merge from 'webpack-merge'
import paths from './paths'

const GenerateProcessEnv = (mode) => {
  const isProductionMode = mode === 'production'
  let path = '.env'
  if (!isProductionMode) path = `.env.${mode}`

  require('dotenv').config({
    path,
  })

  let deploy = 'development'
  if (isProductionMode) {
    deploy = 'production'
    if (process.env.DEPLOY_ENV) deploy = process.env.DEPLOY_ENV
  }

  return {
    DEPLOY_ENV: JSON.stringify(deploy),
    NODE_ENV: JSON.stringify(mode),
    API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
  }
}

const HtmlWebpackPluginAdditionalOptions = (mode) =>
  mode !== 'development'
    ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
    : undefined

const eslintLoader = {
  loader: 'eslint-loader',
  options: {
    eslintPath: require.resolve('eslint'),
    resolvePluginsRelativeTo: __dirname,
  },
}

const urlLoader = ({ namePattern }) => ({
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: `assets/${namePattern}.[ext]`,
  },
})

const fileLoader = ({ namePattern }) => ({
  loader: 'file-loader',
  options: {
    name: namePattern + '.[ext]',
    outputPath: 'assets',
  },
})

export default (options) =>
  Merge({
    mode: options.mode,
    entry: paths.entryPath,
    output: {
      filename: `${paths.jsFolder}/${options.namePattern}.js`,
      path: paths.outputPath,
      chunkFilename: `${paths.jsFolder}/${options.namePattern}.[chunkhash].js`,
      publicPath: '/',
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.js$/,
          include: paths.srcPath,
          enforce: 'pre',
          use: [eslintLoader],
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              use: [urlLoader(options)],
            },
            {
              test: /\.js$/,
              include: paths.srcPath,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: [options.styleLoaderInitial, 'css-loader', 'postcss-loader'],
            },
            {
              test: /\.(sa|sc)ss$/,
              use: [options.styleLoaderInitial, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              use: [fileLoader(options)],
            },
          ],
        },
      ],
    },
    plugins: [
      new Webpack.ProgressPlugin(),
      new MomentTimezoneDataPlugin({
        matchZones: 'America/Sao_Paulo',
        startYear: 2020,
        endYear: 2030,
      }),
      new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            template: paths.templatePath,
          },
          HtmlWebpackPluginAdditionalOptions(options.mode)
        )
      ),
      new Webpack.DefinePlugin({
        'process.env': GenerateProcessEnv(options.mode),
      }),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: '',
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
        generate: (seed, files) => {
          const manifestFiles = files.reduce(function (manifest, file) {
            manifest[file.name] = file.path
            return manifest
          }, seed)

          return {
            files: manifestFiles,
          }
        },
      }),
    ],
  })
