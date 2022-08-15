/// <reference path='../../index.ts' />

namespace alm.util {

	import Cmd = alm.util.Cmd;
	import EasingFunction = alm.math.EasingFunction;

	export interface TweenViewParam {
		x?:number;
		y?:number;
		rotation?:number;
		scale?:number;
		opacity?:number;
	}

	export class TweenView {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(target:JQuery, xSuffix:string = 'px', ySuffix:string = 'px') {
			this.target = target;
			this.xSuffix = xSuffix;
			this.ySuffix = ySuffix;

			this.x = 0;
			this.y = 0;
			this.rotation = 0;
			this.scale = 1;
			this.opacity = 1;

			this.isNeedUpdateTransform = false;
			this.isNeedUpdateOpacity = false;
			this.command = null;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public dispose():void {
			this.target = null;
			this.command = Cmd.stop(this.command);
		}

		public set(p:TweenViewParam):void {
			this.tween(p, 0, null);
		}

		public tween(p:TweenViewParam, duration:number, easing:EasingFunction):void {
			const target:TweenViewParam = {};

			this.isNeedUpdateTransform = false;
			this.isNeedUpdateOpacity = false;

			if (p.x !== undefined) {
				target.x = p.x;
				this.isNeedUpdateTransform = true;
			}

			if (p.y !== undefined) {
				target.y = p.y;
				this.isNeedUpdateTransform = true;
			}

			if (p.rotation !== undefined) {
				target.rotation = p.rotation;
				this.isNeedUpdateTransform = true;
			}

			if (p.scale !== undefined) {
				target.scale = p.scale;
				this.isNeedUpdateTransform = true;
			}

			if (p.opacity !== undefined) {
				target.opacity = p.opacity;
				this.isNeedUpdateOpacity = true;
			}

			if (this.isNeedUpdateTransform || this.isNeedUpdateOpacity) {
				this.command = Cmd.stop(this.command);
				if (duration > 0) {
					this.command = new cmd.Tween(this, target, null, duration, easing, null, ():void => {
						this.apply();
					}, ():void => {
						this.command = null;
						this.isNeedUpdateTransform = false;
						this.isNeedUpdateOpacity = false;
					});
					this.command.execute();
				} else {
					this.x = target.x;
					this.y = target.y;
					this.rotation = target.rotation;
					this.scale = target.scale;
					this.opacity = target.opacity;
					this.apply();
					this.isNeedUpdateTransform = false;
					this.isNeedUpdateOpacity = false;
				}
			}
		}

		public stop():void {
			if (this.command) {
				this.command = Cmd.stop(this.command);
				this.isNeedUpdateTransform = false;
				this.isNeedUpdateOpacity = false;
			}
		}

		private apply():void {
			if (this.isNeedUpdateTransform) {
				ViewUtil.setTransform(this.target, this.x, this.y, this.rotation, this.scale, this.xSuffix, this.ySuffix);
			}
			if (this.isNeedUpdateOpacity) {
				ViewUtil.setOpacity(this.target, this.opacity);
			}
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private target:JQuery;
		private command:cmd.Tween;

		private x:number;
		private y:number;
		private rotation:number;
		private scale:number;
		private opacity:number;

		private isNeedUpdateTransform:boolean;
		private isNeedUpdateOpacity:boolean;

		public xSuffix:string;
		public ySuffix:string;
	}
}
