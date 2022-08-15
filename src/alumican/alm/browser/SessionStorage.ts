/// <reference path='../../index.ts' />

namespace alm.browser {

	export class SessionStorage {

		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		/**
		 * データを保存する
		 * @param key 保存するキー
		 * @param value 保存するデータ
		 * @returns {boolean} 保存に成功した場合trueが返る
		 */
		public static save(key:string, value:any):boolean {
			if (!SessionStorage.isAvailable()) return false;
			sessionStorage.setItem(key, JSON.stringify(value));
			return true;
		}

		/**
		 * データを読み込む
		 * @param key 保存したキー
		 * @returns {any} 読み込まれたデータ
		 */
		public static load(key:string, defaultValue:any = null):any {
			if (!SessionStorage.isAvailable()) return defaultValue;
			const record = JSON.parse(sessionStorage.getItem(key));
			if (record) {
				return JSON.parse(record.value);
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
			if (!SessionStorage.isAvailable()) return;
			sessionStorage.removeItem(key);
		}

		/**
		 * LocalStorageが使用可能かどうか確認する
		 * @returns {boolean} 使用可能な場合はtrueが返る
		 */
		public static isAvailable():boolean {
			if (SessionStorage.isAvailable_ == null) {
				try {
					sessionStorage.setItem('__CKECK__', '__CKECK__');
					sessionStorage.removeItem('__CKECK__');
					SessionStorage.isAvailable_ = true;
				} catch (error) {
					SessionStorage.isAvailable_ = false;
				}
			}
			return SessionStorage.isAvailable_;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private static isAvailable_:boolean = null;





		private constructor() {}
	}
}
