/// <reference path="../../reference.ts" />

namespace alm.util {

	export class Loc {

		public static getQuery():alm.Hash<string> {
			const query:alm.Hash<string> = {};
			const pairs:string[] = location.search.substring(1).split("&");
			let pair:string[];
			for(let i:number = 0; pairs[i]; ++i) {
				pair = pairs[i].split("=");
				query[pair[0]] = pair[1];
			}
			return query;
		}

		private constructor() {}
	}
}