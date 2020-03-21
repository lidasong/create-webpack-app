const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const tslint = require('gulp-tslint');
const getConfig = require('./webpack.config.js');

const port = process.env.PORT;

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
}

function start(compiler) {
  const devServer = new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, ''),
  }).listen(port || 8000, '127.0.0.1', () => {
    process.stdout(chalk.bgGreen(`Webpack Server running on port: ${chalk.red(port || 8000)}`));
  });
  ['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
  return devServer;
}

gulp.task('dev', () => {
  const compiler = webpack(getConfig());
  clearConsole();
  start(compiler);
});


gulp.task('build', (call) => {
  rimraf.sync('dist', ['rmdir']);
  webpack(getConfig(), (err) => {
    if (err) {
      process.stdout(chalk.bgCyan('webpack 编译出错'));
    }
    call();
    process.exit();
  });
});

gulp.task('lint', async () => {
  await gulp.src(['src/**/*.tsx', 'src/**/*.ts']).pipe(tslint({
    formatter: 'verbose',
  })).pipe(tslint.report({
    summarizeFailureOutput: true,
  }));
});
