const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

console.log(`Building in mode: ${process.env.ENV}`)

module.exports = {
  mode: process.env.ENV === 'prod' ? 'production' : 'development',
  entry: './src/plugin/index.ts',
  devtool: process.env.ENV === 'prod' ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: './src/plugin/icons',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/plugin/icons/*',
          to() {
            return 'icons/[name][ext]'
          },
        },
        path.resolve(__dirname, 'src', 'plugin', 'style.css'),
        path.resolve(__dirname, 'manifest.json'),
      ],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
