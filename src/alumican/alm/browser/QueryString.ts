/// <reference path='../../index.ts' />

namespace alm.browser {

	import Hash = alm.util.Hash;

	export class QueryString {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(url:string = '') {
			this.set(url);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public set(url:string = ''):void {
			// normalize url
			let search:string = '';
			if (url != '') {
				const index:number = url.indexOf('?');
				if (index != -1) {
					search = url.substring(index);
				}
			} else {
				search = location.search;
			}
			// parse query
			this.hash = {};
			const pairs:string[] = search.substring(1).split('&');
			let pair:string[];
			for(let i:number = 0; pairs[i]; ++i) {
				pair = pairs[i].split('=');
				this.hash[pair[0]] = pair[1];
			}
		}

		// 'abc' -> 'abc'
		public getString(key:string, defaultValue:string):string {
			const value:string = this.hash[key];
			return value === undefined ? defaultValue : value;
		}

		// '123' -> 123
		public getInt(key:string, defaultValue:number):number {
			const value:number = parseInt(this.hash[key]);
			return isNaN(value) ? defaultValue : value;
		}

		// '1.23' -> 1.23
		public getFloat(key:string, defaultValue:number):number {
			const value:number = parseFloat(this.hash[key]);
			return isNaN(value) ? defaultValue : value;
		}

		// '0' -> false, otherwise true
		public getBool(key:string, defaultValue:boolean):boolean {
			const value:string = this.hash[key];
			return value === undefined ? defaultValue : (<any>value == true);
		}

		public getHash():Hash<string> {
			return this.hash;
		}

		public setHash(hash:Hash<string>):void {
			this.hash = hash;
		}

		public setParam(key:string, value:any):void {
			this.hash[key] = value;
		}

		public removeParam(key:string):void {
			delete this.hash[key];
		}

		public hasParam(key:string):boolean {
			return this.hash[key] !== undefined;
		}





		public static getReplacedQueryStringUrl(url:string, key:string, value:string):string {
			const regExp = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
			const separator = url.indexOf('?') !== -1 ? '&' : '?';
			if (url.match(regExp)) {
				return url.replace(regExp, '$1' + key + '=' + value + '$2');
			}
			else {
				return url + separator + key + '=' + value;
			}
		}

		public static replaceQueryString(key:string, value:string):void {
			const url = QueryString.getReplacedQueryStringUrl(window.location.href, key, value);
			const state = url.match(/^https?:\/{2,}.*?(\/.*)/)[1];
			window.history.replaceState(null, null, state);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private hash:Hash<string>;
	}
}
