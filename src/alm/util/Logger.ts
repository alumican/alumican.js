/// <reference path="../../reference.ts" />

namespace alm.util {

	export enum LoggerLevel {
		Verbose = 0,
		Info = 1,
		Warn = 2,
		Error = 3,
		Silent = 4,
	}





	export interface ILogging {

		verbose(messages:any[]):void;
		info(messages:any[]):void;
		warn(messages:any[]):void;
		error(messages:any[]):void;
	}





	export class NullLogging implements ILogging {

		public verbose(messages:any[]):void {
		}

		public info(messages:any[]):void {
		}

		public warn(messages:any[]):void {
		}

		public error(messages:any[]):void {
		}
	}





	export class ConsoleLogging implements ILogging {

		public verbose(messages:any[]):void {
			console.debug.apply(console, Array.prototype.slice.call(["Verbose: "].concat(messages)));
		}

		public info(messages:any[]):void {
			console.log.apply(console, Array.prototype.slice.call(["Info   : "].concat(messages)));
		}

		public warn(messages:any[]):void {
			console.warn.apply(console, Array.prototype.slice.call(["Warn   : "].concat(messages)));
		}

		public error(messages:any[]):void {
			console.error.apply(console, Array.prototype.slice.call(["Error  : "].concat(messages)));
		}
	}





	export class DOMLogging implements ILogging {

		constructor(dom:HTMLElement, html:boolean) {
			this.dom = dom;
			this.html = html;
		}

		public verbose(messages:any[]):void {
			this.print("Verbose: ", messages);
		}

		public info(messages:any[]):void {
			this.print("Info   : ", messages);
		}

		public warn(messages:any[]):void {
			this.print("Warn   : ", messages);
		}

		public error(messages:any[]):void {
			this.print("Error  : ", messages);
		}

		private print(prefix:string, messages:any[]):void {
			const line:string = messages.join(", ") + "\n";
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

		public verbose(messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].verbose.apply(this, messages);
			}
		}

		public info(messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].info.apply(this, messages);
			}
		}

		public warn(messages:any[]):void {
			const n:number = this.loggers.length;
			for (let i:number = 0; i < n; ++i) {
				this.loggers[i].warn.apply(this, messages);
			}
		}

		public error(messages:any[]):void {
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

		public static verbose(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Verbose) Logger.logger.verbose(messages);
		}

		public static info(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Info) Logger.logger.info(messages);
		}

		public static warn(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Warn) Logger.logger.warn(messages);
		}

		public static error(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Error) Logger.logger.error(messages);
		}

		public static warnIf(target:any, message:string, condition:boolean = true):void {
			if (Logger.level <= LoggerLevel.Warn && condition) Logger.logger.warn([message + " : " + target]);
		}

		public static errorIf(target:any, message: string, condition:boolean = true):void {
			if (Logger.level <= LoggerLevel.Error && condition) Logger.logger.error([message + " : " + target]);
		}

		private constructor() {}
	}





	/*
	export class Logger {

		public static level:number = LoggerLevel.Verbose;

		public static verbose(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Verbose) console.debug.apply(console, Array.prototype.slice.call(["Verbose: "].concat(messages)));
		}

		public static info(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Info) console.log.apply(console, Array.prototype.slice.call(["Info   : "].concat(messages)));
		}

		public static warn(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Warn) console.warn.apply(console, Array.prototype.slice.call(["Warn   : "].concat(messages)));
		}

		public static error(...messages:any[]):void {
			if (Logger.level <= LoggerLevel.Error) console.error.apply(console, Array.prototype.slice.call(["Error  : "].concat(messages)));
		}

		public static warnIf(target:any, message:string, condition:boolean = true):void {
			if (Logger.level <= LoggerLevel.Warn && condition) Logger.warn(message + " : ", target);
		}

		public static errorIf(target:any, message: string, condition:boolean = true):void {
			if (Logger.level <= LoggerLevel.Error && condition) Logger.error(message + " : ", target);
		}

		private constructor() {}
	}
	*/
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