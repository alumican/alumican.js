/// <reference path='../../index.ts' />

namespace alm.view {

	import IEventDispatcher = alm.event.IEventDispatcher;

	export interface IView<T = any> extends IEventDispatcher {

		initialize():void;
		ready():void;
		finalize():void;

		show(useTransition:boolean):void;
		hide(useTransition:boolean):void;

		getShowCommand(useTransition:boolean):cmd.Command;
		getHideCommand(useTransition:boolean):cmd.Command;

		getIsInitializing():boolean;
		getIsInitialized():boolean;
		getIsReadying():boolean;
		getIsReadied():boolean;
		getIsShowing():boolean;
		getIsShown():boolean;
		getIsHiding():boolean;
		getIsHidden():boolean;
		getIsFinalizing():boolean;
		getIsFinalized():boolean;

		getId():string;
		getView():T;
		getName():string;
		setName(value:string):void
		getAutoHideWithInit():boolean;
		setAutoHideWithInit(value:boolean):void;
	}
}
