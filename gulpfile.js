const webpack = require('webpack')
const getConfig = require('./webpack.config.js')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const gulp = require('gulp')
const path = require('path')
const rimraf = require('rimraf')
const tslint = require('gulp-tslint')

function clearConsole() {
    process.stdout.write(
        process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
    );
}

function start(compiler) {
    const devServer = new WebpackDevServer(compiler, {
        contentBase: path.resolve(__dirname, '')
    }).listen(8000, '127.0.0.1', () => {
        console.log(chalk.bgGreen(`Webpack Server running on port: ${chalk.red(8000)}`))
    });
    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
        process.on(sig, function () {
            devServer.close();
            process.exit();
        });
    });
    return devServer
}

gulp.task('dev', () => {
    const compiler = webpack(getConfig())
    clearConsole()
    start(compiler)
    // gulp.watch(["src/**/*"], {
    //     delay: 3000
    // }, (done) => {
    //     console.log(chalk.bgYellowBright("重新编译中..."))
    //     compiler.run((err, stat) => {
    //         if (err) {
    //             console.log(chalk.bgRedBright("编译出错"))
    //             throw err
    //         } else {
    //             console.log(chalk.bgGreenBright("编译完成"))
    //         }
    //         clearConsole()
    //         done();
    //     })
    // });
})


gulp.task('build', () => {
    rimraf.sync('dist', ['rmdir'])
    webpack(getConfig(), (err) => {
        if (err) {
            console.log(chalk.bgCyan('webpack 编译出错'))
        }
        process.exit()
    })
})

gulp.task('lint', async () => {
    await gulp.src(['src/**/*.tsx', 'src/**/*.ts']).pipe(tslint({
        formatter: 'verbose'
    })).pipe(tslint.report({
        summarizeFailureOutput: true
    }))
})
