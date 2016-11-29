var gulp            = require('gulp'),
    plumberNotifier = require('gulp-plumber-notifier'),
    sass            = require('gulp-sass'),
    jade            = require('gulp-jade'),
    browserSync     = require('browser-sync'),
    concatCss       = require('gulp-concat-css'),
    svgmin          = require('gulp-svgmin'),
    svgSprite       = require('gulp-svg-sprite'),
	  cheerio         = require('gulp-cheerio'),
	  replace         = require('gulp-replace'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('jade',function(){
    return gulp.src('./app/jade/*.jade')
           .pipe(plumberNotifier())
           .pipe(jade({
           	pretty: true
           }))
           .pipe(gulp.dest('app/'));
});
gulp.task('sass',function(){
    return gulp.src([
    	'./app/scss/main.scss',
    	'app/scss/awsome/font-awesome.scss',
      'app/scss/animate/animate.scss'
    	])
      .pipe(plumberNotifier())
      .pipe(sass())
      .pipe(autoprefixer(['last 40 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(concatCss("main.css"))
      .pipe(gulp.dest('app/css/'))
      .pipe(browserSync.reload({stream: true}));
});
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});
gulp.task('scripts', function() {
    return gulp.src('app/concal js/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});
gulp.task('svgSpriteBuild', function () {
	var svg_config = {
	shape : {
		id : {
			generator : "icon-%s"
		}
	},
	mode : {
		symbol : {
			prefix : "%s",
			sprite : "bg-sprite.svg",
			render : { scss : true },
			example : true
		}
	}
};
	return gulp.src('app/img/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(svgSprite(svg_config))
		.pipe(gulp.dest('app/sprite/'));
});
gulp.task('watch', ['scripts','sass', 'jade','browser-sync'], function() {
    gulp.watch('app/scss/main.scss', ['sass']);
    gulp.watch('app/jade/*.jade', ['jade']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
    gulp.watch('./app/concal js/*.js',['scripts']);
});
gulp.task('default',['watch'], function() {

});
