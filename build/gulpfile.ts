'use strict';

import {Gulp} from "gulp";

type GulpModule = any;
type GetCommandsFunction = (srcFileName:string, dstFileName:string) => any[];

type Mapping = { src:string, dst:string };
type Project = { name:string, ts?:Mapping[], scss?:Mapping[], ejs?:Mapping[], html?:Mapping[], php?:Mapping[], static?:Mapping[] };
type ProjectDefault = { ts?:Mapping[], scss?:Mapping[], ejs?:Mapping[], html?:Mapping[], php?:Mapping[], static?:Mapping[] };
type Projects = Project[];
type Path = { src:string, dst:string };
type Config = { projects:Projects, default:ProjectDefault, path:Path, typeScriptOptions?:any, sassOptions?:any, autoprefixerOptions?:any, server?:any };





//----------------------------------------
// load modules

// common
const gulp:Gulp = require('gulp');
const plumber:GulpModule = require('gulp-plumber');
const sourcemaps:GulpModule = require('gulp-sourcemaps');

// TypeScript
const typescript:GulpModule = require('gulp-typescript');
const uglify:GulpModule = require('gulp-uglify');

// Sass
const sass:GulpModule = require('gulp-sass');
const cleanCss:GulpModule = require('gulp-clean-css');
const rename:GulpModule = require('gulp-rename');
const autoprefixer = require("gulp-autoprefixer");

// EJS
const ejs:GulpModule = require('gulp-ejs');

// HTML
const removeEmptyLines:GulpModule = require('gulp-remove-empty-lines');
const stripComments:GulpModule = require('gulp-strip-comments');

// static
const changed:GulpModule = require('gulp-changed');

// Server
const connect:GulpModule = require('gulp-connect');





//----------------------------------------
// load settings

const config:Config = require('./config.json');
const projects:Projects = config.projects;
const projectDefault:ProjectDefault = config.default || {};
const path:Path = config.path;

function getOption(option:any, key:string, defaultValue:any):any {
	return typeof option[key] !== 'undefined' ? option[key] : defaultValue;
}

// check TypeScript option
const typeScriptOptions:any = config.typeScriptOptions || {};

typeScriptOptions.removeComments = getOption(typeScriptOptions, 'removeComments', true);

typeScriptOptions.typeRoots = getOption(typeScriptOptions, 'typeRoots', []);
typeScriptOptions.typeRoots = ['build/node_modules/@types'].concat(typeScriptOptions.typeRoots);
typeScriptOptions.typeRoots = typeScriptOptions.typeRoots.map(function(value:string):string { return '../' + value; });

//delete typeScriptOptions.types;

const typeScriptOptionMinify:boolean = getOption(typeScriptOptions, 'minify', false);
delete typeScriptOptions.minify;

const typeScriptOptionMinifyOnly:boolean = getOption(typeScriptOptions, 'minifyOnly', false);
delete typeScriptOptions.minifyOnly;

const typeScriptOptionSourceMap:boolean = getOption(typeScriptOptions, 'sourceMap', false);
delete typeScriptOptions.sourceMap;

const typeScriptOptionDeclaration:boolean = getOption(typeScriptOptions, 'declaration', false);
delete typeScriptOptions.declaration;

// check Sass option
const sassOptions:any = config.sassOptions || {};

const sassOptionMinify:boolean = getOption(sassOptions, 'minify', false);
delete sassOptions.minify;

const sassOptionMinifyOnly:boolean = getOption(sassOptions, 'minifyOnly', false);
delete sassOptions.minifyOnly;

const sassOptionSourceMap:boolean = getOption(sassOptions, 'sourceMap', false);
delete sassOptions.sourceMap;

// check Autoprefixer option
const autoprefixerOptions:any = config.autoprefixerOptions;
if (autoprefixerOptions) {
	delete autoprefixerOptions.browsers;
}




//----------------------------------------
// define functions

const defaultTaskNames:string[] = [];
const watchTaskNames:string[] = [];
let allTypeScriptTaskNames:string[] = [];
let allSassTaskNames:string[] = [];
let allEjsTaskNames:string[] = [];
let allHtmlTaskNames:string[] = [];
let allPhpTaskNames:string[] = [];
let allStaticTaskNames:string[] = [];

const indent:string = '           ';
const color:any = {
	default: '\u001b[39m',

	black  : '\u001b[30m',
	red    : '\u001b[31m',
	green  : '\u001b[32m',
	yellow : '\u001b[33m',
	blue   : '\u001b[34m',
	magenta: '\u001b[35m',
	cyan   : '\u001b[36m',
	white  : '\u001b[37m',

	lightGray   : '\u001b[90m',
	lightRed    : '\u001b[91m',
	lightGreen  : '\u001b[92m',
	lightYellow : '\u001b[93m',
	lightBlue   : '\u001b[94m',
	lightMagenta: '\u001b[95m',
	lightCyan   : '\u001b[96m',

	reset : '\u001b[0m'
};

function createPath(...names:string[]):string {
	return names.filter(function(value:string):boolean {
		return value != '';
	}).join('/');
}

function getTypescriptOptions(outputFileName:string, minify:boolean):any {
	if (minify) {
		typeScriptOptions.outFile = outputFileName.replace(/js$/, 'min.js');
		typeScriptOptions.declaration = false;
		typeScriptOptions.declarationMap = false;
	} else {
		typeScriptOptions.outFile = outputFileName;
		typeScriptOptions.declaration = typeScriptOptionDeclaration;
		typeScriptOptions.declarationMap = false;
	}
	return typeScriptOptions;
}

function getBaseName(fileName:string):string {
	const s = fileName.split('.');
	s.pop();
	return s.join('.');
}

function registerTask(taskName:string, projectName:string, srcExt:string, dstExt:string, map:Mapping, getExecutionCommands:GetCommandsFunction) {
	const srcPath:string = createPath('..', path.src, projectName, map.src) + (srcExt != '' ? ('.' + srcExt) : '');
	const dstPath:string = createPath('..', path.dst, projectName, map.dst) + (dstExt != '' ? ('.' + dstExt) : '');

	const srcFileName:string = srcPath.split('/').pop();

	const dstPaths:string[] = dstPath.split('/');
	const dstFileName:string = dstPaths.pop();
	let dstDirectory:string = dstPaths.join('/');

	// dst path is  directory
	if (dstExt == '') {
		dstDirectory += '/' + dstFileName;
	}

	gulp.task(taskName, function() {
		let pipeline:any = gulp
			.src(srcPath, { allowEmpty: true })
			.pipe(plumber());

		console.log(indent + 'Compiling \'' + color.blue + srcPath + color.reset + '\'' + color.lightGray + ' -> ' + color.reset + '\'' + color.blue + dstPath + color.reset + '\'');

		// execution
		const commands:any[] = getExecutionCommands(srcFileName, dstFileName);
		for (let i:number = 0; i < commands.length; ++i) {
			pipeline = pipeline.pipe(commands[i]);
		}

		// output
		pipeline = pipeline.pipe(gulp.dest(dstDirectory));

		// livereload
		if (config.server && config.server.livereload) {
			pipeline = pipeline.pipe(connect.reload());
		}

		return pipeline;
	});

	defaultTaskNames.push(taskName);
}

function registerTypeScript(projectName:string, map:Mapping, index:number, minify:boolean):string {
	const taskName:string = projectName + '-typescript-' + index + (minify ? '-min' : '');
	registerTask(taskName, projectName, 'ts', 'js', map, function(srcFileName:string, dstFileName:string):any[] {
		const commands:any[] = [];

		if (typeScriptOptionSourceMap) {
			commands.push(sourcemaps.init('./'));
		}

		commands.push(typescript(getTypescriptOptions(dstFileName, minify)));

		if (minify) {
			commands.push(uglify());
		}

		if (typeScriptOptionSourceMap) {
			commands.push(sourcemaps.write('./'));
		}

		return commands;
	});
	return taskName;
}

function registerSass(projectName:string, map:Mapping, index:number, minify:boolean):string {
	const taskName:string = projectName + '-sass-' + index + (minify ? '-min' : '');
	registerTask(taskName, projectName, 'scss', 'css', map, function(srcFileName:string, dstFileName:string):any[] {
		const commands:any[] = [];

		if (sassOptionSourceMap) {
			commands.push(sourcemaps.init('./'));
		}

		commands.push(sass(sassOptions).on('error', sass.logError));

		commands.push(rename(function (path) {
			path.basename = getBaseName(dstFileName);
		}));

		if (autoprefixerOptions) {
			commands.push(autoprefixer(autoprefixerOptions));
		}

		if (minify) {
			commands.push(rename({ extname: '.min.css' }));
			commands.push(cleanCss());
		}

		if (sassOptionSourceMap) {
			commands.push(sourcemaps.write('./'));
		}
		return commands;
	});
	return taskName;
}

function registerEjs(projectName:string, map:Mapping, index:number):string {
	const taskName:string = projectName + '-ejs-' + index;
	const dstExt = getOption(map, 'ext', 'html');
	registerTask(taskName, projectName, 'ejs', dstExt, map, function(srcFileName:string, dstFileName:string):any[] {
		return [
			ejs(),
			removeEmptyLines({ removeComments: false, removeSpaces: false }),
			stripComments({ safe: true }),
			rename(function (path) {
				path.basename = getBaseName(dstFileName);
				path.extname = '.' + dstExt;
			})
		];
	});
	return taskName;
}

function registerHtml(projectName:string, map:Mapping, index:number):string {
	const taskName:string = projectName + '-html-' + index;
	registerTask(taskName, projectName, 'html', 'html', map, function(srcFileName:string, dstFileName:string):any[] {
		return [
			removeEmptyLines({ removeComments: false, removeSpaces: false }),
			stripComments({ safe: true }),
			rename(function (path) {
				path.basename = getBaseName(dstFileName);
			})
		];
	});
	return taskName;
}

function registerPhp(projectName:string, map:Mapping, index:number):string {
	const taskName:string = projectName + '-php-' + index;
	registerTask(taskName, projectName, 'php', 'php', map, function(srcFileName:string, dstFileName:string):any[] {
		return [
			removeEmptyLines({ removeComments: false, removeSpaces: false }),
			stripComments({ safe: true }),
			rename(function (path) {
				path.basename = getBaseName(dstFileName);
			})
		];
	});
	return taskName;
}

function registerStatic(projectName:string, map:Mapping, index:number):string {
	const taskName:string = projectName + '-static-' + index;
	registerTask(taskName, projectName, '', '', map, function(srcFileName:string, dstFileName:string):any[] {
		return [
			changed(dstFileName)
		];
	});
	return taskName;
}

function registerProject(project:Project):void {
	const projectName:string = project.name;
	console.log(indent + '    + \'' + color.blue + projectName + color.reset + '\'');

	// ts
	const typeScriptTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.ts || projectDefault.ts;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				let taskName:string;

				if (!typeScriptOptionMinify || !typeScriptOptionMinifyOnly) {
					taskName = registerTypeScript(projectName, maps[i], i, false);
					typeScriptTaskNames.push(taskName);
				}

				if (typeScriptOptionMinify) {
					taskName = registerTypeScript(projectName, maps[i], i, true);
					typeScriptTaskNames.push(taskName);
				}
			}
		}
	}

	// scss
	const sassTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.scss || projectDefault.scss;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				let taskName:string;

				if (!sassOptionMinify || !sassOptionMinifyOnly) {
					taskName = registerSass(projectName, maps[i], i, false);
					sassTaskNames.push(taskName);
				}

				if (sassOptionMinify) {
					taskName = registerSass(projectName, maps[i], i, true);
					sassTaskNames.push(taskName);
				}
			}
		}
	}

	// ejs
	const ejsTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.ejs || projectDefault.ejs;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				const taskName:string = registerEjs(projectName, maps[i], i);
				ejsTaskNames.push(taskName);
			}
		}
	}

	// html
	const htmlTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.html || projectDefault.html;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				const taskName:string = registerHtml(projectName, maps[i], i);
				htmlTaskNames.push(taskName);
			}
		}
	}

	// php
	const phpTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.php || projectDefault.php;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				const taskName:string = registerPhp(projectName, maps[i], i);
				phpTaskNames.push(taskName);
			}
		}
	}

	// static
	const staticTaskNames:string[] = [];
	const staticTaskSources:string[] = [];
	{
		const maps:Mapping[] = project.static || projectDefault.static;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				const taskName:string = registerStatic(projectName, maps[i], i);
				staticTaskSources.push(maps[i].src);
				staticTaskNames.push(taskName);
			}
		}
	}

	const projectTaskNames:string[] = [].concat(typeScriptTaskNames, sassTaskNames, htmlTaskNames, phpTaskNames);
	gulp.task('project-' + projectName, gulp.parallel(projectTaskNames));

	const taskName:string = projectName + '-watch';
	const projectSrc:string = createPath('..', path.src, projectName);
	gulp.task(taskName, function():void {
		if (typeScriptTaskNames.length > 0) {
			gulp.watch(projectSrc + '/**/*.ts', gulp.series(typeScriptTaskNames));
		}
		if (sassTaskNames.length > 0) {
			gulp.watch(projectSrc + '/**/*.scss', gulp.series(sassTaskNames));
		}
		if (ejsTaskNames.length > 0) {
			gulp.watch(projectSrc + '/**/*.ejs', gulp.series(ejsTaskNames));
		}
		if (htmlTaskNames.length > 0) {
			gulp.watch(projectSrc + '/**/*.html', gulp.series(htmlTaskNames));
		}
		if (phpTaskNames.length > 0) {
			gulp.watch(projectSrc + '/**/*.php', gulp.series(phpTaskNames));
		}
		if (staticTaskNames.length > 0) {
			for (let i = 0; i < staticTaskNames.length; ++i) {
				gulp.watch(projectSrc + staticTaskSources[i], gulp.series(staticTaskNames[i]));
			}
		}
	});
	watchTaskNames.push(taskName);

	allTypeScriptTaskNames = allTypeScriptTaskNames.concat(typeScriptTaskNames);
	allSassTaskNames = allSassTaskNames.concat(sassTaskNames);
	allEjsTaskNames = allEjsTaskNames.concat(ejsTaskNames);
	allHtmlTaskNames = allHtmlTaskNames.concat(htmlTaskNames);
	allPhpTaskNames = allPhpTaskNames.concat(phpTaskNames);
	allStaticTaskNames = allStaticTaskNames.concat(staticTaskNames);
}

function registerServer():void {
	const option:any = config.server;
	if (option) {
		option.root = '../' + path.dst;
		option.host = getOption(option, 'host', 'localhost');
		option.port = getOption(option, 'port', 8000);
		option.livereload = getOption(option, 'livereload', true);

		console.log(indent + 'Starting server');
		gulp.task('server', function():void {
			connect.server(option);
		});
		watchTaskNames.push('server');
	}
}

function run():void {
	registerServer();

	console.log(indent + 'Registering projects');
	for (let i:number = 0; i < projects.length; ++i) {
		registerProject(projects[i]);
	}

	gulp.task('watch', gulp.parallel(watchTaskNames));
	gulp.task('default', gulp.parallel(defaultTaskNames));

	if (allTypeScriptTaskNames.length > 0) {
		gulp.task('ts', gulp.parallel(allTypeScriptTaskNames));
	}
	if (allSassTaskNames.length > 0) {
		gulp.task('scss', gulp.parallel(allSassTaskNames));
	}
	if (allEjsTaskNames.length > 0) {
		gulp.task('ejs', gulp.parallel(allEjsTaskNames));
	}
	if (allHtmlTaskNames.length > 0) {
		gulp.task('html', gulp.parallel(allHtmlTaskNames));
	}
	if (allPhpTaskNames.length > 0) {
		gulp.task('php', gulp.parallel(allPhpTaskNames));
	}
	if (allStaticTaskNames.length > 0) {
		gulp.task('static', gulp.parallel(allStaticTaskNames));
	}
}

//----------------------------------------
run();
