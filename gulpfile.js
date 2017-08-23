var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer'),
	rimraf = require('gulp-rimraf');

var CLEAN_DIST = 'dist',
	ROOT_SRC = 'src',
	ROOT_DIST = CLEAN_DIST  + '';
	;

var path = {
	'html':{
		'src': 'src/*.html',
		'dist': CLEAN_DIST
	},
	'css':{
		'src': ROOT_SRC + '/css/*.css',
		'dist': ROOT_DIST + '/css'
	},
	'sass':{
		'src': ROOT_SRC + '/sass/*.scss',
		'dist': ROOT_DIST + '/css'
	},
	'js':{
		'src': ROOT_SRC + '/js/*.js',
		'dist': ROOT_DIST + '/js'
	},
	'fonts':{
		'src': ROOT_SRC + '/fonts/*',
		'dist': ROOT_DIST + '/fonts'
	},
	'images':{
		'src': [ROOT_SRC + '/images/**/*.{png,jpg}' , ROOT_SRC + '/images/*.{png,jpg}'],
		'dist': ROOT_DIST + '/images'
	}
}

gulp.task('runJs', function(){
	gulp.src(path.js.src)
		.pipe(gulp.dest(path.js.dist))
		.pipe(connect.reload())
});

gulp.task('runSass', function () {
	gulp.src(path.sass.src)
	  	.pipe(sourcemaps.init())
	    .pipe(sass({outputStyle: 'compact'}).on('error',sass.logError))
	    .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
	    .pipe(sourcemaps.write('../css'))
	    .pipe(gulp.dest(path.css.dist))
	    .pipe(connect.reload())
});

gulp.task('runHtml', function(){
	gulp.src(path.html.src)
		.pipe(gulp.dest(path.html.dist))
		.pipe(connect.reload())
});


gulp.task('runFonts', function(){
	gulp.src(path.fonts.src)
		.pipe(gulp.dest(path.fonts.dist))
});


gulp.task('runImage', function(){
	gulp.src(path.images.src)
		.pipe(gulp.dest(path.images.dist))
})


gulp.task('clean', function(){
	gulp.src(CLEAN_DIST, { read: false })
		.pipe(rimraf())
})

gulp.task('runConnect', function(){
	connect.server({
		livereload:true
	});
});


gulp.task('watch', function(){
	gulp.watch(path.html.src, ['runHtml']);
	gulp.watch(path.sass.src, ['runSass']);
	gulp.watch(path.js.src, ['runJs']);
	gulp.watch(path.images.src, ['runImage']);
})


gulp.task('default',['runJs','runSass','runHtml','runFonts','runImage','runConnect','watch'])