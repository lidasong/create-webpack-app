const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function getConfig(port = 8000) {
  const { NODE_ENV } = process.env;
  const isDev = NODE_ENV === 'development';
  return {
    mode: NODE_ENV,
    entry: {
      main: './index.ts',
      hmr: [
        // Include the client code. Note host/post.
        `webpack-dev-server/client?http://localhost:${port}`,
        // Hot reload only when compiled successfully
        'webpack/hot/only-dev-server',
      ],
    },
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDev ? 'inline-source-map' : '',
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@components': 'src/components',
        '@styles': 'src/styles',
      },
    },
    module: {
      rules: [{
        test: /\.(scss|css)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        }, {
          loader: 'sass-loader',
        }],
      }, {
        test: /\.tsx?$|\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['react-hot-loader/babel'],
            },
          }, {
            loader: 'ts-loader',
          }],
      }],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'template/index.html'),
      }),
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
      }),
    ],
    optimization: {
      minimize: !isDev,
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 3,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      ...(isDev ? {
        runtimeChunk: {
          name: 'manifest',
        },
      } : {}),
    },
  };
};
