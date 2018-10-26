/// <reference path="../../reference.ts" />

namespace alm.view {

	export interface ISelection {

		implSelectionChanged(isSelected:boolean, useTransition:boolean):void;
	}
}