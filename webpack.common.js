const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = ['index','weather'];

function makeFiles(config, page){
  config[page] = `./src/${page}.js`;
  return config;
}

module.exports = {
    entry: pages.reduce(makeFiles, {}),
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Weather App',
        filename:'index.html',
        template:'./src/index.html'
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };