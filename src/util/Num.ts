/// <reference path="../reference.ts" />

namespace alm {

	export class Num {

		/**
		 * valueを、範囲[srcMin, srcMax]から範囲[dstMin, dstMax]にマッピングする
		 */
		public static map(value:number, srcMin:number, srcMax:number, dstMin:number, dstMax:number, clamp:boolean = true):number {
			if (srcMin == srcMax) return dstMin;
			if (clamp) {
				if (srcMin < srcMax) {
					if (value < srcMin) value = srcMin;
					else if (value > srcMax) value = srcMax;
				} else {
					if (value < srcMax) value = srcMax;
					else if (value > srcMin) value = srcMin;
				}
			}
			return (value - srcMin) * (dstMax - dstMin) / (srcMax - srcMin) + dstMin;
		}

		public static random(min:number = 0, max:number = 1):number {
			return min + (max - min) * Math.random();
		}

		public static clamp(value:number, min:number, max:number):number {
			return value < min ? min : (value > max ? max : value);
		}

		public static dist(x1:number, y1:number, x2:number, y2:number, squared:boolean = false):number {
			const dx:number = x2 - x1;
			const dy:number = y2 - y1;
			return squared ? (dx * dx + dy * dy) : Math.sqrt(dx * dx + dy * dy);
		}

		public static radToDeg(radian:number):number {
			return radian * Num.RAD2DEG;
		}

		public static degToRad(degree:number):number {
			return degree * Num.DEG2RAD;
		}

		public static turn(from:number, to:number, radian:boolean = true):number {
			return radian ? ((to - from + Num.PI3) % Num.PI2 - Math.PI) : ((to - from + 540) % 360 - 180);
		}





		// --------------------------------------------------
		//
		// CONST
		//
		// --------------------------------------------------

		public static PI2:number = Math.PI * 2;
		public static PI3:number = Math.PI * 3;
		public static PI4:number = Math.PI * 4;
		public static PI5:number = Math.PI * 5;
		public static PI6:number = Math.PI * 6;
		public static PI_2:number = Math.PI / 2;
		public static PI_3:number = Math.PI / 3;
		public static PI_4:number = Math.PI / 4;
		public static PI_6:number = Math.PI / 6;

		private static RAD2DEG:number = 180 / Math.PI;
		private static DEG2RAD:number = Math.PI / 180;
	}
}