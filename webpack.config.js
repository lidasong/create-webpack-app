const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function getConfig() {
    const NODE_ENV = process.env.NODE_ENV
    const isDev = NODE_ENV === 'development'
    return {
        mode: NODE_ENV,
        entry: {
            main: './index.ts'
        },
        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, 'dist')
        },
        devtool: isDev ? 'inline-source-map' : '',
        resolve: {
            modules: ['node_modules', path.resolve(__dirname, 'src')],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            alias: {
                '@components': 'src/components',
                '@styles': 'src/styles'
            }
        },
        module: {
            rules: [{
                test: /\.(scss|css)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }, {
                    loader: "sass-loader"
                }]
            }, {
                test: /\.tsx?$|\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }, {
                    loader: 'ts-loader'
                }]
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, 'template/index.html')
            })
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
                        priority: -10
                    },
                    default: {
                        minChunks: 3,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    }
}
