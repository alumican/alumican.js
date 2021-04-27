/// <reference path="../../index.ts" />

namespace alm.drawer {

	import DrawerContainer = alm.drawer.view.DrawerContainer;

	export class Drawer {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(content:JQuery, transition:DrawerTransition, drawerId:string = 'drawer') {
			this.container = new DrawerContainer(content, transition, drawerId);
			this.container.ready();

			(<any>window).openDrawer = this.container.show.bind(this.container);
			(<any>window).closeDrawer = this.container.hide.bind(this.container);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public open(useTransition:boolean = true):void {
			this.container.show(useTransition);
		}

		public close(useTransition:boolean = true):void {
			this.container.hide(useTransition);
		}

		public dispose():void {
			this.container.finalize();
			this.container = null;

			delete (<any>window).openDrawer;
			delete (<any>window).closeDrawer;
		}

		public getView():JQuery {
			return this.container.getView();
		}

		public getContentView():JQuery {
			return this.container.getContent();
		}

		public getDrawerId():string {
			return this.getDrawerId();
		}

		public setBackgroundCustomTransition(showCommand:cmd.Serial, hideCommand:cmd.Serial):void {
			this.container.setBackgroundCustomTransition(showCommand, hideCommand);
		}

		public setForegroundCustomTransition(showCommand:cmd.Serial, hideCommand:cmd.Serial):void {
			this.container.setForegroundCustomTransition(showCommand, hideCommand);
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private container:DrawerContainer;
	}
}
