'use strict';

//----------------------------------------
var SRC_DIR = '../src';
var DST_DIR = '../lib';
var TEST_DIR = '../test';

var SRC_FILENAME = 'include';
var DST_FILENAME = 'alumican';

//----------------------------------------
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

//----------------------------------------
function typescriptOptions(declaration, outFile) {
	var option = {
		declaration: declaration,
		removeComments: true,
		target: 'ES5',
		'lib': ['es6', 'dom'],
		'typeRoots': ['node_modules/@types/'],
		'types': ['jquery', 'three']
	};
	if (outFile) {
		option.outFile = outFile;
	}
	return option;
}

gulp.task('compile', function() {
	return gulp.src([SRC_DIR + '/' + SRC_FILENAME + '.ts'])
		.pipe(plumber())
		.pipe(sourcemaps.init('./'))
		.pipe(typescript(typescriptOptions(true, DST_FILENAME + '.js')))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DST_DIR));
});

gulp.task('compile-min', function() {
	return gulp.src([SRC_DIR + '/' + SRC_FILENAME + '.ts'])
		.pipe(plumber())
		.pipe(sourcemaps.init('./'))
		.pipe(typescript(typescriptOptions(false, DST_FILENAME + '.min.js')))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DST_DIR));
});

gulp.task('compile-test', function() {
	return gulp.src([TEST_DIR + '/**/*.ts'])
		.pipe(plumber())
		.pipe(sourcemaps.init('./'))
		.pipe(typescript(typescriptOptions(false, null)))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(TEST_DIR));
});

//----------------------------------------
gulp.task('watch', function() {
	gulp.watch(SRC_DIR + '/**/*.ts', gulp.series(['compile', 'compile-min']));
	gulp.watch(TEST_DIR + '/**/*.ts', gulp.series(['compile-test']));
});

//----------------------------------------
gulp.task('default', gulp.parallel(['compile', 'compile-min', 'compile-test', 'watch']));