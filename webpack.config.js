const currentTask = process.env.npm_lifecycle_event;
const { prototype } = require('events');
const { watch } = require('fs');
const path = require('path');

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer'),
];

let config = {
  entry: './app/assets/scripts/App.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: false } },
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: postCSSPlugins } },
          },
        ],
      },
    ],
  },
};

if (currentTask == 'dev') {
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
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'dist'),
  };

  config.mode = 'production';
}

module.exports = config;
