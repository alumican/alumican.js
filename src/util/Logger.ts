/// <reference path="../reference.ts" />

namespace alm {

	export enum LoggerLevel {
		Verbose = 0,
		Info = 1,
		Warn = 2,
		Error = 3,
		Silent = 4,
	}

	export class Logger {

		public static level: number = LoggerLevel.Verbose;

		public static verbose(...messages:any[]): void {
			if (Logger.level <= LoggerLevel.Verbose) console.debug.apply(console, Array.prototype.slice.call(["Verbose: "].concat(messages)));
		}

		public static info(...messages:any[]): void {
			if (Logger.level <= LoggerLevel.Info) console.log.apply(console, Array.prototype.slice.call(["Info   : "].concat(messages)));
		}

		public static warn(...messages:any[]): void {
			if (Logger.level <= LoggerLevel.Warn) console.warn.apply(console, Array.prototype.slice.call(["Warn   : "].concat(messages)));
		}

		public static error(...messages:any[]): void {
			if (Logger.level <= LoggerLevel.Error) console.error.apply(console, Array.prototype.slice.call(["Error  : "].concat(messages)));
		}

		public static warnIf(target:any, message:string, condition:boolean = true): void {
			if (Logger.level <= LoggerLevel.Warn && condition) Logger.warn(message + " : ", target);
		}

		public static errorIf(target:any, message: string, condition:boolean = true): void {
			if (Logger.level <= LoggerLevel.Error && condition) Logger.error(message + " : ", target);
		}
	}
}

function trace(...messages:any[]):void {
	alm.Logger.info.apply(trace.caller, arguments);
}

function throwWarn(target:any, message:string, condition:boolean = true):void {
	alm.Logger.warnIf.apply(null, arguments);
}

function throwError(target:any, message:string, condition:boolean = true):void {
	alm.Logger.errorIf.apply(null, arguments);
}