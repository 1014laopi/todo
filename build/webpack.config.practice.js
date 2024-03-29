const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, './template.html')
  })
];
const devServer = {
  port: '8002',
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
  // open: true
};
let config;

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: "#cheap-module-eval-source-map",
  module: {
    rules: [{
      test: /\.styl/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }]
  },
  devServer,
  // import vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
  ])
});

module.exports = config;
