const path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/dashboard_main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/i,
        use: {
          loader: 'url-loader',
        }
      },
      {
        test: /\.(css)$/i,
        use: ['css-loader', 'style-loader']
      },
    ],
  },
};
