/// <reference path="../../../index.ts" />

namespace alm.drawer.view {

	import View = alm.view.View;

	export class DrawerContainer extends View<JQuery> {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(content:JQuery, position:DrawerPosition, drawerId:string = 'drawer') {
			super(content);

			this.content = content;
			this.position = position;
			this.drawerId = drawerId;

			this.initialize();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implInitialize():JQuery {
			const view:JQuery = jQuery('<div>');
			view.attr('id', this.drawerId);
			view.addClass('drawer');

			this.background = new DrawerBackground();
			this.foreground = new DrawerForeground(this.content, this.position);

			return view;
		}

		protected implReady():void {
			const view = this.getView();

			this.background.ready();
			view.append(this.background.getView());

			this.foreground.ready();
			view.append(this.foreground.getView());

			jQuery('body').append(view);
		}

		protected implFinalize():void {
			this.background.finalize();
			this.background = null;

			this.foreground.finalize();
			this.foreground = null;

			this.content = null;
		}

		protected implShow(view:JQuery, useTransition:boolean):cmd.Command {
			return new cmd.Serial(
				new cmd.Func(():void => {
					view.css('display', 'block');
				}),
				new cmd.Parallel(
					this.background.getShowCommand(useTransition),
					this.foreground.getShowCommand(useTransition),
				)
			);
		}

		protected implHide(view:JQuery, useTransition:boolean):cmd.Command {
			return new cmd.Serial(
				new cmd.Parallel(
					this.background.getHideCommand(useTransition),
					this.foreground.getHideCommand(useTransition),
				),
				new cmd.Func(():void => {
					view.css('display', 'none');
				})
			);
		}

		public getContent():JQuery {
			return this.content;
		}

		public getDrawerId():string {
			return this.drawerId;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private background:DrawerBackground;
		private foreground:DrawerForeground;

		private content:JQuery;
		private position:DrawerPosition;
		private drawerId:string;
	}
}
