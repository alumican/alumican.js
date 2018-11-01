/// <reference path='../../include.ts' />

namespace alm.view {

	export interface IButton {

		implButtonOver(useTransition:boolean):void;
		implButtonOut(useTransition:boolean):void;
		implButtonDown(useTransition:boolean):void;
		implButtonUp(useTransition:boolean):void;
		implButtonClick(useTransition:boolean):void;
	}
}