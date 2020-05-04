/// <reference path='../../index.ts' />

namespace scn.core {

	export class Waypoint {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(path:string, level:number) {
			this.path = path;
			this.level = level;
			this.from = Direction.Static;
			this.to = Direction.Static;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public getPath():string {
			return this.path;
		}

		public getLevel():number {
			return this.level;
		}

		public getFrom():Direction {
			return this.from;
		}

		public getTo():Direction {
			return this.to;
		}

		public _setFrom(from:Direction):void {
			this.from = from;
		}

		public _setTo(to:Direction):void {
			this.to = to;
		}

		public toString():string {
			return '[Waypoint] path = \'' + this.path + '\', level = ' + this.level + ', from = ' + getDirectionString(this.from) + ', to = ' + getDirectionString(this.to);
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private path:string;
		private level:number;
		private from:Direction;
		private to:Direction;
	}
}
