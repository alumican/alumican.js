/// <reference path="../../index.ts" />

namespace alm.audio {

	import Num = alm.util.Num;
	import Easing = alm.math.Easing;

	export class FootstepAudio {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		public constructor(intervalMin:number = 0.12, intervalMax:number = 0.6) {
			this.audioPlayer = AudioPlayer.getInstance();

			this.intervalMin = intervalMin;
			this.intervalMax = intervalMax;
			this.intervalId = -1;
			this.interval = this.intervalMax;

			this.clipIndex = -1;
			this.clipCount = 0;
			this.clipIds = [];

			this.isPlaying = false;
			this.volume = 1;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public add(url:string, masterVolume:number = 1):void {
			const id = url + '-' + this.clipCount;
			this.audioPlayer.add(url, masterVolume, id);
			this.clipIds.push(id);
			this.clipCount = this.clipIds.length;
		}

		public play(immediately:boolean = true):void {
			if (this.isPlaying) return;
			this.isPlaying = true;

			this.isWaitingForFirstStep = true;
			this.startTime = immediately ? 0 : new Date().getTime();
			this.intervalId = window.setInterval(this.timerHandler, 1000 / 60);
			this.timerHandler();
		}

		public stop():void {
			if (!this.isPlaying) return;
			this.isPlaying = false;

			window.clearInterval(this.intervalId);
		}

		public setSpeed(speedRatio:number):void {
			this.interval = Num.ease(speedRatio, 0, 1, this.intervalMax, this.intervalMin, Easing.easeOutSine);
		}

		public setVolume(volume:number):void {
			this.volume = volume;
		}

		private timerHandler = ():void => {
			const interval = this.isWaitingForFirstStep ? (this.interval * 0.5) : this.interval;
			const time = new Date().getTime();
			if (time - this.startTime >= interval * 1000) {
				this.startTime = time;
				this.isWaitingForFirstStep = false;

				if (++this.clipIndex >= this.clipCount) {
					this.clipIndex = 0;
				}
				const clipId = this.clipIds[this.clipIndex];
				this.audioPlayer.getClip(clipId).setVolume(this.volume);
				this.audioPlayer.getClip(clipId).play(false, true);
			}
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private audioPlayer:AudioPlayer;
		private volume:number;

		private clipIds:string[];
		private clipIndex:number;
		private clipCount:number;

		private startTime:number;
		private isWaitingForFirstStep:boolean;

		private intervalMin:number;
		private intervalMax:number;
		private interval:number;
		private intervalId:number;

		private isPlaying:boolean;
	}
}
