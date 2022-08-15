/// <reference path='../../index.ts' />

namespace alm.view {

	export class SelectionBehavior {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(target:ISelection) {
			this.target = target;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public select(useTransition:boolean = true):void {
			if (this.isSelected) return;
			this.isSelected = true;
			this.target.implSelectionChanged(this.isSelected, useTransition);
		}

		public deselect(useTransition:boolean = true):void {
			if (!this.isSelected) return;
			this.isSelected = false;
			this.target.implSelectionChanged(this.isSelected, useTransition);
		}

		public getIsSelected():boolean {
			return this.isSelected;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private target:ISelection;
		private isSelected:boolean;
	}
}
