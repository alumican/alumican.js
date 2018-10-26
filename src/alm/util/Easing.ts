namespace alm.util {

	export type EasingFunction = (t:number, b:number, c:number, d:number)=>number;

	export class Easing {

		public static linear(t:number, b:number, c:number, d:number):number {
			return c * t / d + b;
		}





		public static easeInQuad(t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t + b;
		}

		public static easeOutQuad(t:number, b:number, c:number, d:number):number {
			return (-c) * (t /= d) * (t - 2) + b;
		}

		public static easeInOutQuad(t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return (-c) / 2 * ((--t) * (t - 2) - 1) + b;
		}





		public static easeInCubic(t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t * t + b;
		}

		public static easeOutCubic(t:number, b:number, c:number, d:number):number {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		}

		public static easeInOutCubic(t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		}





		public static easeInQuart(t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t * t * t + b;
		}

		public static easeOutQuart(t:number, b:number, c:number, d:number):number {
			return (-c) * ((t = t / d - 1) * t * t * t - 1) + b;
		}

		public static easeInOutQuart(t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return (-c) / 2 * ((t -= 2) * t * t * t - 2) + b;
		}





		public static easeInQuint(t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t * t * t * t + b;
		}

		public static easeOutQuint(t:number, b:number, c:number, d:number):number {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		}

		public static easeInOutQuint(t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		}





		public static easeInSine(t:number, b:number, c:number, d:number):number {
			return (-c) * Math.cos(t / d * (Math.PI / 2)) + c + b;
		}

		public static easeOutSine(t:number, b:number, c:number, d:number):number {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		}

		public static easeInOutSine(t:number, b:number, c:number, d:number):number {
			return (-c) / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		}





		public static easeInExpo(t:number, b:number, c:number, d:number):number {
			if (t == 0) return b;
			return c * Math.pow(2, 10 * (t / d - 1)) + b;
		}

		public static easeOutExpo(t:number, b:number, c:number, d:number):number {
			if (t == d) return b + c;
			return c * (-Math.pow(2, -10 * t / d) + 1) + b;
		}

		public static easeInOutExpo(t:number, b:number, c:number, d:number):number {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}





		public static easeInCirc(t:number, b:number, c:number, d:number):number {
			return (-c) * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		}

		public static easeOutCirc(t:number, b:number, c:number, d:number):number {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		}

		public static easeInOutCirc(t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return (-c) / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		}





		public static createEaseInElastic(s:number = 1.70158):EasingFunction {
			return function (t:number, b:number, c:number, d:number) {
				let p:number = 0;
				let a:number = c;
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (p == 0) p = d * 0.3;
				if (a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return (-a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p )) + b;
			}
		}

		public static createEaseOutElastic(s:number = 1.70158):EasingFunction {
			return function (t:number, b:number, c:number, d:number) {
				let p:number = 0;
				let a:number = c;
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (p == 0) p = d * 0.3;
				if (a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
			}
		}

		public static createEaseInOutElastic(s:number = 1.70158):EasingFunction {
			return function (t:number, b:number, c:number, d:number) {
				let p:number = 0;
				let a:number = c;
				if (t == 0) return b;
				if ((t /= d / 2) == 2) return b + c;
				if (p == 0) p = d * (0.3 * 1.5);
				if (a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
			}
		}

		public static easeInElastic(t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseInElastic(t, b, c, d);
		}

		public static easeOutElastic(t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseOutElastic(t, b, c, d);
		}

		public static easeInOutElastic(t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseInOutElastic(t, b, c, d);
		}

		private static defaultEaseInElastic:EasingFunction = Easing.createEaseInElastic();
		private static defaultEaseOutElastic:EasingFunction = Easing.createEaseOutElastic();
		private static defaultEaseInOutElastic:EasingFunction = Easing.createEaseInOutElastic();





		public static createEaseInBack(s:number = 1.70158):EasingFunction {
			return function (t:number, b:number, c:number, d:number) {
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			}
		}

		public static createEaseOutBack(s:number = 1.70158):EasingFunction {
			return function (t:number, b:number, c:number, d:number) {
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			}
		}

		public static createEaseInOutBack(s:number = 1.70158):EasingFunction {
			return function (t:number, b:number, c:number, d:number) {
				if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
			}
		}

		public static easeInBack(t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseInElastic(t, b, c, d);
		}

		public static easeOutBack(t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseOutBack(t, b, c, d);
		}

		public static easeInOutBack(t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseInOutBack(t, b, c, d);
		}

		private static defaultEaseInBack:EasingFunction = Easing.createEaseInBack();
		private static defaultEaseOutBack:EasingFunction = Easing.createEaseOutBack();
		private static defaultEaseInOutBack:EasingFunction = Easing.createEaseInOutBack();





		public static easeInBounce(t:number, b:number, c:number, d:number):number {
			return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
		}

		public static easeOutBounce(t:number, b:number, c:number, d:number):number {
			if ((t /= d) < (1 / 2.75)) {
				return c * (7.5625 * t * t) + b;
			} else if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
			} else if (t < (2.5 / 2.75)) {
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
			} else {
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
			}
		}

		public static easeInOutBounce(t:number, b:number, c:number, d:number):number {
			if (t < d / 2) return Easing.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
			return Easing.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
		}
	}
}