/// <reference path='../../include.ts' />

namespace alm.util {

	export enum LoggerLevel {
		Verbose = 0,
		Info = 1,
		Warn = 2,
		Error = 3,
		Silent = 4,
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
			const line:string = prefix + messages.join(', ') + '\n';
			if (this.html) {
				this.dom.innerHTML = line + this.dom.innerHTML;
			} else {
				this.dom.innerText = line + this.dom.innerText;
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
				this.loggers[i].verbose.apply(this, messages);
			}
		}

		public info(prefix:string, messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].info.apply(this, messages);
			}
		}

		public warn(prefix:string, messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].warn.apply(this, messages);
			}
		}

		public error(prefix:string, messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].error.apply(this, messages);
			}
		}

		private loggers:ILogging[];
	}





	export class Logger {

		public static level:number = LoggerLevel.Verbose;
		public static logger:ILogging = new ConsoleLogging();
		private static namespace:string = '';

		public static setLevelByQuery(key:string):void {
			const level:number = new QueryString().getInt(key, LoggerLevel.Silent);
			Logger.level = isNaN(level) ? LoggerLevel.Silent : level;
		}

		public static setNamespace(namespace:string):void {
			Logger.namespace = namespace != '' ? (namespace + '#') : '';
		}

		public static verbose(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Verbose) Logger.logger.verbose('[' + Logger.namespace + 'Verbose] ', messages);
		}

		public static info(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Info) Logger.logger.info('[' + Logger.namespace + 'Info   ] ', messages);
		}

		public static warn(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Warn) Logger.logger.warn('[' + Logger.namespace + 'Warn   ] ', messages);
		}

		public static error(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Error) Logger.logger.error('[' + Logger.namespace + 'Error  ] ', messages);
		}

		public static warnIf(target:any, message:string, condition:boolean = true):void {
			if (Logger.level <= LoggerLevel.Warn && condition) Logger.logger.warn('[' + Logger.namespace + 'Warn   ] ', [message + ' : ' + target]);
		}

		public static errorIf(target:any, message: string, condition:boolean = true):void {
			if (Logger.level <= LoggerLevel.Error && condition) Logger.logger.error('[' + Logger.namespace + 'Error  ] ', [message + ' : ' + target]);
		}

		private constructor() {}
	}
}

function trace(...messages:any[]):void {
	alm.util.Logger.info.apply(trace.caller, arguments);
}

function throwWarn(target:any, message:string, condition:boolean = true):void {
	alm.util.Logger.warnIf.apply(null, arguments);
}

function throwError(target:any, message:string, condition:boolean = true):void {
	alm.util.Logger.errorIf.apply(null, arguments);
}