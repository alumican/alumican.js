'use strict';

import {Gulp} from "gulp";

type GulpModule = any;
type GetCommandsFunction = (srcFileName:string, dstFileName:string) => any[];

type Mapping = { src:string, dst:string, watch?:string|string[] };

type Path = { src:string, dst:string };
type OptionalPath = { src?:string, dst?:string };

type Project = { name?:string, path?:OptionalPath, ts?:Mapping[], scss?:Mapping[], ejs?:Mapping[], html?:Mapping[], php?:Mapping[], static?:Mapping[] };
type ProjectDefault = { ts?:Mapping[], scss?:Mapping[], ejs?:Mapping[], html?:Mapping[], php?:Mapping[], static?:Mapping[] };
type Projects = Project[];

type Config = { projects:Projects, default:ProjectDefault, path:Path, typeScriptOptions?:any, sassOptions?:any, autoprefixerOptions?:any, htmlOptions?:any, phpOptions?:any, ejsOptions?:any, server?:any };

type TaskRegisterInfo = { name:string, globs:string[] };





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
const sass:GulpModule = require('gulp-sass')(require('sass'));
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

// check HTML option
const htmlOptions:any = config.htmlOptions || {};

// check php option
const phpOptions:any = config.phpOptions || {};

// check ejs option
const ejsOptions:any = config.ejsOptions || {};





//----------------------------------------
// define functions

const watchTaskNames:string[] = [];
let allTaskNames:string[] = [];
let allTypeScriptTaskNames:string[] = [];
let allSassTaskNames:string[] = [];
let allEjsTaskNames:string[] = [];
let allHtmlTaskNames:string[] = [];
let allPhpTaskNames:string[] = [];
let allStaticTaskNames:string[] = [];

const indent:string = '		   ';
const color:any = {
	default: '\u001b[39m',

	black  : '\u001b[30m',
	red	: '\u001b[31m',
	green  : '\u001b[32m',
	yellow : '\u001b[33m',
	blue   : '\u001b[34m',
	magenta: '\u001b[35m',
	cyan   : '\u001b[36m',
	white  : '\u001b[37m',

	lightGray   : '\u001b[90m',
	lightRed	: '\u001b[91m',
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

function registerTask(taskName:string, map:Mapping, srcExt:string, dstExt:string, getExecutionCommands:GetCommandsFunction):TaskRegisterInfo {
	const srcPath:string = map.src + (srcExt != '' ? ('.' + srcExt) : '');
	const dstPath:string = map.dst + (dstExt != '' ? ('.' + dstExt) : '');

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

		console.log(indent + '🤖 Compiling \'' + color.blue + srcPath.slice(3) + color.reset + '\'' + color.lightGray + ' -> ' + color.reset + '\'' + color.blue + dstPath.slice(3) + color.reset + '\'');

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

	// create watch target
	let watchPath:string[];
	if (Array.isArray(map.watch)) {
		watchPath = map.watch;
	} else {
		watchPath = [map.watch || srcPath];
	}

	return { name: taskName, globs: watchPath };
}

function registerTypeScript(projectName:string, map:Mapping, index:number, minify:boolean):TaskRegisterInfo {
	const taskName:string = projectName + '-typescript-' + index + (minify ? '-min' : '');
	return registerTask(taskName, map, 'ts', 'js', function(srcFileName:string, dstFileName:string):any[] {
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
}

function registerSass(projectName:string, map:Mapping, index:number, minify:boolean):TaskRegisterInfo {
	const taskName:string = projectName + '-sass-' + index + (minify ? '-min' : '');
	return registerTask(taskName, map, 'scss', 'css', function(srcFileName:string, dstFileName:string):any[] {
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
}

function registerEjs(projectName:string, map:Mapping, index:number):TaskRegisterInfo {
	const taskName:string = projectName + '-ejs-' + index;
	const dstExt = getOption(map, 'ext', 'html');
	return registerTask(taskName, map, 'ejs', dstExt, function(srcFileName:string, dstFileName:string):any[] {
		const commands:any[] = [];
		commands.push(ejs());

		const useRemoveEmptyLines = ejsOptions.removeEmptyLines || true;
		const useRemoveComments = ejsOptions.removeComments || true;
		const useRemoveCommentsSafe = ejsOptions.removeCommentsSafe || true;
		const useRemoveSpaces = ejsOptions.removeSpaces || false;

		if (useRemoveEmptyLines) {
			commands.push(removeEmptyLines({ removeComments: false, removeSpaces: useRemoveSpaces }));
		}

		if (useRemoveComments || useRemoveCommentsSafe) {
			commands.push(stripComments({ safe: useRemoveCommentsSafe }));
		}

		commands.push(rename(function (path) {
			path.basename = getBaseName(dstFileName);
			path.extname = '.' + dstExt;
		}));

		return commands;
	});
}

function registerHtml(projectName:string, map:Mapping, index:number):TaskRegisterInfo {
	const taskName:string = projectName + '-html-' + index;
	return registerTask(taskName, map, 'html', 'html', function(srcFileName:string, dstFileName:string):any[] {
		const commands:any[] = [];

		const useRemoveEmptyLines = htmlOptions.removeEmptyLines || true;
		const useRemoveSpaces = htmlOptions.removeSpaces || false;
		if (useRemoveEmptyLines) {
			commands.push(removeEmptyLines({ removeComments: false, removeSpaces: useRemoveSpaces }));
		}

		const useRemoveComments = htmlOptions.removeComments || true;
		const useRemoveCommentsSafe = htmlOptions.removeCommentsSafe || true;
		if (useRemoveComments || useRemoveCommentsSafe) {
			commands.push(stripComments({ safe: useRemoveCommentsSafe }));
		}

		commands.push(rename(function (path) {
			path.basename = getBaseName(dstFileName);
		}));

		return commands;
	});
}

function registerPhp(projectName:string, map:Mapping, index:number):TaskRegisterInfo {
	const taskName:string = projectName + '-php-' + index;
	return registerTask(taskName, map, 'php', 'php', function(srcFileName:string, dstFileName:string):any[] {
		const commands:any[] = [];

		const useRemoveEmptyLines = phpOptions.removeEmptyLines || false;
		if (useRemoveEmptyLines) {
			commands.push(removeEmptyLines({ removeComments: false, removeSpaces: false }));
		}

		commands.push(rename(function (path) {
			path.basename = getBaseName(dstFileName);
		}));

		return commands;
	});
}

function registerStatic(projectName:string, map:Mapping, index:number):TaskRegisterInfo {
	const taskName:string = projectName + '-static-' + index;
	return registerTask(taskName, map, '', '', function(srcFileName:string, dstFileName:string):any[] {
		return [
			changed(dstFileName)
		];
	});
}

function registerProject(project:Project):void {
	const projectName:string = project.name || '';
	console.log(indent + '	+ \'' + color.blue + projectName + color.reset + '\'');

	const projectPath = project.path;
	const projectPathSrc = projectPath ? ((typeof projectPath.src !== 'undefined') ? projectPath.src : projectName) : projectName;
	const projectPathDst = projectPath ? ((typeof projectPath.dst !== 'undefined') ? projectPath.dst : projectName) : projectName;

	const srcDir = createPath('..', path.src, projectPathSrc);
	const dstDir = createPath('..', path.dst, projectPathDst);

	function resolvePath(map:Mapping):Mapping {
		return {
			src: createPath(srcDir, map.src),
			dst: createPath(dstDir, map.dst),
			watch: Array.isArray(map.watch) ? map.watch.map((value:string):string => { return createPath(srcDir, value); }) : ((typeof map.watch === 'string') ? createPath(srcDir, map.watch) : null),
		}
	}

	// ts
	const typeScriptTaskSources:string[][] = [];
	const typeScriptTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.ts || projectDefault.ts;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				let taskRegisterInfo:TaskRegisterInfo;

				if (!typeScriptOptionMinify || !typeScriptOptionMinifyOnly) {
					taskRegisterInfo = registerTypeScript(projectName, resolvePath(maps[i]), i, false);
					typeScriptTaskSources.push(taskRegisterInfo.globs);
					typeScriptTaskNames.push(taskRegisterInfo.name);
				}

				if (typeScriptOptionMinify) {
					taskRegisterInfo = registerTypeScript(projectName, resolvePath(maps[i]), i, true);
					typeScriptTaskSources.push(taskRegisterInfo.globs);
					typeScriptTaskNames.push(taskRegisterInfo.name);
				}
			}
		}
	}

	// scss
	const sassTaskSources:string[][] = [];
	const sassTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.scss || projectDefault.scss;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				let taskRegisterInfo:TaskRegisterInfo;

				if (!sassOptionMinify || !sassOptionMinifyOnly) {
					taskRegisterInfo = registerSass(projectName, resolvePath(maps[i]), i, false);
					sassTaskSources.push(taskRegisterInfo.globs);
					sassTaskNames.push(taskRegisterInfo.name);
				}

				if (sassOptionMinify) {
					taskRegisterInfo = registerSass(projectName, resolvePath(maps[i]), i, true);
					sassTaskSources.push(taskRegisterInfo.globs);
					sassTaskNames.push(taskRegisterInfo.name);
				}
			}
		}
	}

	// ejs
	const ejsTaskSources:string[][] = [];
	const ejsTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.ejs || projectDefault.ejs;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				const taskRegisterInfo = registerEjs(projectName, resolvePath(maps[i]), i);
				ejsTaskSources.push(taskRegisterInfo.globs);
				ejsTaskNames.push(taskRegisterInfo.name);
			}
		}
	}

	// html
	const htmlTaskSources:string[][] = [];
	const htmlTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.html || projectDefault.html;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				const taskRegisterInfo = registerHtml(projectName, resolvePath(maps[i]), i);
				htmlTaskSources.push(taskRegisterInfo.globs);
				htmlTaskNames.push(taskRegisterInfo.name);
			}
		}
	}

	// php
	const phpTaskSources:string[][] = [];
	const phpTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.php || projectDefault.php;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				const taskRegisterInfo = registerPhp(projectName, resolvePath(maps[i]), i);
				phpTaskSources.push(taskRegisterInfo.globs);
				phpTaskNames.push(taskRegisterInfo.name);
			}
		}
	}

	// static
	const staticTaskSources:string[][] = [];
	const staticTaskNames:string[] = [];
	{
		const maps:Mapping[] = project.static || projectDefault.static;
		if (maps) {
			for (let i:number = 0; i < maps.length; ++i) {
				const taskRegisterInfo = registerStatic(projectName, resolvePath(maps[i]), i);
				staticTaskSources.push(taskRegisterInfo.globs);
				staticTaskNames.push(taskRegisterInfo.name);
			}
		}
	}

	const projectTaskNames:string[] = [].concat(typeScriptTaskNames, sassTaskNames, ejsTaskNames, htmlTaskNames, phpTaskNames, staticTaskNames);
	gulp.task('project-' + projectName, gulp.parallel(projectTaskNames));

	const taskName:string = projectName + '-watch';
	gulp.task(taskName, function():void {
		if (typeScriptTaskNames.length > 0) {
			for (let i = 0; i < typeScriptTaskNames.length; ++i) {
				gulp.watch(typeScriptTaskSources[i], gulp.series(typeScriptTaskNames[i]));
			}
		}
		if (sassTaskNames.length > 0) {
			for (let i = 0; i < sassTaskNames.length; ++i) {
				gulp.watch(sassTaskSources[i], gulp.series(sassTaskNames[i]));
			}
		}
		if (ejsTaskNames.length > 0) {
			for (let i = 0; i < ejsTaskNames.length; ++i) {
				gulp.watch(ejsTaskSources[i], gulp.series(ejsTaskNames[i]));
			}
		}
		if (htmlTaskNames.length > 0) {
			for (let i = 0; i < htmlTaskNames.length; ++i) {
				gulp.watch(htmlTaskSources[i], gulp.series(htmlTaskNames[i]));
			}
		}
		if (phpTaskNames.length > 0) {
			for (let i = 0; i < phpTaskNames.length; ++i) {
				gulp.watch(phpTaskSources[i], gulp.series(phpTaskNames[i]));
			}
		}
		if (staticTaskNames.length > 0) {
			for (let i = 0; i < staticTaskNames.length; ++i) {
				gulp.watch(staticTaskSources[i], gulp.series(staticTaskNames[i]));
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

	allTaskNames = allTaskNames.concat(typeScriptTaskNames, sassTaskNames, ejsTaskNames, htmlTaskNames, phpTaskNames, staticTaskNames);
}

function registerServer():void {
	const option:any = config.server;
	if (option) {
		option.root = '../' + path.dst;
		option.host = getOption(option, 'host', 'localhost');
		option.port = getOption(option, 'port', 8000);
		option.livereload = getOption(option, 'livereload', true);

		console.log(indent + '🖥 Starting server');
		gulp.task('server', function():void {
			connect.server(option);
		});
		watchTaskNames.push('server');
	}
}

function run():void {
	registerServer();

	console.log(indent + '📦 Registering projects');
	for (let i:number = 0; i < projects.length; ++i) {
		registerProject(projects[i]);
	}

	gulp.task('watch', gulp.parallel(watchTaskNames));
	gulp.task('default', gulp.parallel(allTaskNames));

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
