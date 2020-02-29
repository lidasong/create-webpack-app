const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: "development",
    entry: './index.ts',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
        rules: [{
            test: /\.(scss|css|less)$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            },{
                loader: "less-loader"
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
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'template/index.html')
    })],
    optimization: {
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

module.exports = { config }