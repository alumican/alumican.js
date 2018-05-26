namespace alm.util {

	export type EasingFunction = (x:number, t:number, b:number, c:number, d:number)=>number;

	export class Easing {

		public static linear(x:number, t:number, b:number, c:number, d:number):number {
			return c * t / d + b;
		}





		public static easeInQuad(x:number, t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t + b;
		}

		public static easeOutQuad(x:number, t:number, b:number, c:number, d:number):number {
			return (-c) * (t /= d) * (t - 2) + b;
		}

		public static easeInOutQuad(x:number, t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return (-c) / 2 * ((--t) * (t - 2) - 1) + b;
		}





		public static easeInCubic(x:number, t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t * t + b;
		}

		public static easeOutCubic(x:number, t:number, b:number, c:number, d:number):number {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		}

		public static easeInOutCubic(x:number, t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		}





		public static easeInQuart(x:number, t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t * t * t + b;
		}

		public static easeOutQuart(x:number, t:number, b:number, c:number, d:number):number {
			return (-c) * ((t = t / d - 1) * t * t * t - 1) + b;
		}

		public static easeInOutQuart(x:number, t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return (-c) / 2 * ((t -= 2) * t * t * t - 2) + b;
		}





		public static easeInQuint(x:number, t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t * t * t * t + b;
		}

		public static easeOutQuint(x:number, t:number, b:number, c:number, d:number):number {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		}

		public static easeInOutQuint(x:number, t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		}





		public static easeInSine(x:number, t:number, b:number, c:number, d:number):number {
			return (-c) * Math.cos(t / d * (Math.PI / 2)) + c + b;
		}

		public static easeOutSine(x:number, t:number, b:number, c:number, d:number):number {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		}

		public static easeInOutSine(x:number, t:number, b:number, c:number, d:number):number {
			return (-c) / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		}





		public static easeInExpo(x:number, t:number, b:number, c:number, d:number):number {
			if (t == 0) return b;
			return c * Math.pow(2, 10 * (t / d - 1)) + b;
		}

		public static easeOutExpo(x:number, t:number, b:number, c:number, d:number):number {
			if (t == d) return b + c;
			return c * (-Math.pow(2, -10 * t / d) + 1) + b;
		}

		public static easeInOutExpo(x:number, t:number, b:number, c:number, d:number):number {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}





		public static easeInCirc(x:number, t:number, b:number, c:number, d:number):number {
			return (-c) * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		}

		public static easeOutCirc(x:number, t:number, b:number, c:number, d:number):number {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		}

		public static easeInOutCirc(x:number, t:number, b:number, c:number, d:number):number {
			if ((t /= d / 2) < 1) return (-c) / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		}





		public static createEaseInElastic(s:number = 1.70158):EasingFunction {
			return function (x:number, t:number, b:number, c:number, d:number) {
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
			return function (x:number, t:number, b:number, c:number, d:number) {
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
			return function (x:number, t:number, b:number, c:number, d:number) {
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

		public static easeInElastic(x:number, t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseInElastic(x, t, b, c, d);
		}

		public static easeOutElastic(x:number, t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseOutElastic(x, t, b, c, d);
		}

		public static easeInOutElastic(x:number, t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseInOutElastic(x, t, b, c, d);
		}

		private static defaultEaseInElastic:EasingFunction = Easing.createEaseInElastic();
		private static defaultEaseOutElastic:EasingFunction = Easing.createEaseOutElastic();
		private static defaultEaseInOutElastic:EasingFunction = Easing.createEaseInOutElastic();





		public static createEaseInBack(s:number = 1.70158):EasingFunction {
			return function (x:number, t:number, b:number, c:number, d:number) {
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			}
		}

		public static createEaseOutBack(s:number = 1.70158):EasingFunction {
			return function (x:number, t:number, b:number, c:number, d:number) {
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			}
		}

		public static createEaseInOutBack(s:number = 1.70158):EasingFunction {
			return function (x:number, t:number, b:number, c:number, d:number) {
				if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
			}
		}

		public static easeInBack(x:number, t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseInElastic(x, t, b, c, d);
		}

		public static easeOutBack(x:number, t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseOutBack(x, t, b, c, d);
		}

		public static easeInOutBack(x:number, t:number, b:number, c:number, d:number):number {
			return Easing.defaultEaseInOutBack(x, t, b, c, d);
		}

		private static defaultEaseInBack:EasingFunction = Easing.createEaseInBack();
		private static defaultEaseOutBack:EasingFunction = Easing.createEaseOutBack();
		private static defaultEaseInOutBack:EasingFunction = Easing.createEaseInOutBack();





		public static easeInBounce(x:number, t:number, b:number, c:number, d:number):number {
			return c - Easing.easeOutBounce(x, d - t, 0, c, d) + b;
		}

		public static easeOutBounce(x:number, t:number, b:number, c:number, d:number):number {
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

		public static easeInOutBounce(x:number, t:number, b:number, c:number, d:number):number {
			if (t < d / 2) return Easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
			return Easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
		}
	}
}