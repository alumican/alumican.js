/// <reference path="../../../index.ts" />

namespace alm.video {

	export class LoopPointVideoClip extends VideoClip {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(url:string, volume:number, loopStartPosition:number, loopEndPosition:number) {
			super(volume);
			this.url = url;
			this.loopStartPosition = loopStartPosition;
			this.loopEndPosition = loopEndPosition;
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
			this.phase = 0;

			this.video = document.createElement('video');
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
			this.phase = 0;
			this.video.currentTime = 0;
			if (this.video.paused) {
				this.video.play();
			}
			this.startTimer();
		}

		protected implStop(view:HTMLElement):void {
			this.phase = 2;
			this.video.currentTime = this.loopEndPosition;
		}

		protected implRewind(view:HTMLElement):void {
			this.phase = 0;
			this.video.currentTime = 0;
		}

		protected implUpdateVolume(volume:number):void {
			this.video.volume = volume;
		}

		protected implDispose(view:HTMLElement):void {
			view.removeChild(this.video);
			this.video.pause();
			this.video.removeAttribute('src');
			this.video.load();
			this.video = null;
			this.stopTimer();
		}

		private videoCanplaythroughHandler = (event:Event):void => {
			if (this.isReady) return;
			this.isReady = true;
		};

		private videoTimeupdateHandler = (event:Event):void => {
			this.update();
		};

		private videoEndedHandler = (event:Event):void => {
		};

		private update():void {
			const currentTime = this.video.currentTime;

			if (this.phase === 0 && currentTime >= this.loopStartPosition) {
				this.phase = 1;
			}

			if (this.phase === 1 && currentTime >= this.loopEndPosition) {
				this.video.currentTime = this.loopStartPosition;
				if (this.video.paused) {
					this.video.play();
				}
			}

			if (this.phase === 2 && currentTime >= this.video.duration) {
				this.phase = 3;
				this.video.currentTime = this.video.duration;
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
		private loopStartPosition:number;
		private loopEndPosition:number;
		private isReady:boolean;
		private phase:number;
		private intervalId:number;
	}
}
