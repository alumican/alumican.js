/// <reference path="../../../index.ts" />

namespace alm.audio {

	import Cmd = alm.util.Cmd;
	import Easing = alm.math.Easing;

	export class AudioClip {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		public constructor(context:AudioContext, destination:AudioNode, fileName:string = '', masterVolume:number = 1) {
			//this.context = new AudioContext();
			this.context = context;
			this.masterVolume = masterVolume;

			this.buffer = null;
			this.sourceNode = null;
			this.isAvailable = false;

			this.duration = 0;

			this.gainNode = this.context.createGain();
			this.gainNode.connect(destination);

			this.volume = 1;
			this.applyVolume();

			if (fileName != '') {
				this.load(fileName);
			}
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public load(url:string):void {
			const request:XMLHttpRequest = new XMLHttpRequest();
			request.responseType = 'arraybuffer';
			request.onreadystatechange = ():void => {
				if (request.readyState == 4) {
					if (request.status == 0 || request.status == 200) {
						this.context.decodeAudioData(request.response, (buffer:AudioBuffer):void => {
							trace('[AudioClip] load complete :', url);
							this.isAvailable = true;
							this.buffer = buffer;
							this.duration = this.buffer.duration;
						}, (error:Error):void => {
							trace('[AudioClip] load error :', error);
							trace(error);
						});
					}
				}
			};
			request.open('GET', url, true);
			request.send('');
		}

		public play(loop:boolean = false, overwrite:boolean = true):void {
			if (!this.isAvailable) return;
			if (!overwrite && this.sourceNode) return;
			this.stop();
			this.sourceNode = this.context.createBufferSource();
			this.sourceNode.buffer = this.buffer;
			this.sourceNode.loop = loop;
			this.sourceNode.connect(this.gainNode);
			this.sourceNode.start(0);
		}

		public stop():void {
			if (this.sourceNode) {
				this.sourceNode.stop();
				this.sourceNode.disconnect(this.gainNode);
				this.sourceNode = null;
			}
		}

		public getVolume():number {
			return this.volume;
		}

		public setVolume(volume:number):void {
			Cmd.stop(this.volumeTween);
			if (this.volume == volume) return;
			this.volume = volume;
			this.applyVolume();
		}

		public fadeTo(to:number, duration:number = 1000, onComplete:Function = null):void {
			Cmd.stop(this.volumeTween);
			this.volumeTween = new cmd.Tween(this, { volume: to }, null, duration, Easing.linear, null, ():void => {
				this.applyVolume();
			}, ():void => {
				if (onComplete) onComplete();
			});
			this.volumeTween.execute();
		}

		public fadeIn(duration:number = 1000):void {
			this.fadeTo(1, duration);
		}

		public fadeOut(duration:number = 1000, stopOnComplete:boolean = true):void {
			this.fadeTo(0, duration, ():void => {
				if (stopOnComplete) {
					this.stop();
				}
			});
		}

		private applyVolume():void {
			this.gainNode.gain.value = this.volume * this.masterVolume;
		}

		public getIsAvailable():boolean {
			return this.isAvailable;
		}

		public getDuration():number {
			return this.duration;
		}

		public getCurrentTime():number {
			return this.context.currentTime;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private isAvailable:boolean;
		private context:AudioContext;
		private volume:number;
		private masterVolume:number;
		private buffer:AudioBuffer;
		private duration:number;
		private sourceNode:AudioBufferSourceNode;
		private gainNode:GainNode;
		private volumeTween:cmd.Tween;
	}
}
