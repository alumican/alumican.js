/// <reference path='../../index.ts' />

namespace alm.util {

	export class Time {

		/**
		 * 現在の時刻(ミリ秒)を取得する
		 * @returns {number} UNIX時間（ミリ秒）
		 */
		public static now():number {
			return (window.performance || Date).now();
		}

		private constructor() {}
	}
}
