const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const GoogleFontsPlugin = require('google-fonts-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {};

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {loader: 'pug-loader'}
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   sourceMap: true,
            //   importLoader: 2
            // }
          },
          'sass-loader',
        ],
      },
      {
        test: /(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // publicPath: './../../',
              publicPath: '../webfonts/',
              outputPath: 'webfonts/',
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false
      , verbose: true
      , cleanOnceBeforeBuildPatterns: ['**/*', '!css/fonts/fonts.css']
    }),
    // new webpack.ProvidePlugin({
    //   Reveal: 'reveal.js',
    // }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
      // {from: 'src/index.html', to: '.'},
      // {from: 'node_modules/reveal.js/css/*.css', to: 'css/[name].css'},
      // {from: 'node_modules/reveal.js/css/theme/white.css', to: 'css/theme.css'},
      {from: 'node_modules/reveal.js-menu/menu.css', to: 'css/lib/menu.css'},
      // speaker note base window
      // { from: 'node_modules/reveal.js/plugin/notes/notes.html', to: 'lib/js/reveal.js-dependencies/notes.html' },
      // any files in content
      // { context: 'src/content',
      //   from: '**/*',
      //   to: 'content/'
      // }
    ]),
    new GoogleFontsPlugin({
      fonts: [{family: 'Raleway'}],
      formats: ['ttf'],
      filename: `css/fonts/fonts.css`
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ]
};