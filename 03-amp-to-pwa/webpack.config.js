const path = require('path');


const client = {
  entry: path.resolve(__dirname, './hub/src/client.jsx'),
  output: {
    path: path.resolve(__dirname, './hub/dist'),
    filename: 'client.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                node: 'current',
              },
              loose: true,
            }],
            'react',
          ],
        },
      },
    }],
  },
  mode: 'development',
};

const server = Object.assign({}, client, {
  entry: path.resolve(__dirname, './hub/src/server.jsx'),
  output: {
    path: path.resolve(__dirname, './hub/dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
});


module.exports = [client, server];
