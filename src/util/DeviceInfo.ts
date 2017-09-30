/// <reference path="../reference.ts" />

namespace alm {

	export class DeviceInfo {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		private constructor() {
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		private static initialize():void {
			if (this.isInitialized) return;
			this.isInitialized = true;

			const u:string = window.navigator.userAgent.toLowerCase();

			this.isTablet = (u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
				|| u.indexOf("ipad") != -1
				|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
				|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
				|| u.indexOf("kindle") != -1
				|| u.indexOf("silk") != -1
				|| u.indexOf("playbook") != -1;

			this.isMobile = (u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
				|| u.indexOf("iphone") != -1
				|| u.indexOf("ipod") != -1
				|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
				|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
				|| u.indexOf("blackberry") != -1;

			this.isDesktop = !this.isTablet && !this.isMobile;

			this.isIOS = u.indexOf("ipad") != -1 || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1;
			this.isAndroid = u.indexOf("android") != -1 && u.indexOf("mobile") != -1;

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





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private static isDesktop:boolean;
		private static isTablet:boolean;
		private static isMobile:boolean;

		private static isRetina:boolean;

		private static isIOS:boolean;
		private static isAndroid:boolean;

		private static isInitialized:boolean = false;
	}
}