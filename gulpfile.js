const webpack = require('webpack')
const { config } = require('./webpack.config.js')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const gulp = require('gulp')
const path = require('path')

const compiler = webpack(config, (err) => {
    if (err) {
        console.log(chalk.bgCyan('webpack 编译出错'))
    }
})


gulp.task('dev', () => {
    new WebpackDevServer(compiler, {
        contentBase: path.resolve(__dirname, ''),
        liveReload: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }).listen(8000, '127.0.0.1', () => {
        console.log(chalk.bgGreen(`Webpack Server running on port: ${chalk.red(8000)}`))
    })
})

gulp.watch(["src/**/*"], {
    delay: 3000
}, (done) => {
    console.log(chalk.bgYellowBright("重新编译中..."))
    compiler.run((err, stat) => {
        if(err) {
            console.log(chalk.bgRedBright("编译出错"))
        }else {
            console.log(chalk.bgGreenBright("编译完成"))
        }
        done();
    })
});
