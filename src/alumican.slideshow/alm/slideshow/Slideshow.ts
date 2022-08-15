/// <reference path="../../index.ts" />

namespace alm.drawer {

	import SlideshowItem = alm.drawer.view.SlideshowItem;
	import Switcher = alm.state.Switcher;
	import Timer = alm.time.Timer;
	import TimerEvent = alm.time.TimerEvent;
	import SwitcherEvent = alm.state.SwitcherEvent;

	export class Slideshow {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(content:JQuery, loop:boolean = true, itemSelector:string = '') {
			this.content = content;
			this.content.addClass('slideshow');

			this.isLoopEnabled = loop;
			this.autoPlayInterval = 5000;
			this.transitionDuration = 1000;

			this.items = [];
			let itemElements:JQuery;
			if (itemSelector !== '') {
				itemElements = this.content.find(itemSelector);
			} else {
				itemElements = this.content.children();
			}
			itemElements.each((index:number, element:HTMLElement):void => {
				const item = new SlideshowItem(jQuery(element));
				this.items.push(item);
			});

			this.autoPlayTimer = new Timer(this.autoPlayInterval);
			this.autoPlayTimer.addEventListener(TimerEvent.tick, this.autoPlayTimerTickHandler);

			this.switcher = new Switcher();
			this.switcher.setupByCount(this.items.length);
			this.switcher.addEventListener(SwitcherEvent.change, this.switcherChangeHandler);

			this.reset(false);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public play():void {
			if (this.isPlaying) return;
			this.isPlaying = true;

			this.autoPlayTimer.setInterval(this.autoPlayInterval);
			this.autoPlayTimer.start();
		}

		public stop():void {
			if (!this.isPlaying) return;
			this.isPlaying = false;

			this.autoPlayTimer.stop();
		}

		public reset(useTransition:boolean = true):void {
			this.stop();
			this.resetInterval();
			this.switcher.gotoByIndex(0, useTransition);
		}

		public resetInterval():void {
			this.autoPlayTimer.reset();
		}





		public goto(index:number, useTransition:boolean = true):boolean {
			return this.switcher.gotoByIndex(index, useTransition);
		}

		public next(useTransition:boolean = true):boolean {
			return this.switcher.next(useTransition);
		}

		public prev(useTransition:boolean = true):boolean {
			return this.switcher.prev(useTransition);
		}





		public getIsPlaying():boolean {
			return this.isPlaying;
		}

		public getCurrentIndex():number {
			return this.switcher.getCurrentItemIndex();
		}

		public getOldIndex():number {
			return this.switcher.getOldItemIndex();
		}

		public getLength():number {
			return this.switcher.getItemCount();
		}

		public getIsLoopEnabled():boolean {
			return this.isLoopEnabled;
		}

		public setIsLoopEnabled(enabled:boolean):void {
			this.isLoopEnabled = enabled;
		}

		public getAutoPlayInterval():number {
			return this.autoPlayInterval;
		}

		public setAutoPlayInterval(interval:number):void {
			this.autoPlayInterval = interval;
		}

		public getTransitionDuration():number {
			return this.transitionDuration;
		}

		public setTransitionDuration(duration:number):void {
			this.transitionDuration = duration;
		}





		private switcherChangeHandler = (event:SwitcherEvent):void => {
			if (event.oldItemIndex != -1) {
				const item = this.items[event.oldItemIndex];
				item.setTransitionDuration(this.transitionDuration);
				item.hide(event.useTransition);
			}

			if (event.currentItemIndex != -1) {
				const item = this.items[event.currentItemIndex];
				item.setTransitionDuration(this.transitionDuration);
				item.show(event.useTransition);
			}
		};

		private autoPlayTimerTickHandler = (event:TimerEvent):void => {
			this.next();
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		private content:JQuery;
		private items:SlideshowItem[];
		private switcher:Switcher;
		private autoPlayTimer:Timer;
		private autoPlayInterval:number;
		private transitionDuration:number;
		private isPlaying:boolean;
		private isLoopEnabled:boolean;
	}
}
