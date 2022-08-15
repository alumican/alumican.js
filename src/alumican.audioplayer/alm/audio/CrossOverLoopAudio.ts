/// <reference path="../../index.ts" />

namespace alm.audio {

	export class CrossOverLoopAudio {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		public constructor(crossOverDuration:number = 1) {
			this.audioPlayer = AudioPlayer.getInstance();

			this.clipCount = 0;
			this.clipIndex = 0;
			this.clipIds = [];
			this.clip = null;

			this.isPlaying = false;
			this.volume = 1;

			this.crossOverDuration = crossOverDuration;
			this.timeoutId = -1;
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

		public play():void {
			if (this.isPlaying) return;
			this.isPlaying = true;

			this.playCurrent();
		}

		public stop():void {
			if (!this.isPlaying) return;
			this.isPlaying = false;

			this.stopCurrent();
		}

		public setVolume(volume:number):void {
			this.volume = volume;

			if (this.clip) {
				this.clip.setVolume(this.volume);
			}
		}

		private playCurrent():void {
			this.clip = this.audioPlayer.getClip(this.clipIds[this.clipIndex]);
			this.clip.setVolume(this.volume);
			this.clip.play(false, true);

			const interval = (this.clip.getDuration() - this.crossOverDuration) * 1000;
			this.timeoutId = window.setTimeout(this.timerHandler, interval);
		}

		private stopCurrent():void {
			if (this.timeoutId != -1) {
				window.clearTimeout(this.timeoutId);
				this.timeoutId = -1;
			}

			if (this.clip) {
				this.clip.stop();
				this.clip = null;
			}
		}

		private timerHandler = ():void => {
			if (++this.clipIndex == this.clipCount) this.clipIndex = 0;
			this.playCurrent();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private audioPlayer:AudioPlayer;
		private volume:number;

		private clipIds:string[];
		private clip:AudioClip;
		private clipIndex:number;
		private clipCount:number;

		private isPlaying:boolean;

		private crossOverDuration:number;
		private timeoutId:number;
	}
}
