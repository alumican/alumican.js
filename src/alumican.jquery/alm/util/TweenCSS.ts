/// <reference path='../../index.ts' />

namespace alm.util {

	import EasingFunction = alm.math.EasingFunction;
	import Easing = alm.math.Easing;

	export class TweenCSS {

		public static scale(target:JQuery, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			let o:Object = { value: from };
			const tween:cmd.Tween = new cmd.Tween(o, { value: to }, null, duration, easing, null, ():void => {
				const value:number = o['value'];
				target.css('transform', 'scale(' + value + ',' + value + ')');
			}, null);
			if (execute) tween.execute();
			return tween;
		}





		public static fade(target:JQuery, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, updateDisplayTo:string = null, updateVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			let o:Object = { value: from };
			const tween:cmd.Tween = new cmd.Tween(o, { value: to }, null, duration, easing, ():void => {
				if (to > 0) {
					if (updateDisplayTo) {
						target.css('display', updateDisplayTo);
					}
					if (updateVisibility) {
						target.css('visibility', 'visible');
					}
				}
			}, ():void => {
				target.css('opacity', o['value']);
			}, ():void => {
				if (to <= 0) {
					if (updateDisplayTo) {
						target.css('display', 'none');
					}
					if (updateVisibility) {
						target.css('visibility', 'hidden');
					}
				}
			});
			if (execute) tween.execute();
			return tween;
		}

		public static fadeTo(target:JQuery, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, updateDisplayTo:string = null, updateVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			return TweenCSS.fade(target, parseFloat(target.css('opacity')), to, duration, easing, updateDisplayTo, updateVisibility, execute);
		}

		public static fadeIn(target:JQuery, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, updateDisplayTo:string = null, updateVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			return TweenCSS.fadeTo(target, 1, duration, easing, updateDisplayTo, updateVisibility, execute);
		}

		public static fadeOut(target:JQuery, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, updateDisplay:boolean = false, updateVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			return TweenCSS.fadeTo(target, 0, duration, easing, updateDisplay ? 'none' : '', updateVisibility, execute);
		}





		private static movePosition(target:JQuery, property:string, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			let o:Object = { value: from };
			const tween:cmd.Tween = new cmd.Tween(o, { value: to }, null, duration, easing, null, ():void => {
				target.css(property, o['value']);
			});
			if (execute) tween.execute();
			return tween;
		}

		public static moveLeft(target:JQuery, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			return TweenCSS.movePosition(target, 'left', from, to, duration, easing, execute);
		}

		public static moveRight(target:JQuery, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			return TweenCSS.movePosition(target, 'right', from, to, duration, easing, execute);
		}

		public static moveTop(target:JQuery, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			return TweenCSS.movePosition(target, 'top', from, to, duration, easing, execute);
		}

		public static moveBottom(target:JQuery, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			return TweenCSS.movePosition(target, 'bottom', from, to, duration, easing, execute);
		}





		public static show(target:JQuery, updateDisplayTo:string = 'block', updateVisibility:boolean = true, execute:boolean = true):cmd.Func {
			const func:cmd.Func = new cmd.Func(():void => {
				if (updateDisplayTo != '') {
					target.css('display', updateDisplayTo);
				}
				if (updateVisibility) {
					target.css('visibility', 'visible');
				}
			});
			if (execute) func.execute();
			return func;
		}

		public static hide(target:JQuery, updateDisplay:boolean = false, updateVisibility:boolean = true, execute:boolean = true):cmd.Func {
			const func:cmd.Func = new cmd.Func(():void => {
				if (updateDisplay) {
					target.css('display', 'none');
				}
				if (!updateVisibility) {
					target.css('visibility', 'hidden');
				}
			});
			if (execute) func.execute();
			return func;
		}





		private constructor() {}
	}
}
