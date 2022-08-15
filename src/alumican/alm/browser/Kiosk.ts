/// <reference path='../../index.ts' />

namespace alm.browser {

	import Num = alm.util.Num;

	export class Kiosk {

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

		public static disableInteraction(): void {
			if (this.isInteractionDisabled) return;
			this.isInteractionDisabled = true;

			document.addEventListener('dblclick', Kiosk.doubleClickHandler, { passive: false });
			document.addEventListener('contextmenu', Kiosk.contextMenuHandler, { passive: false });

			// <html> CSS
			document.documentElement.style.setProperty('touch-action', 'none');
			document.documentElement.style.setProperty('pointer-events', 'none');
			document.documentElement.style.setProperty('user-select', 'none');
			document.documentElement.style.setProperty('-webkit-user-select', 'none');
			document.documentElement.style.setProperty('overscroll-behavior', 'none');
			document.documentElement.style.setProperty('overflow', 'hidden');

			// <body> CSS
			document.body.style.setProperty('touch-action', 'none');
			document.body.style.setProperty('pointer-events', 'none');
			document.body.style.setProperty('user-select', 'none');
			document.body.style.setProperty('-webkit-user-select', 'none');
			document.body.style.setProperty('overscroll-behavior', 'none');
			document.body.style.setProperty('overflow', 'hidden');
			document.body.style.setProperty('-webkit-touch-callout', 'none');
			document.body.style.setProperty('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
		}

		private static doubleClickHandler = (event:MouseEvent):void => {
			event.preventDefault();
		};

		private static contextMenuHandler = (event:Event):void => {
			event.preventDefault();
		};





		public static setStageSize(width:number, height:number):void {
			this.width = width;
			this.height = height;

			this.aspectRatio = this.width / this.height;
			if (this.aspectRatio >= 1) {
				// landscape
				this.normalizedByCoverWidth = this.aspectRatio;
				this.normalizedByCoverHeight = 1;
				this.normalizedByContainWidth = 1;
				this.normalizedByContainHeight = 1 / this.aspectRatio;
			} else {
				// portrait
				this.normalizedByCoverWidth = 1;
				this.normalizedByCoverHeight = 1 / this.aspectRatio;
				this.normalizedByContainWidth = this.aspectRatio;
				this.normalizedByContainHeight = 1;
			}
		}

		public static ratioX(xPixel:number, clamp:boolean = true):number {
			const ratio = xPixel / Kiosk.width;
			return clamp ? Num.clamp(ratio, 0, 1) : ratio;
		}

		public static ratioY(yPixel:number, clamp:boolean = true):number {
			const ratio = yPixel / Kiosk.height;
			return clamp ? Num.clamp(ratio, 0, 1) : ratio;
		}

		public static coverRatioX(xPixel:number, clamp:boolean = true):number {
			return Kiosk.ratioX(xPixel, clamp) * Kiosk.normalizedByCoverWidth;
		}

		public static coverRatioY(yPixel:number, clamp:boolean = true):number {
			return Kiosk.ratioY(yPixel, clamp) * Kiosk.normalizedByCoverHeight;
		}

		public static containRatioX(xPixel:number, clamp:boolean = true):number {
			return Kiosk.ratioX(xPixel, clamp) * Kiosk.normalizedByContainWidth;
		}

		public static containRatioY(yPixel:number, clamp:boolean = true):number {
			return Kiosk.ratioY(yPixel, clamp) * Kiosk.normalizedByContainHeight;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private static isInteractionDisabled:boolean = false;

		public static getWidth():number { return this.width; }
		private static width:number = 0;

		public static getHeight():number { return this.height; }
		private static height:number = 0;

		public static getAspectRatio():number { return this.aspectRatio; }
		private static aspectRatio:number = 0;

		public static getNormalizedByCoverWidth():number { return this.normalizedByCoverWidth; }
		private static normalizedByCoverWidth:number = 0;

		public static getNormalizedByCoverHeight():number { return this.normalizedByCoverHeight; }
		private static normalizedByCoverHeight:number = 0;

		public static getNormalizedByContainWidth():number { return this.normalizedByContainWidth; }
		private static normalizedByContainWidth:number = 0;

		public static getNormalizedByContainHeight():number { return this.normalizedByContainHeight; }
		private static normalizedByContainHeight:number = 0;
	}
}
