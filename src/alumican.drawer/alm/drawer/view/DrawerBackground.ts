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

		constructor() {
			super();
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

			return view;
		}

		protected implReady():void {
		}

		protected implFinalize():void {
		}

		protected implShow(view:JQuery, useTransition:boolean):cmd.Command {
			return new cmd.Serial(
				new cmd.Func(():void => {
					view.on('click', this.clickHandler);
				}),
				TweenCSS.fadeIn(view, useTransition ? 500 : 0, Easing.easeOutQuart, 'block', false, false)
			);
		}

		protected implHide(view:JQuery, useTransition:boolean):cmd.Command {
			return new cmd.Serial(
				TweenCSS.fadeOut(view, useTransition ? 500 : 0, Easing.easeOutQuart, true, false, false),
				new cmd.Func(():void => {
					view.off('click', this.clickHandler);
				})
			);
		}

		private clickHandler = ():void => {
			(<any>window).closeDrawer();
		};





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------
	}
}
