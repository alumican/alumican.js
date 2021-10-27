/// <reference path="../../../index.ts" />

namespace alm.drawer.view {

	import View = alm.view.View;
	import Easing = alm.math.Easing;
	import EasingFunction = alm.math.EasingFunction;
	import TweenCSS = alm.util.TweenCSS;

	export class DrawerForeground extends View<JQuery> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(content:JQuery, transition:DrawerTransition) {
			super(content);

			this.content = content;
			this.transition = transition;

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

			switch (this.transition) {
				case DrawerTransition.left:
					view.css({ top: 0, left: 0 });
					break;
				case DrawerTransition.right:
					view.css({ top: 0, right: 0 });
					break;
				case DrawerTransition.top:
					view.css({ top: 0, left: 0 });
					break;
				case DrawerTransition.bottom:
					view.css({ bottom: 0, left: 0 });
					break;
			}

			this.customShowTransition = null;
			this.customHideTransition = null;

			return view;
		}

		protected implReady():void {
		}

		protected implFinalize():void {
		}

		protected implShow(view:JQuery, useTransition:boolean):cmd.Command {
			const command = new cmd.Serial(
				new cmd.Func(():void => {
					view.css('visibility', 'visible');
				})
			);

			if (this.customShowTransition) {
				// custom effect
				command.addCommand(this.customShowTransition);
			} else if (this.transition === DrawerTransition.none) {
				// no effect
			} else if (this.transition === DrawerTransition.fade) {
				// fade effect
				command.addCommand(TweenCSS.fadeIn(view, useTransition ? 500 : 0, Easing.easeOutCubic, null, false));
			} else {
				// move effect
				let prop = '';
				let from = 0;
				switch (this.transition) {
					case DrawerTransition.left:
						prop = 'left';
						from = -this.getWidth();
						break;
					case DrawerTransition.right:
						prop = 'right';
						from = -this.getWidth();
						break;
					case DrawerTransition.top:
						prop = 'top';
						from = -this.getHeight();
						break;
					case DrawerTransition.bottom:
						prop = 'bottom';
						from = -this.getHeight();
						break;
				}
				if (prop !== '') {
					view.css(prop, from);
					command.addCommand(this.move(view, prop, from, 0, useTransition ? 500 : 0, Easing.easeOutQuart));
				}
			}

			return command;
		}

		protected implHide(view:JQuery, useTransition:boolean):cmd.Command {
			const command = new cmd.Serial();

			if (this.customHideTransition) {
				// custom effect
				command.addCommand(this.customHideTransition);
			} else if (this.transition === DrawerTransition.none) {
				// no effect
			} else if (this.transition === DrawerTransition.fade) {
				// fade effect
				command.addCommand(TweenCSS.fadeOut(view, useTransition ? 500 : 0, Easing.easeOutCubic, false, false));
			} else {
				// move effect
				let prop = '';
				let to = 0;
				switch (this.transition) {
					case DrawerTransition.left:
						prop = 'left';
						to = -this.getWidth();
						break;
					case DrawerTransition.right:
						prop = 'right';
						to = -this.getWidth();
						break;
					case DrawerTransition.top:
						prop = 'top';
						to = -this.getHeight();
						break;
					case DrawerTransition.bottom:
						prop = 'bottom';
						to = -this.getHeight();
						break;
				}
				if (prop !== '') {
					command.addCommand(this.move(view, prop, 0, to, useTransition ? 500 : 0, Easing.easeOutQuart));
				}
			}

			command.addCommand(new cmd.Func(():void => {
				view.css('visibility', 'hidden');
			}));

			return command;
		}

		private move(target:JQuery, prop:string, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart):cmd.Tween {
			let o:Object = { value: from };
			return new cmd.Tween(o, { value: to }, null, duration, easing, null, ():void => {
				const value:number = o['value'];
				target.css(prop, value);
			}, null);
		}

		private getWidth():number {
			return Math.round(this.getView().width());
		}

		private getHeight():number {
			return Math.round(this.getView().height());
		}

		public setCustomTransition(customShowTransition:cmd.Serial, customHideTransition:cmd.Serial):void {
			this.customShowTransition = customShowTransition;
			this.customHideTransition = customHideTransition;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private content:JQuery;
		private transition:DrawerTransition;
		private customShowTransition:cmd.Serial;
		private customHideTransition:cmd.Serial;
	}
}
