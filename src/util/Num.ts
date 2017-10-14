/// <reference path="../reference.ts" />

namespace alm {

	export class Num {

		/**
		 * 値を特定の範囲内にマッピングする
		 * @param {number} value 入力値
		 * @param {number} srcMin マッピング元の最小値
		 * @param {number} srcMax マッピング元の最大値
		 * @param {number} dstMin マッピング先の最小値
		 * @param {number} dstMax マッピング先の最大値
		 * @param {boolean} clamp trueの場合は入力値をsrcMin, srcMaxの範囲内に丸める
		 * @returns {number} 出力値
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

		/**
		 * 乱数（小数）を取得する
		 * @param {number} min 最小値
		 * @param {number} max 最大値
		 * @returns {number} 出力値
		 */
		public static random(min:number = 0, max:number = 1):number {
			return min + (max - min) * Math.random();
		}

		/**
		 * 乱数（整数）を取得する
		 * @param {number} min 最小値
		 * @param {number} max 最大値
		 * @returns {number} 出力値
		 */
		public static randomInt(min:number = 0, max:number = 1):number {
			return Math.floor(Num.random(min, max));
		}

		/**
		 * 値を特定範囲内に丸める
		 * @param {number} value 入力値
		 * @param {number} min 最小値
		 * @param {number} max 最大値
		 * @returns {number} 出力値
		 */
		public static clamp(value:number, min:number, max:number):number {
			return value < min ? min : (value > max ? max : value);
		}

		/**
		 * 2点間の距離を取得する
		 * @param {number} x1 点1のx座標
		 * @param {number} y1 点1のy座標
		 * @param {number} x2 点2のx座標
		 * @param {number} y2 点2のy座標
		 * @param {boolean} squared trueの場合は2乗の値を取得する
		 * @returns {number} 距離
		 */
		public static dist(x1:number, y1:number, x2:number, y2:number, squared:boolean = false):number {
			const dx:number = x2 - x1;
			const dy:number = y2 - y1;
			return squared ? (dx * dx + dy * dy) : Math.sqrt(dx * dx + dy * dy);
		}

		/**
		 * 値をラジアン法から弧度法に変換する
		 * @param {number} radian ラジアン法
		 * @returns {number} 弧度法
		 */
		public static radToDeg(radian:number):number {
			return radian * Num.RAD2DEG;
		}

		/**
		 * 値を弧度法からラジアン法に変換する
		 * @param {number} radian 弧度法
		 * @returns {number} ラジアン法
		 */
		public static degToRad(degree:number):number {
			return degree * Num.DEG2RAD;
		}

		/**
		 * ある角度からある角度への回転角度を取得する
		 * @param {number} from 元の角度
		 * @param {number} to 目標の角度
		 * @param {boolean} radian trueの場合はラジアン法で計算する
		 * @returns {number} 回転角度
		 */
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