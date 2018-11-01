'use strict';

//----------------------------------------
// load modules

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var tap = require('gulp-tap');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');

//----------------------------------------
// load settings

var config = require('./config.json');

var srcRoot = config.path.srcRoot;
var deployRoot = config.path.deployRoot;
var testRoot = config.path.testRoot;
var createDirectory = config.option.createProjectDirectory;
var projects = config.projects;
var typeScriptOptions = config.typeScript;

//----------------------------------------
// define functions

function getTypescriptOptions(declaration, outFile) {
	var option = {
		declaration: declaration,
		removeComments: true,
		'typeRoots': ['node_modules/@types/']
	};
	if (typeScriptOptions.target) {
		option.target = typeScriptOptions.target;
	}
	if (typeScriptOptions.lib) {
		option.lib = typeScriptOptions.lib;
	}
	if (typeScriptOptions.types) {
		option.types = typeScriptOptions.types;
	}
	if (outFile) {
		option.outFile = outFile;
	}
	return option;
}

function registerTask(taskName, srcPaths, getCommands) {
	gulp.task(taskName, function() {
		return gulp.src(srcPaths)
			.pipe(plumber())
			.pipe(tap(function (file, t) {
				var names = file.path.split('/');
				var fileName = names[names.length - 1].split(".")[0];
				var srcIndex = names.lastIndexOf('src');
				var outDirectory = createDirectory ? (deployRoot + '/' + names.slice(srcIndex + 1, names.length - 1).join('/')) : deployRoot;
				// create pipeline
				var commands = getCommands(fileName);
				var pipeline = gulp.src(file.path);
				pipeline = pipeline.pipe(plumber());
				for (var i = 0; i < commands.length; ++i) {
					pipeline = pipeline.pipe(commands[i]);
				}
				pipeline = pipeline.pipe(gulp.dest(outDirectory));
				return pipeline;
			}));
	});
}

function registerProject(project) {
	console.log('    + ' + project);
	var projectSrc = srcRoot + '/' + project;

	registerTask(project + '-compile', [projectSrc + '/include.ts'], function (fileName) {
		return [
			sourcemaps.init('./'),
			typescript(getTypescriptOptions(true, project + '.js')),
			sourcemaps.write('./')
		]
	});

	registerTask(project + '-compile-min', [projectSrc + '/include.ts'], function (fileName) {
		return [
			sourcemaps.init('./'),
			typescript(getTypescriptOptions(false, project + '.min.js')),
			uglify(),
			sourcemaps.write('./')
		];
	});

	gulp.task(project + '-watch', function() {
		gulp.watch(projectSrc + '/**/*.ts', gulp.series([project + '-compile', project + '-compile-min']));
	});
}

function run() {
	console.log('register projects');

	var defaultTasks = [];
	for (var i = 0; i < projects.length; ++i) {
		var project = projects[i];
		registerProject(project);
		defaultTasks.push(project + '-watch');
	}

	gulp.task('test-compile', function () {
		return gulp.src([testRoot + '/**/*.ts'])
			.pipe(plumber())
			.pipe(sourcemaps.init('./'))
			.pipe(typescript(getTypescriptOptions(false, null)))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(testRoot));
	});
	gulp.task('test-watch', function () {
		gulp.watch(testRoot + '/**/*.ts', gulp.series(['test-compile']));
	});
	defaultTasks.push('test-watch');

	gulp.task('default', gulp.parallel(defaultTasks));
}

//----------------------------------------
run();
