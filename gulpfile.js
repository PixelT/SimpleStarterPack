const $ = require('gulp-load-plugins')({'pattern': '*'});
const isDev = process.argv[process.argv.length - 1] === 'dev';
const port = ($.yargs.argv.port) ? $.yargs.argv.port : 3000;
const proxy = ($.yargs.argv.proxy) ? $.yargs.argv.proxy : false;

let folderPath = (process.platform === 'darwin') ? __dirname.split('/') : __dirname.split('\\');
    folderPath = folderPath[folderPath.length-1].replace(/([A-Z:\\]*[_]+)/g, '');

$.gulp.task('browserSync', () => {
    return $.browserSync.init({
        proxy: proxy || folderPath + '.test',
        port: port,
        notify: true,
        open: false
    });
});

$.gulp.task('compileScss', () => {
    return $.gulp.src('src/scss/style.scss')
	.pipe($.plumber({
		errorHandler (err) {
			$.notify.onError({
				title: (err) => `${err.file.replace(`${process.cwd()}/`, '')}:${err.line}:${err.column}`,
				message: (err) => err.messageOriginal.trim(),
				icon: $.path.join(__dirname, ".vscode/icons/icon-sass.png"),
				sound: 'Frog',
			})(err)
			this.emit('end');
		}
	}))
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.autoprefixer())
    .pipe($.if(isDev, $.sourcemaps.write()))
    .pipe($.gulp.dest('dist/css'))
    .pipe($.browserSync.stream({ match: '**/*.css' }))
});

$.gulp.task('compileJs', () => {
    return $.gulp.src('src/js/**/*.js')
	.pipe($.plumber({
		errorHandler (err) {
			$.notify.onError({
				title: (err) => `${err.fileName.replace(`${process.cwd()}/`, '')}:${err.loc.line}:${err.loc.column}`,
				message: (err) => `${err.message.split('\n')[0].replace(`${err.fileName}: `, '')}`.trim(),
				icon: $.path.join(__dirname, ".vscode/icons/icon-js.png"),
				sound: 'Frog',
			})(err)
			this.emit('end');
		}
	}))
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.babel({
        presets: ['@babel/env']
    }))
    .pipe($.uglify())
    .pipe($.if(isDev, $.sourcemaps.write()))
    .pipe($.gulp.dest('dist/js'))
    .pipe($.browserSync.stream({match: '**/*.js'}))
});

$.gulp.task('optimizeImages', () => {
    return $.gulp.src('src/images/**/*.{png,gif,jpg}')
    .pipe($.plumber())
    .pipe($.imagemin({
        verbose: true
    }))
    .pipe($.gulp.dest('dist/images'))
    .pipe($.browserSync.stream({match: '**/*.{png,gif,jpg}'}))
});

$.gulp.task('optimizeSVG', () => {
    return $.gulp.src('src/images/**/*.svg')
    .pipe($.plumber())
    .pipe($.svgmin())
    .pipe($.gulp.dest('dist/images'))
    .pipe($.browserSync.stream({match: '**/*.svg'}))
})

$.gulp.task('watch', $.gulp.parallel(['browserSync'], () => {
    $.gulp.watch(['**/*.php', '**/*.html'], {cwd:'./'}).on('change', $.browserSync.reload);
    $.gulp.watch('src/js/**/*.js', {cwd: './'}, $.gulp.parallel(['compileJs']));
    $.gulp.watch('src/scss/**/*.scss', {cwd: './'}, $.gulp.parallel(['compileScss']));
    $.gulp.watch('src/images/**/*.{png,gif,jpg}', {cwd: './'}, $.gulp.parallel(['optimizeImages']));
    $.gulp.watch('src/images/**/*.svg', {cwd: './'}, $.gulp.parallel(['optimizeSVG']));
}));

$.gulp.task('dev', $.gulp.series('compileScss', 'compileJs', $.gulp.parallel('optimizeImages', 'optimizeSVG'), 'watch'));
$.gulp.task('build', $.gulp.series('compileScss', 'compileJs', $.gulp.parallel('optimizeImages', 'optimizeSVG')));

$.gulp.task('default', $.gulp.series(['build']));