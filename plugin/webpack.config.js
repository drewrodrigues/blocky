const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.ENV === 'prod' ? 'production' : 'development',
  entry: './src/plugin.tsx',
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
          publicPath: './src/icons',
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
          from: './src/icons/*',
          to() {
            return 'icons/[name][ext]'
          },
        },
        path.resolve(__dirname, 'src', 'styles', 'style.css'),
        path.resolve(__dirname, 'manifest.json'),
      ],
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
