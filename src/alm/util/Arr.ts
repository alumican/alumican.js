/// <reference path="../../reference.ts" />

namespace alm.util {

	export class Arr {

		/**
		 * 等差数列を生成する
		 * @param {number} count 要素数
		 * @param {number} init 初期値
		 * @param {number} step 等差
		 * @returns {number[]} 出力配列
		 */
		public static sequence(count:number, init:number = 0, step:number = 1):number[] {
			const result:number[] = new Array(count);
			let v:number = init;
			for (let i:number = 0; i < count; ++i) {
				result[i] = v;
				v += step;
			}
			return result;
		}

		/**
		 * 重複を削除したリストを生成する
		 * @param list 入力配列
		 * @returns {T[]} 出力配列
		 */
		public static unique<T>(list:T[]):T[] {
			return list.filter(function (x:T, i:number, self:T[]) {
				return self.indexOf(x) === i;
			});
		}

		/**
		 * 重複のみを抽出したリストを生成する
		 * @param list 入力配列
		 * @param unique trueの場合は、重複したものの中を重複しないようにする
		 * @returns {T[]} 出力配列
		 */
		public static duplicated<T>(list:T[], unique:boolean = false):T[] {

			if (unique) {
				return list.filter(function (x:T, i:number, self:T[]) {
					return self.indexOf(x) !== self.lastIndexOf(x);
				});
			} else {
				return list.filter(function (x:T, i:number, self:T[]) {
					return (self.indexOf(x) === i) && (self.lastIndexOf(x) !== i);
				});
			}
		}

		/**
		 * 2つの入力配列に対して総当たり戦をおこなう
		 * @param {T[]} list1 入力配列1
		 * @param {T[]} list2 入力配列2
		 * @param {(count: number, index1: number, index2: number, element1: T, element2: T) => void} callback コールバック関数
		 * @param callback.count コールバックの呼ばれた回数
		 * @param callback.index1 入力配列1の現在のインデックス
		 * @param callback.index2 入力配列2の現在のインデックス
		 * @param callback.element1 入力配列1の現在の要素
		 * @param callback.element2 入力配列2の現在の要素
		 */
		public static roundRobin<T>(list1:T[], list2:T[], callback:(count:number, index1:number, index2:number, element1:T, element2:T) => void):void {
			let i:number, j:number, p:number = 1;
			const m:number = list1.length;
			const n:number = list2.length;
			for (i = 0; i < m; ++i) {
				for (j = i + 1; j < n; ++j) {
					callback(p++, i, j, list1[i], list2[j]);
				}
			}
		}

		private constructor() {}
	}
}