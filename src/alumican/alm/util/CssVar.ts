/// <reference path='../../index.ts' />

namespace alm.util {

	import Dom = alm.util.Dom;
	import Cmd = alm.util.Cmd;
	import EasingFunction = alm.math.EasingFunction;
	import Easing = alm.math.Easing;

	export class CssVar {

		public static readonly numberPattern:RegExp = new RegExp(/([+-]?\d*\.?\d*)(.*)/);





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(property:string, defaultValue:number = null, suffix:string = null) {
			this.reset(property, defaultValue, suffix);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public reset(property:string, value:number = null, suffix:string = null):void {
			this.property = property;
			this.value = value;
			this.suffix = suffix;

			this.cancelAnimation();

			if ((this.value === null) || (this.suffix === null)) {
				const result = CssVar.numberPattern.exec(Dom.getRootCss(this.property));
				let isNeedApply = false;

				if (this.value === null) {
					this.value = parseFloat(result[1]);
					if (isNaN(this.value)) {
						this.value = 0;
					}
				} else {
					isNeedApply = true;
				}

				if (this.value === null) {
					this.suffix = result[2] !== '' ? result[2] : '';
				} else {
					isNeedApply = true;
				}

				if (isNeedApply) {
					this.apply();
				}

			} else {
				this.apply();
			}
		}

		public getProperty():string {
			return this.property;
		}

		public setProperty(property:string):void {
			this.cancelAnimation();
			if (this.property !== property) {
				this.property = property;
				this.apply();
			}
		}

		public getValue():number {
			return this.value;
		}

		public setValue(value:number):void {
			this.cancelAnimation();
			if (this.value !== value) {
				this.value = value;
				this.apply();
			}
		}

		public getSuffix():string {
			return this.suffix;
		}

		public setSuffix(suffix:string):void {
			this.cancelAnimation();
			if (this.suffix !== suffix) {
				this.suffix = suffix;
				this.apply();
			}
		}

		public animate(to:number, from:number, duration:number = 1000, easing:EasingFunction = Easing.linear, execute:boolean = true):cmd.Tween {
			this.cancelAnimation();
			this.tween = new cmd.Tween(this, { value: to }, from !== null ? { value: from } : null, duration, easing, null, ():void => {
				this.apply();
			}, ():void => {
				this.tween = null;
			});
			if (execute) {
				this.tween.execute();
			}
			return this.tween;
		}

		public cancelAnimation():void {
			if (this.tween) {
				this.tween = Cmd.stop(this.tween);
			}
		}

		public animateTo(to:number, duration:number = 1000, easing:EasingFunction = Easing.linear, execute:boolean = true):cmd.Tween {
			return this.animate(to, null, duration, easing, execute);
		}

		public apply():void {
			Dom.setRootCss(this.property, this.value + this.suffix);
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private property:string;
		private value:number;
		private suffix:string;
		private tween:cmd.Tween;
	}
}
