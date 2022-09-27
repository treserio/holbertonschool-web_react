const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    // Note: entry paths are relative
    header: './modules/header/header.js',
    body: './modules/body/body.js',
    footer: './modules/footer/footer.js',
  },
  output: {
    // Note: output paths are absolute
    path: path.resolve(__dirname, 'public'),
    // Maps output to name key file in entry
    filename: '[name].bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // Rather than injecting like file-loader, adds scripts to index.html
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              limit: 8192,
            }
          },
        ],
      },
    ],
  },
  // Starts dev server on port 8564 (in development mode)
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8564,
  },
  plugins: [
    // Automatically creates index.html file
    new HtmlWebpackPlugin(),
    // Cleans folder before building
    new CleanWebpackPlugin(),
    // Plugin to minify css
    new MiniCssExtractPlugin()
  ],
  // Generate source map (this option is slow for publishing one file but maintains quality)
  devtool: 'inline-source-map',
  // Optimize by splitting module into smaller chunks
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      // Minimize CSS files
      new CssMinimizerPlugin(),
      // Minimize JS files - don't typically have to, but CSS minifying overrides
      new TerserPlugin(),
    ],
    // Above minimizing is for production - this is for devServer
    minimize: true,
  },
};
