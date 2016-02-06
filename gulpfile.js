var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var node = require('node-dev');
var source = require('vinyl-source-stream');
var babel = require('babel-core/register');
var gutil = require('gulp-util');

function errorHandler(err) {
  console.log('Error: ' + err.message);
}

// 自動ブラウザリロード
gulp.task('browser-sync', function() {
  browserSync({
    proxy: {
      target: 'http://localhost:3000'
    },
    port: 8081
  });
});

// Javascriptへのビルド
// ES6かつJSXなファイル群をbuild/bundle.jsへ変換する
gulp.task('build', function() {
  browserify({entries: ['./src/index.js']})
    .transform(babelify)
    .bundle()
    .on('error', errorHandler)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream: true}));
});

// ローカルサーバーの起動
gulp.task('server', function() {
  node('./server.js', [], []);
});

gulp.task('mocha', function(){
  return gulp.src(['./test/**/*-spec.js'], { read: true })
    .pipe(mocha({ reporter: 'list', compilers: {js: babel}, globals: {env: require('./tools/dom.js')} }))
    .on('error', gutil.log);
})

gulp.task('lint', function(){
  var eslint = require('gulp-eslint');
  return gulp.src('./src/**/*.js')
              .pipe( eslint({ useEslintrc: true }) )
              .pipe( eslint.format() )
              .pipe( eslint.failOnError() )
});


// ファイル監視
// ファイルに更新があったらビルドしてブラウザをリロードする
gulp.task('watch', function() {
  gulp.watch('./src/index.js', ['build']);
  gulp.watch('./index.html', ['build']);
  gulp.watch('./src/components/*.js', ['build']);
});

// gulpコマンドで起動したときのデフォルトタスク
gulp.task('default', ['server', 'build', 'watch', 'lint', 'mocha','browser-sync']);