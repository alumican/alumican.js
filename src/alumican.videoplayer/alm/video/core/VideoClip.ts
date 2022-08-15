/// <reference path="../../../index.ts" />

namespace alm.video {

	import Cmd = alm.util.Cmd;
	import Easing = alm.math.Easing;
	import EventDispatcher = alm.event.EventDispatcher;

	export class VideoClip extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(volume:number) {
			super();
			this.volume = this.defaultVolume = volume;
			this.isInitializing = true;
		}


		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected setup():void {
			this.isShowing = true;
			this.isPlaying = false;
			this.opacity = 1;
			this.view = document.createElement('div');
			this.view.classList.add('video-clip');
			this.implSetup(this.view, this.volume);
			this.hide(0, 0);
			this.isInitializing = false;
		}

		public start(duration:number):void {
			if (this.isPlaying) return;
			this.isPlaying = true;
			this.show(duration);
		}

		public stop(duration:number, delay:number):void {
			if (!this.isPlaying) return;
			this.isPlaying = false;
			this.hide(duration, delay);
		}

		public rewind():void {
			this.implRewind(this.view);
		}

		public restart():void {
			if (this.isPlaying) {
				this.implRewind(this.view);
				this.implStart(this.view);
			} else {
				this.start(0);
			}
		}

		public dispose():void {
			this.displayTween = Cmd.stop(this.displayTween);
			this.implDispose(this.view);
			if (this.view) {
				this.view.remove();
				this.view = null;
			}
		}

		private show(duration:number):void {
			if (this.isShowing) return;
			this.isShowing = true;

			const view = this.getView();
			if (this.displayTween) {
				this.displayTween = Cmd.stop(this.displayTween);
			}

			if (duration > 0) {
				// animate
				this.displayTween = new cmd.Tween(this, { opacity: 1 }, null, duration, Easing.easeOutQuad, ():void => {
					view.style.display = 'block';
					this.implStart(this.view);
				}, ():void => {
					view.style.opacity = this.opacity.toString();
					this.applyVolume();
				}, ():void => {
					this.displayTween = null;
				});
				this.displayTween.execute();

			} else {
				// no animation
				view.style.display = 'block';
				this.implStart(this.view);
				this.opacity = 1;
				view.style.opacity = this.opacity.toString();
				this.applyVolume();
			}
		}

		private hide(duration:number, delay:number):void {
			if (!this.isShowing) return;
			this.isShowing = false;

			const view = this.getView();
			if (this.displayTween) {
				this.displayTween = Cmd.stop(this.displayTween);
			}

			if (duration > 0) {
				// animate
				const tween = new cmd.Tween(this, { opacity: 0 }, null, duration, Easing.easeOutQuad, null, ():void => {
					view.style.opacity = this.opacity.toString();
					this.applyVolume();
				}, ():void => {
					view.style.display = 'none';
					this.displayTween = null;
					if (!this.isInitializing) {
						this.implStop(this.view);
					}
				});
				if (delay > 0) {
					this.displayTween = new cmd.Serial(
						new cmd.Wait(delay),
						tween,
					);
				} else {
					this.displayTween = tween;
				}
				this.displayTween.execute();

			} else {
				// no animation
				this.opacity = 0;
				view.style.opacity = this.opacity.toString();
				this.applyVolume();
				view.style.display = 'none';
				if (!this.isInitializing) {
					this.implStop(this.view);
				}
			}
		}

		private applyVolume():void {
			if (this.defaultVolume > 0) {
				this.volume = this.defaultVolume * this.opacity;
				this.implUpdateVolume(this.volume);
			}
		}

		protected dispatchVideoEvent(eventType:string):void {
			this.dispatchEvent(new VideoClipEvent(eventType, this));
		}

		public getView():HTMLElement {
			return this.view;
		}

		public getIsPlaying():boolean {
			return this.isPlaying;
		}

		public getDefaultVolume():number {
			return this.defaultVolume;
		}

		public getVolume():number {
			return this.volume;
		}

		public getOpacity():number {
			return this.opacity;
		}





		protected implSetup(view:HTMLElement, volume:number):void {
		}

		protected implStart(view:HTMLElement):void {
		}

		protected implStop(view:HTMLElement):void {
		}

		protected implRewind(view:HTMLElement):void {
		}

		protected implDispose(view:HTMLElement):void {
		}

		protected implUpdateVolume(volume:number):void {
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private view:HTMLElement;
		private isInitializing:boolean;
		private isPlaying:boolean;
		private isShowing:boolean;
		private defaultVolume:number;
		private opacity:number;
		private volume:number;
		private displayTween:cmd.Command;
	}
}
