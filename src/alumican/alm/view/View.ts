/// <reference path='../../index.ts' />

namespace alm.view {

	import EventDispatcher = alm.event.EventDispatcher;
	import Logger = alm.debug.Logger;

	export abstract class View<T = any> extends EventDispatcher implements IView {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(view:T = null, id:string = null) {
			super();
			this.id = id != null ? id : String(View.viewCount);
			this.view = view;
			this.name = '';
			this.autoHideWithInit = true;
			this.isInitializing = false;
			this.isInitialized = false;
			this.isFinalizing = false;
			this.isFinalized = false;
			this.isReadying = false;
			this.isReadied = false;
			this.isShowing = false;
			this.isShown = true;
			this.isHiding = false;

			if (View.viewsById[this.id]) {
				Logger.warn('view id \'' + this.id + '\' is duplicate');
			}
			View.viewsById[this.id] = this;
			++View.viewCount;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public initialize():void {
			if (this.isInitializing || this.isInitialized) return;
			this.isInitializing = true;
			this.dispatchEvent(new ViewEvent(ViewEvent.INITIALIZE_BEGIN, this));

			//if (View.viewsById[this.id] == null) {
			//	View.viewsById[this.id] = this;
			//}

			this.view = this.implInitialize();
			if (this.isInitializing) {
				throwError(this.name || this, 'view is not assigned', !this.view);
				if (this.autoHideWithInit) {
					this.hide(false);
				}
				this.isInitializing = false;
				this.isInitialized = true;
				this.dispatchEvent(new ViewEvent(ViewEvent.INITIALIZE_END, this));
			} else {
				// finalized while initializing
				this.view = null;
			}
		}

		public ready():void {
			if (this.isReadying || this.isReadied) return;
			this.isReadying = true;
			throwError(this.name || this, 'ready() must be called after initialize()', !this.isInitialized);
			this.dispatchEvent(new ViewEvent(ViewEvent.READY_BEGIN, this));
			this.implReady();
			this.isReadying = false;
			this.isReadied = true;
			this.dispatchEvent(new ViewEvent(ViewEvent.READY_END, this));
		}

		public finalize():void {
			if (!this.isInitializing && !this.isInitialized) return;
			if (this.isFinalizing && this.isFinalized) return;
			this.isFinalizing = true;
			this.dispatchEvent(new ViewEvent(ViewEvent.FINALIZE_BEGIN, this));
			this.implFinalize();
			this.isFinalizing = false;
			this.isFinalized = true;
			this.isInitializing = false;
			this.isInitialized = false;
			this.dispatchEvent(new ViewEvent(ViewEvent.FINALIZE_END, this));

			delete View.viewsById[this.id];
			View.viewsById[this.id] = null;
		}

		public show(useTransition:boolean = true):void {
			if (this.isShown) return;
			this.getShowCommand(useTransition).execute();
		}

		public hide(useTransition:boolean = true):void {
			if (!this.isShown) return;
			this.getHideCommand(useTransition).execute();
		}

		public getShowCommand(useTransition:boolean = true):cmd.Command {
			const command:cmd.Serial = new cmd.Serial();
			command.addCommand(
				new cmd.Func(():void => {
					if (this.isShown) return;
					throwError(this.name || this, 'getShowCommand() is must be called after initialize()', this.isInitializing || !this.isInitialized);
					throwWarn(this.name || this, 'getShowCommand() is must be called after ready()', this.isReadying|| !this.isReadied);
					this.isShown = true;
					this.isShowing = true;
					this.isHiding = false;

					if (this.showCommand) {
						this.showCommand.interrupt();
						this.showCommand = null;
					}
					if (this.hideCommand) {
						this.hideCommand.interrupt();
						this.hideCommand = null;
					}

					this.showCommand = command;
					this.dispatchEvent(new ViewEvent(ViewEvent.SHOW_BEGIN, this));

					command.insertCommand(
						this.implShow(this.view, useTransition),
						new cmd.Func(():void => {
							this.showCommand = null;
							this.isShowing = false;
							this.dispatchEvent(new ViewEvent(ViewEvent.SHOW_END, this));
						})
					);
				})
			);
			return command;
		}

		public getHideCommand(useTransition:boolean = true):cmd.Command {
			const command:cmd.Serial = new cmd.Serial();
			command.addCommand(
				new cmd.Func(():void => {
					if (!this.isShown) return;
					if (!this.isInitializing) {
						throwError(this.name || this, 'getHideCommand() is must be called after initialize()', this.isInitializing || !this.isInitialized);
						throwWarn(this.name || this, 'getHideCommand() is must be called after ready()', this.isReadying || !this.isReadied);
					}
					this.isShown = false;
					this.isShowing = false;
					this.isHiding = true;

					if (this.showCommand) {
						this.showCommand.interrupt();
						this.showCommand = null;
					}
					if (this.hideCommand) {
						this.hideCommand.interrupt();
						this.hideCommand = null;
					}

					this.hideCommand = command;
					this.dispatchEvent(new ViewEvent(ViewEvent.HIDE_BEGIN, this));

					command.insertCommand(
						this.implHide(this.view, useTransition),
						new cmd.Func(():void => {
							this.hideCommand = null;
							this.isHiding = false;
							this.dispatchEvent(new ViewEvent(ViewEvent.HIDE_END, this));
						})
					);
				})
			);
			return command;
		}

		public getIsInitializing():boolean {
			return this.isInitializing;
		}

		public getIsInitialized():boolean {
			return this.isInitialized;
		}

		public getIsReadying():boolean {
			return this.isReadying;
		}

		public getIsReadied():boolean {
			return this.isReadied;
		}

		public getIsShowing():boolean {
			return this.isShowing;
		}

		public getIsShown():boolean {
			return this.isShown;
		}

		public getIsHiding():boolean {
			return this.isHiding;
		}

		public getIsHidden():boolean {
			return !this.isShown;
		}

		public getIsFinalizing():boolean {
			return this.isFinalizing;
		}

		public getIsFinalized():boolean {
			return this.isFinalized;
		}

		public getId():string {
			return this.id;
		}

		public getView():T {
			return this.view;
		}

		public getName():string {
			return this.name;
		}

		public setName(value:string):void {
			this.name = value;
		}

		public getAutoHideWithInit():boolean {
			return this.autoHideWithInit;
		}

		public setAutoHideWithInit(value:boolean):void {
			this.autoHideWithInit = value;
		}





		protected abstract implInitialize():T;
		protected abstract implReady():void;
		protected abstract implFinalize():void;
		protected abstract implShow(view:T, useTransition:boolean):cmd.Command;
		protected abstract implHide(view:T, useTransition:boolean):cmd.Command;





		public static getViewById(id:string):View {
			return View.viewsById[id];
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private id:string;
		private view:T;
		private name:string;
		private autoHideWithInit:boolean;
		private showCommand:cmd.Command;
		private hideCommand:cmd.Command;
		private isInitializing:boolean;
		private isInitialized:boolean;
		private isFinalizing:boolean;
		private isFinalized:boolean;
		private isReadying:boolean;
		private isReadied:boolean;
		private isShowing:boolean;
		private isShown:boolean;
		private isHiding:boolean;

		private static viewCount:number = 0;
		private static viewsById:util.Hash<View> = {};
	}
}
