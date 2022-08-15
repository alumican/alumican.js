/// <reference path='../../index.ts' />

namespace alm.util {

	export class ViewUtil {

		public static setTransform(target:JQuery, x:number, y:number, rotation:number, scale:number, xSuffix:string = 'px', ySuffix:string = null):void {
			target.css('transform', 'translate(' + x + xSuffix + ',' + y + (ySuffix || xSuffix) + ') rotate(' + rotation + 'rad) scale(' + scale + ')');
		}

		public static setTransformByPixel(target:JQuery, x:number, y:number, rotation:number, scale:number):void {
			ViewUtil.setTransform(target, x, y, rotation, scale, 'px', 'px');
		}

		public static setTransformByPercent(target:JQuery, x:number, y:number, rotation:number, scale:number):void {
			ViewUtil.setTransform(target, x * 100, y * 100, rotation, scale, '%', '%');
		}

		public static setTransformByViewport(target:JQuery, x:number, y:number, rotation:number, scale:number):void {
			ViewUtil.setTransform(target, x * 100, y * 100, rotation, scale, 'vw', 'vh');
		}

		public static setOpacity(target:JQuery, opacity:number):void {
			target.css('opacity', opacity);
		}





		private constructor() {
		}
	}
}
