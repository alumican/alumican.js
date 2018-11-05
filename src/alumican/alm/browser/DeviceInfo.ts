/// <reference path='../../include.ts' />

namespace alm.browser {

	export class DeviceInfo {

		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		private static initialize():void {
			if (this.isInitialized) return;
			this.isInitialized = true;

			const u:string = window.navigator.userAgent.toLowerCase();

			// Device
			this.isTablet = (u.indexOf('windows') != -1 && u.indexOf('touch') != -1)
				|| u.indexOf('ipad') != -1
				|| (u.indexOf('android') != -1 && u.indexOf('mobile') == -1)
				|| (u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1)
				|| u.indexOf('kindle') != -1
				|| u.indexOf('silk') != -1
				|| u.indexOf('playbook') != -1;

			this.isMobile = (u.indexOf('windows') != -1 && u.indexOf('phone') != -1)
				|| u.indexOf('iphone') != -1
				|| u.indexOf('ipod') != -1
				|| (u.indexOf('android') != -1 && u.indexOf('mobile') != -1)
				|| (u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1)
				|| u.indexOf('blackberry') != -1;

			this.isDesktop = !this.isTablet && !this.isMobile;

			// OS
			this.isIOS = u.indexOf('ipad') != -1 || u.indexOf('iphone') != -1 || u.indexOf('ipod') != -1;
			this.isAndroid = u.indexOf('android') != -1 && u.indexOf('mobile') != -1;

			// Browser
			if(u.indexOf('msie') != -1 || u.indexOf('trident') != -1) {
				this.isIE = true;
			} else if(u.indexOf('edge') != -1) {
				this.isEdge = true;
			} else if(u.indexOf('chrome') != -1) {
				this.isChrome = true;
			} else if(u.indexOf('safari') != -1) {
				this.isSafari = true;
			} else if(u.indexOf('firefox') != -1) {
				this.isFireFox = true;
			} else if(u.indexOf('opera') != -1) {
				this.isOpera = true;
			} else {
				this.isUnknownBrowser = true;
			}

			// Resolution
			this.isRetina = Math.round(window.devicePixelRatio) == 2;
		}

		public static getIsDesktop():boolean {
			this.initialize();
			return this.isDesktop;
		}

		public static getIsTablet():boolean {
			this.initialize();
			return this.isTablet;
		}

		public static getIsMobile():boolean {
			this.initialize();
			return this.isMobile;
		}

		public static getIsIOS():boolean {
			this.initialize();
			return this.isIOS;
		}

		public static getIsAndroid():boolean {
			this.initialize();
			return this.isAndroid;
		}

		public static getIsRetina():boolean {
			this.initialize();
			return this.isRetina;
		}

		public static getIsIE():boolean {
			this.initialize();
			return this.isIE;
		}

		public static getIsEdge():boolean {
			this.initialize();
			return this.isEdge;
		}

		public static getIsChrome():boolean {
			this.initialize();
			return this.isChrome;
		}

		public static getIsSafari():boolean {
			this.initialize();
			return this.isSafari;
		}

		public static getIsFireFox():boolean {
			this.initialize();
			return this.isFireFox;
		}

		public static getIsOpera():boolean {
			this.initialize();
			return this.isOpera;
		}

		public static getIsUnknownBrowser():boolean {
			this.initialize();
			return this.isUnknownBrowser;
		}

		public static getDpi():number {
			if (this.dpi == -1) {
				const div:HTMLElement = document.createElement('div');
				div.setAttribute('style', 'height:1in;left:-100%;top:-100%;position:absolute;width:1in;');
				document.body.appendChild(div);
				this.dpi = div.offsetHeight;
				document.body.removeChild(div);
			}
			return this.dpi;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private static isDesktop:boolean = false;
		private static isTablet:boolean = false;
		private static isMobile:boolean = false;

		private static isRetina:boolean = false;

		private static isIOS:boolean = false;
		private static isAndroid:boolean = false;

		private static isIE:boolean = false;
		private static isEdge:boolean = false;
		private static isChrome:boolean = false;
		private static isSafari:boolean = false;
		private static isFireFox:boolean = false;
		private static isOpera:boolean = false;
		private static isUnknownBrowser:boolean = false;

		private static dpi:number = -1;

		private static isInitialized:boolean = false;





		private constructor() {}
	}
}