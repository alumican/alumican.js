/// <reference path='../../include.ts' />

namespace alm.util {

	export class JQueryUtil {

		public static fadeTo(target:JQuery, opacity:number, duration:number, easing:EasingFunction, switchDisplayTo:string = '', switchVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			let o:Object = { value: parseInt(target.css('opacity')) };
			const tween:cmd.Tween = new cmd.Tween(o, { value: opacity }, null, duration, easing, ():void => {
				if (opacity > 0) {
					if (switchDisplayTo != '') target.css('display', switchDisplayTo);
					if (switchVisibility) target.css('visibility', 'visible');
				}
			}, ():void => {
				target.css('opacity', o['value']);
			}, ():void => {
				if (opacity <= 0) {
					if (switchDisplayTo != '') target.css('display', 'none');
					if (switchVisibility) target.css('visibility', 'hidden');
				}
			});
			if (execute) tween.execute();
			return tween;
		}

		public static fadeInJquery(target:JQuery, duration:number, easing:EasingFunction, switchDisplayTo:string = '', switchVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			return JQueryUtil.fadeTo(target, 1, duration, easing, switchDisplayTo, switchVisibility, execute);
		}

		public static fadeOutJquery(target:JQuery, duration:number, easing:EasingFunction, switchDisplayTo:string = '', switchVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			return JQueryUtil.fadeTo(target, 0, duration, easing, switchDisplayTo, switchVisibility, execute);
		}

		private constructor() {}
	}
}