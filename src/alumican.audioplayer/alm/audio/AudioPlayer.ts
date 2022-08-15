/// <reference path="../../index.ts" />

namespace alm.audio {

	import EventDispatcher = alm.event.EventDispatcher;
	import Hash = alm.util.Hash;

	export class AudioPlayer extends EventDispatcher {





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		private constructor() {
			super();

			const AudioContext:any = window['AudioContext'] || window['webkitAudioContext'] || null;
			this.isAvailable = AudioContext != null;
			if (this.isAvailable) {
				this.context = new AudioContext();
				this.clipsById = {};

				this.masterGainNode = this.context.createGain();
				this.masterGainNode.connect(this.context.destination);
				this.masterVolume = 1;
			}
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public add(url:string, masterVolute:number = 1, id:string = ''):boolean {
			if (!this.isAvailable) return false;
			if (id == '') id = url;
			if (this.clipsById[id]) return false;
			this.clipsById[id] = new AudioClip(this.context, this.masterGainNode, url, masterVolute);
			return true;
		}

		public getClip(id:string):AudioClip {
			if (!this.isAvailable) return;
			return this.clipsById[id];
		}

		public getMasterVolume():number {
			if (!this.isAvailable) return 0;
			return this.masterVolume;
		}

		public setMasterVolume(volume:number):void {
			if (!this.isAvailable) return;
			this.masterVolume = volume;
			this.masterGainNode.gain.value = this.masterVolume;
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static getInstance():AudioPlayer { return AudioPlayer.instance || (AudioPlayer.instance = new AudioPlayer()); }
		private static instance:AudioPlayer = null;

		private isAvailable:boolean;
		private context:AudioContext;
		private clipsById:Hash<AudioClip>;

		private masterGainNode:GainNode;
		private masterVolume:number;
	}
}
