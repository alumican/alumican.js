/// <reference path="../../../index.ts" />

namespace alm.video {

	export class SimpleVideoClip extends VideoClip {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(url:string, volume:number) {
			super(volume);
			this.url = url;
			this.intervalId = -1;
			this.setup();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		protected implSetup(view:HTMLElement, volume:number):void {
			this.isReady = false;

			this.video = document.createElement('video');
			this.video.setAttribute('muted', 'muted');
			this.video.classList.add('video-media');
			this.video.playsInline = true;
			this.video.controls = false;
			this.video.autoplay = false;
			this.video.preload = 'auto';
			this.video.loop = false;
			this.video.volume = volume;
			this.video.muted = volume === 0;
			this.video.src = this.url;
			this.video.addEventListener('canplaythrough', this.videoCanplaythroughHandler);
			//this.video.addEventListener('timeupdate', this.videoTimeupdateHandler);
			this.video.addEventListener('ended', this.videoEndedHandler);
			this.video.load();
			this.getView().appendChild(this.video);
		}

		protected implStart(view:HTMLElement):void {
			if (this.video.paused) {
				this.video.play();
			}
			this.startTimer();
		}

		protected implStop(view:HTMLElement):void {
			if (!this.video.paused) {
				this.video.pause();
			}
			this.video.currentTime = 0;
			this.stopTimer();
		}

		protected implRewind(view:HTMLElement):void {
			this.video.currentTime = 0;
		}

		protected implDispose(view:HTMLElement):void {
			view.removeChild(this.video);
			this.video.pause();
			this.video.removeAttribute('src');
			this.video.load();
			this.video = null;
			this.stopTimer();
		}

		protected implUpdateVolume(volume:number):void {
			this.video.volume = volume;
		}

		private videoCanplaythroughHandler = (event:Event):void => {
			if (this.isReady) return;
			this.isReady = true;
		};

		private videoTimeupdateHandler = (event:Event):void => {
			this.update();
		};

		private videoEndedHandler = (event:Event):void => {
			//if (!this.video.paused) {
			//	this.video.pause();
			//}
			//this.dispatchVideoEvent(VideoClipEvent.complete);
		};

		private update():void {
			if (this.video.currentTime >= this.video.duration) {
				if (!this.video.paused) {
					this.video.pause();
				}
				this.stopTimer();
				this.dispatchVideoEvent(VideoClipEvent.complete);
			}
		}

		private startTimer():void {
			if (this.intervalId !== -1) return;
			this.intervalId = window.setInterval(this.timerHandler, 1000 / 60);
		}

		private stopTimer():void {
			if (this.intervalId === -1) return;
			window.clearInterval(this.intervalId);
			this.intervalId = -1;
		}

		private timerHandler = ():void => {
			this.update();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private url:string;
		private video:HTMLVideoElement;
		private isReady:boolean;
		private intervalId:number;
	}
}
