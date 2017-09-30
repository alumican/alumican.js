/// <reference path="../reference.ts" />

namespace project {

	export class Str {

		public static toTimeString(hours:number = 0, minutes:number = 0, seconds:number = 0):string {
			seconds += minutes * 60 + hours * 3600;
			let h:string = Math.floor(seconds / 3600).toString();
			let m:string = Math.floor((seconds / 60) % 60).toString();
			let s:string = ("0" + Math.floor(seconds % 60)).substr(-2, 2);
			if (h != "0") {
				return h + ":" + ("0" + m).substr(-2, 2) + ":" + s;
			} else {
				return m + ":" + s;
			}
		}
	}
}