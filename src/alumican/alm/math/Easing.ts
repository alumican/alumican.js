/// <reference path='../../index.ts' />

namespace alm.math {

	export type EasingFunction = (t:number)=>number;

	export class Easing {

		public static linear(t:number):number {
			return t;
		}





		public static easeInQuad(t:number):number {
			return (t /= 1) * t;
		}

		public static easeOutQuad(t:number):number {
			return -(t /= 1) * (t - 2);
		}

		public static easeInOutQuad(t:number):number {
			if ((t /= 0.5) < 1) return 0.5 * t * t;
			return -0.5 * ((--t) * (t - 2) - 1);
		}





		public static easeInCubic(t:number):number {
			return (t /= 1) * t * t;
		}

		public static easeOutCubic(t:number):number {
			return (t = t - 1) * t * t + 1;
		}

		public static easeInOutCubic(t:number):number {
			if ((t /= 0.5) < 1) return 0.5 * t * t * t;
			return 0.5 * ((t -= 2) * t * t + 2);
		}





		public static easeInQuart(t:number):number {
			return (t /= 1) * t * t * t;
		}

		public static easeOutQuart(t:number):number {
			return -((t = t - 1) * t * t * t - 1);
		}

		public static easeInOutQuart(t:number):number {
			if ((t /= 0.5) < 1) return 0.5 * t * t * t * t;
			return -0.5 * ((t -= 2) * t * t * t - 2);
		}





		public static easeInQuint(t:number):number {
			return (t /= 1) * t * t * t * t;
		}

		public static easeOutQuint(t:number):number {
			return ((t = t - 1) * t * t * t * t + 1);
		}

		public static easeInOutQuint(t:number):number {
			if ((t /= 0.5) < 1) return 0.5 * t * t * t * t * t;
			return 0.5 * ((t -= 2) * t * t * t * t + 2);
		}





		public static easeInSine(t:number):number {
			return -Math.cos(t * (Math.PI / 2)) + 1;
		}

		public static easeOutSine(t:number):number {
			return Math.sin(t * (Math.PI / 2));
		}

		public static easeInOutSine(t:number):number {
			return -0.5 * (Math.cos(Math.PI * t) - 1);
		}





		public static easeInExpo(t:number):number {
			if (t == 0) return 0;
			return Math.pow(2, 10 * (t - 1));
		}

		public static easeOutExpo(t:number):number {
			if (t == 1) return 1;
			return -Math.pow(2, -10 * t) + 1;
		}

		public static easeInOutExpo(t:number):number {
			if (t == 0) return 0;
			if (t == 1) return 1;
			if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
			return 0.5 * (-Math.pow(2, -10 * --t) + 2);
		}





		public static easeInCirc(t:number):number {
			return -(Math.sqrt(1 - (t /= 1) * t) - 1);
		}

		public static easeOutCirc(t:number):number {
			return Math.sqrt(1 - (t = t - 1) * t);
		}

		public static easeInOutCirc(t:number):number {
			if ((t /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
			return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
		}





		public static createEaseInElastic(s:number = 1.70158):EasingFunction {
			return function (t:number) {
				let p:number = 0;
				let a:number = 1;
				if (t == 0) return 0;
				if ((t /= 1) == 1) return 1;
				if (p == 0) p = 0.3;
				if (a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				return -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p);
			}
		}

		public static createEaseOutElastic(s:number = 1.70158):EasingFunction {
			return function (t:number) {
				let p:number = 0;
				let a:number = 1;
				if (t == 0) return 0;
				if ((t /= 1) == 1) return 1;
				if (p == 0) p = 0.3;
				if (a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
			}
		}

		public static createEaseInOutElastic(s:number = 1.70158):EasingFunction {
			return function (t:number) {
				let p:number = 0;
				let a:number = 1;
				if (t == 0) return 0;
				if ((t /= 0.5) == 2) return 1;
				if (p == 0) p = 0.3 * 1.5;
				if (a < 1) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				if (t < 1) return -0.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p);
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
			}
		}

		public static easeInElastic(t:number):number {
			return Easing.defaultEaseInElastic(t);
		}

		public static easeOutElastic(t:number):number {
			return Easing.defaultEaseOutElastic(t);
		}

		public static easeInOutElastic(t:number):number {
			return Easing.defaultEaseInOutElastic(t);
		}

		private static defaultEaseInElastic:EasingFunction = Easing.createEaseInElastic();
		private static defaultEaseOutElastic:EasingFunction = Easing.createEaseOutElastic();
		private static defaultEaseInOutElastic:EasingFunction = Easing.createEaseInOutElastic();





		public static createEaseInBack(s:number = 1.70158):EasingFunction {
			return function (t:number) {
				return (t /= 1) * t * ((s + 1) * t - s);
			}
		}

		public static createEaseOutBack(s:number = 1.70158):EasingFunction {
			return function (t:number) {
				return (t = t - 1) * t * ((s + 1) * t + s) + 1;
			}
		}

		public static createEaseInOutBack(s:number = 1.70158):EasingFunction {
			return function (t:number) {
				if ((t /= 0.5) < 1) return 0.5 * t * t * (((s *= 1.525) + 1) * t - s);
				return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
			}
		}

		public static easeInBack(t:number):number {
			return Easing.defaultEaseInElastic(t);
		}

		public static easeOutBack(t:number):number {
			return Easing.defaultEaseOutBack(t);
		}

		public static easeInOutBack(t:number):number {
			return Easing.defaultEaseInOutBack(t);
		}

		private static defaultEaseInBack:EasingFunction = Easing.createEaseInBack();
		private static defaultEaseOutBack:EasingFunction = Easing.createEaseOutBack();
		private static defaultEaseInOutBack:EasingFunction = Easing.createEaseInOutBack();





		public static easeInBounce(t:number):number {
			return 1 - Easing.easeOutBounce(1 - t);
		}

		public static easeOutBounce(t:number):number {
			if ((t /= 1) < (1 / 2.75)) {
				return 7.5625 * t * t;
			} else if (t < (2 / 2.75)) {
				return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
			} else if (t < (2.5 / 2.75)) {
				return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
			} else {
				return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
			}
		}

		public static easeInOutBounce(t:number):number {
			if (t < 0.5) return Easing.easeInBounce(t * 2) * 0.5;
			return Easing.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
		}
	}
}
