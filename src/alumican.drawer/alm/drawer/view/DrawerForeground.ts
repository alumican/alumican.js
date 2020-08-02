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

		constructor(content:JQuery, position:DrawerPosition) {
			super(content);

			this.content = content;
			this.position = position;

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

			switch (this.position) {
				case DrawerPosition.left:
					view.css({ top: 0, left: 0 });
					break;
				case DrawerPosition.right:
					view.css({ top: 0, right: 0 });
					break;
				case DrawerPosition.top:
					view.css({ top: 0, left: 0 });
					break;
				case DrawerPosition.bottom:
					view.css({ bottom: 0, left: 0 });
					break;
			}

			return view;
		}

		protected implReady():void {
		}

		protected implFinalize():void {
		}

		protected implShow(view:JQuery, useTransition:boolean):cmd.Command {
			const command = new cmd.Serial(new cmd.Func(():void => {
				view.css('visibility', 'visible');
			}));

			let prop = '';
			let from = 0;
			switch (this.position) {
				case DrawerPosition.left:
					prop = 'left';
					from = -this.getWidth();
					break;
				case DrawerPosition.right:
					prop = 'right';
					from = -this.getWidth();
					break;
				case DrawerPosition.top:
					prop = 'top';
					from = -this.getHeight();
					break;
				case DrawerPosition.bottom:
					prop = 'bottom';
					from = -this.getHeight();
					break;
			}

			if (prop !== '') {
				view.css(prop, from);
				command.addCommand(this.move(view, prop, from, 0, useTransition ? 500 : 0, Easing.easeOutQuart, false));
			}

			return command;
		}

		protected implHide(view:JQuery, useTransition:boolean):cmd.Command {
			const command = new cmd.Serial();

			let prop = '';
			let to = 0;
			switch (this.position) {
				case DrawerPosition.left:
					prop = 'left';
					to = -this.getWidth();
					break;
				case DrawerPosition.right:
					prop = 'right';
					to = -this.getWidth();
					break;
				case DrawerPosition.top:
					prop = 'top';
					to = -this.getHeight();
					break;
				case DrawerPosition.bottom:
					prop = 'bottom';
					to = -this.getHeight();
					break;
			}

			if (prop !== '') {
				command.addCommand(this.move(view, prop, 0, to, useTransition ? 500 : 0, Easing.easeOutQuart, false));
			}

			command.addCommand(new cmd.Func(():void => {
				view.css('visibility', 'hidden');
			}));

			return command;
		}

		private move(target:JQuery, prop:string, from:number, to:number, duration:number = 500, easing:EasingFunction = Easing.easeOutQuart, execute:boolean = true):cmd.Tween {
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

		private getHeight():number {
			return parseInt(this.getView().css('height'));
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private content:JQuery;
		private position:DrawerPosition;
	}
}
