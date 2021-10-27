/// <reference path="../../../index.ts" />

namespace alm.drawer.view {

	import View = alm.view.View;
	import TweenCSS = alm.util.TweenCSS;
	import Easing = alm.math.Easing;

	export class DrawerBackground extends View<JQuery> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(transition:DrawerTransition) {
			super();

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
			view.addClass('drawer-background');

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
					view.on('click', this.clickHandler);
				})
			);

			if (this.customShowTransition) {
				// custom effect
				command.addCommand(this.customShowTransition);
			} else if (this.transition == DrawerTransition.none) {
				// no effect
				command.addCommand(new cmd.Func(():void => {
					view.css('display', 'block');
				}));
			} else {
				// fade effect
				command.addCommand(TweenCSS.fadeIn(view, useTransition ? 500 : 0, Easing.easeOutQuart, 'block', false));
			}

			return command;
		}

		protected implHide(view:JQuery, useTransition:boolean):cmd.Command {
			const command = new cmd.Serial();

			if (this.customHideTransition) {
				// custom effect
				command.addCommand(this.customHideTransition);
			} else if (this.transition == DrawerTransition.none) {
				// no effect
				command.addCommand(new cmd.Func(():void => {
					view.css('display', 'none');
				}));
			} else {
				// fade effect
				command.addCommand(TweenCSS.fadeOut(view, useTransition ? 500 : 0, Easing.easeOutQuart, true, false));
			}

			command.addCommand(new cmd.Func(():void => {
				view.off('click', this.clickHandler);
			}));

			return command;
		}

		public setCustomTransition(customShowTransition:cmd.Serial, customHideTransition:cmd.Serial):void {
			this.customShowTransition = customShowTransition;
			this.customHideTransition = customHideTransition;
		}

		private clickHandler = ():void => {
			(<any>window).closeDrawer();
		};





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private transition:DrawerTransition;
		private customShowTransition:cmd.Serial;
		private customHideTransition:cmd.Serial;
	}
}
