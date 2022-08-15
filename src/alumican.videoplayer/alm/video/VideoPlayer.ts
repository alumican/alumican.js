/// <reference path="../../index.ts" />

namespace alm.video {

	import Hash = alm.util.Hash;
	import EventDispatcher = alm.event.EventDispatcher;

	export class VideoPlayer extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(container:HTMLElement = null, className:string = 'video-player') {
			super();

			this.container = container || document.createElement('div');
			if (className !== '') {
				this.container.classList.add(className);
			}

			this.clips = [];
			this.clipsById = {};
			this.clipIndicesById = {};
			this.clipIdsByIndex = {};
			this.clipCount = 0;

			this.isPlaying = false;
			this.isLoop = false;
			this.isCrossOverEnabled = true;
			this.crossFadeDuration = 500;

			this.currentClipId = '';
			this.oldClipId = '';
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public load(url:string, volume:number = 1, id:string = ''):number {
			return this.loadInternal(url, id, ():VideoClip => {
				return new SimpleVideoClip(url, volume);
			});
		}

		public loadWithLoopPoint(url:string, loopStartPosition:number, loopEndPosition:number, volume:number = 1, id:string = ''):number {
			return this.loadInternal(url, id, ():VideoClip => {
				return new LoopPointVideoClip(url, volume, loopStartPosition, loopEndPosition);
			});
		}

		public loadImage(url:string, duration:number = 0, id:string = ''):number {
			return this.loadInternal(url, id, ():VideoClip => {
				return new StaticImageClip(url, duration);
			});
		}

		private loadInternal(url:string, id:string, clipFactory:() => VideoClip):number {
			if (id === '') id = url;
			if (this.clipsById[id]) return -1;
			console.debug('[VideoPlayer] load :', url);

			const clip = clipFactory();
			clip.addEventListener(VideoClipEvent.complete, this.clipCompleteHandler);
			this.container.appendChild(clip.getView());

			const index = this.clipCount;
			this.clips.push(clip);
			this.clipsById[id] = clip;
			this.clipIndicesById[id] = index;
			this.clipIdsByIndex[index] = id;
			++this.clipCount;

			return index;
		}

		public unload(id:string):boolean {
			if (!this.clipsById[id]) return false;
			if (this.currentClipId === id) {
				this.stop();
			}
			const clip = this.clipsById[id];
			clip.removeEventListener(VideoClipEvent.complete, this.clipCompleteHandler);
			clip.dispose();
			this.container.removeChild(clip.getView());

			delete this.clipsById[id];
			this.clips[this.clipIndicesById[id]] = null;
		}

		public playById(id:string, rewind:boolean = false, loop:boolean = false, useTransition:boolean = true):void {
			this.switchClip(id, rewind, loop, useTransition);
		}

		public playByIndex(index:number, rewind:boolean = false, loop:boolean = false, useTransition:boolean = true):void {
			this.switchClip(this.clipIdsByIndex[index], rewind, loop, useTransition);
		}

		public stop(useTransition:boolean = true):void {
			this.switchClip('', false, false, useTransition);
		}

		public dispose():void {
			this.switchClip('', false, false, false);

			for (let i = 0; i < this.clipCount; ++i) {
				const clip = this.clips[i];
				if (clip) {
					clip.dispose();
				}
			}
			this.clips = null;
			this.clipsById = null;
			this.clipIndicesById = null;
			this.clipIdsByIndex = null;
			this.container = null;
		}





		private switchClip(clipId:string, useRewind:boolean, isLoop:boolean, useTransition:boolean):void {
			if (!this.clipsById[clipId]) clipId = '';

			if (clipId === this.currentClipId) {
				if (useRewind && this.currentClipId !== '') {
					console.debug('[VideoPlayer] rewind :', this.currentClipId);
					const clip = this.clipsById[this.currentClipId];
					this.isLoop = isLoop;
					clip.restart();
				}
				return;
			}

			this.oldClipId = this.currentClipId;
			this.currentClipId = clipId;
			console.debug('[VideoPlayer] switch :', this.oldClipId, '->', this.currentClipId);

			if (this.oldClipId !== '') {
				const clip = this.clipsById[this.oldClipId];
				clip.stop(useTransition ? this.crossFadeDuration : 0, (useTransition && (!this.isCrossOverEnabled) && (this.currentClipId !== '')) ? this.crossFadeDuration : 0);
			}

			if (this.currentClipId !== '') {
				const clip = this.clipsById[this.currentClipId];
				this.isPlaying = true;
				this.isLoop = isLoop;
				clip.start(useTransition ? this.crossFadeDuration : 0);
			} else {
				this.isPlaying = false;
			}
		}

		private clipCompleteHandler = (event:VideoClipEvent):void => {
			if (this.isLoop) {
				this.switchClip(this.currentClipId, true, true, false);
			} else {
				this.dispatchEvent(new VideoPlayerEvent(VideoPlayerEvent.complete, this, this.currentClipId, this.clipIndicesById[this.currentClipId]));
			}
		};

		public getContainer():HTMLElement {
			return this.container;
		}

		public setIsCrossOverEnabled(isEnabled:boolean):void {
			this.isCrossOverEnabled = isEnabled;
		}

		public getIsCrossOverEnabled():boolean {
			return this.isCrossOverEnabled;
		}

		public setCrossFadeDuration(duration:number):void {
			this.crossFadeDuration = duration;
		}

		public getCrossFadeDuration():number {
			return this.crossFadeDuration;
		}

		public getIsPlaying():boolean {
			return this.isPlaying;
		}

		public getIsLoop():boolean {
			return this.isLoop;
		}

		public getClipCount():number {
			return this.clipCount;
		}

		public getCurrentClipId():string {
			return this.currentClipId;
		}

		public getOldClipId():string {
			return this.oldClipId;
		}

		public getCurrentClipIndex():number {
			return this.clipIndicesById[this.currentClipId];
		}

		public getOldClipIndex():number {
			return this.clipIndicesById[this.oldClipId];
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private container:HTMLElement;

		private clips:VideoClip[];
		private clipsById:Hash<VideoClip>;
		private clipIndicesById:Hash<number>;
		private clipIdsByIndex:Hash<string>;
		private clipCount:number;

		private isPlaying:boolean;
		private isLoop:boolean;
		private isCrossOverEnabled:boolean;
		private crossFadeDuration:number;

		private currentClipId:string;
		private oldClipId:string;
	}
}
