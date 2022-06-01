const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const TailwindPlugin = require('tailwindcss')
const Dotenv = require('dotenv-webpack')

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
          publicPath: '.',
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [TailwindPlugin],
              },
            },
          },
        ],
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
        path.resolve(__dirname, 'manifest.json'),
      ],
    }),
    new Dotenv({ systemvars: true }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
