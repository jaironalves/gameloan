import path from 'path'

export default {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'dist'),
  srcPath: path.resolve(__dirname, '../', 'src'),
  entryPath: path.resolve(__dirname, '../', 'src/index.js'),
  publicPath: path.resolve(__dirname, '../', 'src/public'),
  templatePath: path.resolve(__dirname, '../', 'src/public/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
}
