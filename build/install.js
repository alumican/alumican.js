'use strict';

const fs = require('fs');
const configJson = require('./config.json');
const packageJson = require('./package.json');

function getOption(option, key, defaultValue) {
	return typeof option[key] !== 'undefined' ? option[key] : defaultValue;
}

function saveJson(data, filePath) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, '  '));
}

// copy types to package.json
{
	const devDependencies = packageJson.devDependencies || {};

	for (let name in devDependencies) {
		if (name.indexOf('@types/') == 0) {
			delete devDependencies[name];
		}
	}

	devDependencies['@types/node'] = '*';
	devDependencies['@types/gulp'] = '*';
	if (configJson.typeScriptOptions) {
		const types = configJson.typeScriptOptions.types;
		for (let i in types) {
			devDependencies['@types/' + types[i]] = '*';
		}
	}
	packageJson.devDependencies = devDependencies;

	// add browserlist to package.json
	delete packageJson.browserslist;

	const autoprefixerOptions = configJson.autoprefixerOptions || null;
	if (autoprefixerOptions) {
		const browsers = autoprefixerOptions.browsers;
		if (browsers) {
			packageJson.browserslist = browsers;
		}
	}

	// overwrite package.json
	saveJson(packageJson, './package.json');
}

// create tsconfig.json
{
	const compilerOptions = configJson.typeScriptOptions || {};

	delete compilerOptions.include;
	delete compilerOptions.minify;
	delete compilerOptions.minifyOnly;

	if (!compilerOptions.typeRoots) { compilerOptions.typeRoots = []; }
	compilerOptions.typeRoots = ['build/node_modules/@types'].concat(compilerOptions.typeRoots);
	//delete compilerOptions.types;

	saveJson({ compilerOptions: compilerOptions }, '../tsconfig.json');
}
