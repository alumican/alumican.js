/// <reference path="../../index.ts" />

namespace alm.util {

	export class Cvs {

		public static getHighDpiContext2d(canvas:HTMLCanvasElement):CanvasRenderingContext2D {
			const dpr = Math.round(window.devicePixelRatio) || 1;
			const rect = canvas.getBoundingClientRect();

			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;

			const context = canvas.getContext('2d');
			context.scale(dpr, dpr);

			return context;
		}





		private constructor() {}
	}
}
