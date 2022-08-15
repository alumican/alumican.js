/// <reference path="../../../index.ts" />

namespace alm.video {

	export class StaticImageClip extends VideoClip {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(url:string, duration:number) {
			super(0);
			this.url = url;
			this.duration = duration;
			this.timerId = -1;
			this.setup();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implSetup(view:HTMLElement, volume:number):void {
			this.isReady = false;

			this.image = new Image();
			this.image.addEventListener('load', this.imageLoadHandler);
			this.image.classList.add('video-media');
			this.image.src = this.url;

			this.getView().appendChild(this.image);
		}

		protected implStart(view:HTMLElement):void {
			this.startTimer();
		}

		protected implStop(view:HTMLElement):void {
			this.stopTimer();
		}

		protected implRewind(view:HTMLElement):void {
			this.stopTimer();
			this.startTimer();
		}

		protected implDispose(view:HTMLElement):void {
			this.stopTimer();
			view.removeChild(this.image);

			this.image.removeEventListener('load', this.imageLoadHandler);
			this.image.remove();
			this.image.src = '';
			this.image = null;
		}

		protected implUpdateVolume(volume:number):void {
		}

		private imageLoadHandler = (event:Event):void => {
			if (this.isReady) return;
			this.isReady = true;
		};

		private startTimer():void {
			if (this.timerId !== -1) return;
			if (this.duration > 0) {
				this.timerId = window.setTimeout(():void => {
					this.timerId = -1;
					this.dispatchVideoEvent(VideoClipEvent.complete);
				}, this.duration);
			}
		}

		private stopTimer():void {
			if (this.timerId === -1) return;
			window.clearTimeout(this.timerId);
			this.timerId = -1;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private url:string;
		private image:HTMLImageElement;
		private duration:number;
		private isReady:boolean;
		private timerId:number;
	}
}
