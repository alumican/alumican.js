/// <reference path='../../index.ts' />

namespace alm.browser {

	import Time = alm.util.Time;

	export class LocalStorage {

		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		/**
		 * データを有効期限までLocalStorageに保存する
		 * @param key 保存するキー
		 * @param value 保存するデータ
		 * @param expiredAt 有効期限（UNIXミリ秒）
		 * @returns {boolean} 保存に成功した場合trueが返る
		 */
		public static save(key:string, value:any, expiredAt:number = -1):boolean {
			if (!LocalStorage.isAvailable()) return false;
			const record:{ value:string; expiredAt:number } = { value:JSON.stringify(value), expiredAt: expiredAt };
			localStorage.setItem(key, JSON.stringify(record));
			return true;
		}

		/**
		 * データを期間でLocalStorageに保存する
		 * @param key 保存するキー
		 * @param value 保存するデータ
		 * @param milliseconds 保存期間（ミリ秒）
		 * @returns {boolean} 保存に成功した場合trueが返る
		 */
		public static saveWithTerm(key:string, value:any, milliseconds:number = -1):boolean {
			const expiredAt:number = milliseconds > 0 ? Time.now() + milliseconds : -1;
			return LocalStorage.save(key, value, expiredAt);
		}

		/**
		 * 保存したデータをLocalStorageから読み込む
		 * @param key 保存したキー
		 * @returns {any} 読み込まれたデータ
		 */
		public static load(key:string, defaultValue:any = null):any {
			if (!LocalStorage.isAvailable()) return defaultValue;
			const record:{ value:string; expiredAt:number } = JSON.parse(localStorage.getItem(key));
			if (record) {
				// データが見つかった
				if (record.expiredAt > 0) {
					// 期限付きデータ
					if (Time.now() < record.expiredAt) {
						// 有効期限内
						return JSON.parse(record.value);
					} else {
						// 有効期限を過ぎているので破棄
						localStorage.removeItem(key);
						return defaultValue;
					}
				} else {
					// 永続データ
					return JSON.parse(record.value);
				}
			} else {
				// データが見つからなかった
				return defaultValue;
			}
		}

		/**
		 * 保存したデータをLocalStorageから削除する
		 * @param key 保存したキー
		 */
		public static remove(key:string):void {
			if (!LocalStorage.isAvailable()) return;
			localStorage.removeItem(key);
		}

		/**
		 * LocalStorageが使用可能かどうか確認する
		 * @returns {boolean} 使用可能な場合はtrueが返る
		 */
		public static isAvailable():boolean {
			if (LocalStorage.isAvailable_ == null) {
				try {
					localStorage.setItem('__CKECK__', '__CKECK__');
					localStorage.removeItem('__CKECK__');
					LocalStorage.isAvailable_ = true;
				} catch (error) {
					LocalStorage.isAvailable_ = false;
				}
			}
			return LocalStorage.isAvailable_;
		}

		/**
		 * 各時間の尺度ミリ秒で合算する
		 * @param dates 日
		 * @param hours 時
		 * @param minutes 分
		 * @param seconds 秒
		 * @param milliseconds ミリ秒
		 * @returns {number} 合算されたミリ秒
		 */
		public static toMilliseconds(dates:number = 0, hours:number = 0, minutes:number = 0, seconds:number = 0, milliseconds:number = 0):number {
			return milliseconds + (seconds + (minutes + (hours + dates * 24) * 60) * 60) * 1000;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private static isAvailable_:boolean = null;





		private constructor() {}
	}
}
