/// <reference path="../../../index.ts" />

namespace alm.drawer.view {

	import View = alm.view.View;
	import Easing = alm.math.Easing;
	import EasingFunction = alm.math.EasingFunction;

	export class DrawerForeground extends View<JQuery> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(content:JQuery) {
			super(content);

			this.content = content;

			this.initialize();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implInitialize():JQuery {
			const view = jQuery('<div>');
			view.addClass('drawer-foreground');
			view.append(this.content);

			this.content.css('display', 'block');

			return view;
		}

		protected implReady():void {
		}

		protected implFinalize():void {
			if (this.content) {
				this.content.remove();
				this.content = null;
			}
		}

		protected implShow(view:JQuery, useTransition:boolean):cmd.Command {
			return this.moveLeft(view,  -this.getWidth(), 0, useTransition ? 500 : 0, Easing.easeOutQuart, false);
		}

		protected implHide(view:JQuery, useTransition:boolean):cmd.Command {
			return this.moveLeft(view, 0, -this.getWidth(), useTransition ? 500 : 0, Easing.easeOutQuart, false);
		}

		private moveLeft(target:JQuery, from:number, to:number, duration:number = 0.5, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			return this.move(target, 'left', from, to,  duration, easing, execute);
		}

		private moveRight(target:JQuery, from:number, to:number, duration:number = 0.5, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			return this.move(target, 'right', from, to,  duration, easing, execute);
		}

		private move(target:JQuery, prop:string, from:number, to:number, duration:number = 0.5, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
			let o:Object = { value: from };
			const tween:cmd.Tween = new cmd.Tween(o, { value: to }, null, duration, easing, null, ():void => {
				const value:number = o['value'];
				target.css(prop, value);
			}, null);
			if (execute) tween.execute();
			return tween;
		}

		private getWidth():number {
			return parseInt(this.getView().css('width'));
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private content:JQuery;
	}
}
