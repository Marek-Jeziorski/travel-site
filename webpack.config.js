const currentTask = process.env.npm_lifecycle_event;

// TODO - delete below?
const { prototype } = require('events');
const { watch } = require('fs');

// TODO - read about loaders and require below
// what's the difference between loader vs. plugin

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer'),
];

let cssConfig = {
  test: /\.css$/i,
  use: [
    { loader: 'css-loader', options: { url: false } },
    {
      loader: 'postcss-loader',
      options: { postcssOptions: { plugins: postCSSPlugins } },
    },
  ],
};

let config = {
  entry: './app/assets/scripts/App.js',
  module: {
    rules: [cssConfig],
  },
};

if (currentTask == 'dev') {
  cssConfig.use.unshift('style-loader');

  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app'),
  };

  config.devServer = {
    watchFiles: ['app/**/*.html'],
    static: {
      directory: path.join(__dirname, 'app'),
      watch: false,
    },

    hot: true,
    port: 3000,
  };

  config.mode = 'development';
}

if (currentTask == 'build') {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);

  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  };

  config.optimization = {
    splitChunks: {
      chunks: 'all',
    },
  };

  config.plugins = [
    new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }),
  ];

  config.mode = 'production';
}

module.exports = config;
