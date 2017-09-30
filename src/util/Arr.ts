/// <reference path="../reference.ts" />

namespace alm {

	export class Arr {

		/**
		 * 重複を削除したリストを生成する
		 * @param list 入力配列
		 * @returns {any[]} 出力配列
		 */
		public static unique(list:any[]):any[] {
			return list.filter(function (x:any, i:number, self:any[]) {
				return self.indexOf(x) === i;
			});
		}

		/**
		 * 重複のみを抽出したリストを生成する
		 * @param list 入力配列
		 * @param unique trueの場合は、重複したものの中を重複しないようにする
		 * @returns {any[]} 出力配列
		 */
		public static duplicated(list:any[], unique:boolean = false):any[] {
			if (unique) {
				return list.filter(function (x:any, i:number, self:any[]) {
					return self.indexOf(x) !== self.lastIndexOf(x);
				});
			} else {
				return list.filter(function (x:any, i:number, self:any[]) {
					return (self.indexOf(x) === i) && (self.lastIndexOf(x) !== i);
				});
			}
		}
	}
}