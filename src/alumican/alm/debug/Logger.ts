/// <reference path='../../index.ts' />

namespace alm.debug {

	import QueryString = alm.browser.QueryString;

	export enum LoggerLevel {
		verbose = 0,
		info = 1,
		warn = 2,
		error = 3,
		silent = 4,
	}





	export interface ILogging {

		verbose(prefix:string, messages:any[]):void;
		info(prefix:string, messages:any[]):void;
		warn(prefix:string, messages:any[]):void;
		error(prefix:string, messages:any[]):void;
	}





	export class NullLogging implements ILogging {

		public verbose(prefix:string, messages:any[]):void {
		}

		public info(prefix:string, messages:any[]):void {
		}

		public warn(prefix:string, messages:any[]):void {
		}

		public error(prefix:string, messages:any[]):void {
		}
	}





	export class ConsoleLogging implements ILogging {

		public verbose(prefix:string, messages:any[]):void {
			console.debug.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
		}

		public info(prefix:string, messages:any[]):void {
			console.log.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
		}

		public warn(prefix:string, messages:any[]):void {
			console.warn.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
		}

		public error(prefix:string, messages:any[]):void {
			console.error.apply(console, Array.prototype.slice.call([prefix].concat(messages)));
		}
	}





	export class DOMLogging implements ILogging {

		constructor(dom:HTMLElement, html:boolean) {
			this.dom = dom;
			this.html = html;
		}

		public verbose(prefix:string, messages:any[]):void {
			this.print(prefix, messages);
		}

		public info(prefix:string, messages:any[]):void {
			this.print(prefix, messages);
		}

		public warn(prefix:string, messages:any[]):void {
			this.print(prefix, messages);
		}

		public error(prefix:string, messages:any[]):void {
			this.print(prefix, messages);
		}

		private print(prefix:string, messages:any[]):void {
			const line:string = prefix + messages.join(', ');
			if (this.html) {
				this.dom.innerHTML = line + '<br>\n' + this.dom.innerHTML;
			} else {
				this.dom.innerText = line + '\n' + this.dom.innerText;
			}
		}

		private dom:HTMLElement;
		private html:boolean;
	}





	export class ParallelLogging implements ILogging {

		constructor(loggers:ILogging[]) {
			this.loggers = loggers;
		}

		public verbose(prefix:string, messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].verbose(prefix, messages);
			}
		}

		public info(prefix:string, messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].info(prefix, messages);
			}
		}

		public warn(prefix:string, messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].warn(prefix, messages);
			}
		}

		public error(prefix:string, messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].error(prefix, messages);
			}
		}

		private loggers:ILogging[];
	}





	export class Logger {

		public static level:number = LoggerLevel.verbose;
		public static logger:ILogging = new ConsoleLogging();
		private static namespace:string = '';

		public static setLevelByQuery(key:string):void {
			const level:number = new QueryString().getInt(key, LoggerLevel.silent);
			Logger.level = isNaN(level) ? LoggerLevel.silent : level;
		}

		public static setNamespace(namespace:string):void {
			Logger.namespace = namespace != '' ? (namespace + ' ') : '';
		}

		public static verbose(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.verbose) {
				Logger.logger.verbose('[' + Logger.namespace + 'Verbose] ', messages);
			}
		}

		public static info(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.info) {
				Logger.logger.info('[' + Logger.namespace + 'Info] ', messages);
			}
		}

		public static warn(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.warn) {
				Logger.logger.warn('[' + Logger.namespace + 'Warn] ', messages);
				//Logger.stackTrace();
			}
		}

		public static error(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.error) {
				Logger.logger.error('[' + Logger.namespace + 'Error] ', messages);
				//Logger.stackTrace();
			}
		}

		public static warnIf(target:any, message:string, condition:boolean = true):void {
			if (Logger.level <= LoggerLevel.warn && condition) {
				Logger.logger.warn('[' + Logger.namespace + 'Warn] ', [message + ' : ' + target]);
				//Logger.stackTrace();
			}
		}

		public static errorIf(target:any, message: string, condition:boolean = true):void {
			if (Logger.level <= LoggerLevel.error && condition) {
				Logger.logger.error('[' + Logger.namespace + 'Error] ', [message + ' : ' + target]);
				//Logger.stackTrace();
			}
		}

		public static stackTrace():void {
			console.trace();
		}

		private constructor() {}
	}
}

function trace(...messages:any[]):void {
	alm.debug.Logger.info.apply(trace.caller, arguments);
}

function throwWarn(target:any, message:string, condition:boolean = true):void {
	alm.debug.Logger.warnIf.apply(null, arguments);
}

function throwError(target:any, message:string, condition:boolean = true):void {
	alm.debug.Logger.errorIf.apply(null, arguments);
}
