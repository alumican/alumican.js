/// <reference types="alumican" />
declare namespace alm.video {
    import EventDispatcher = alm.event.EventDispatcher;
    class VideoClip extends EventDispatcher {
        constructor(volume: number);
        protected setup(): void;
        start(duration: number): void;
        stop(duration: number, delay: number): void;
        rewind(): void;
        restart(): void;
        dispose(): void;
        private show;
        private hide;
        private applyVolume;
        protected dispatchVideoEvent(eventType: string): void;
        getView(): HTMLElement;
        getIsPlaying(): boolean;
        getDefaultVolume(): number;
        getVolume(): number;
        getOpacity(): number;
        protected implSetup(view: HTMLElement, volume: number): void;
        protected implStart(view: HTMLElement): void;
        protected implStop(view: HTMLElement): void;
        protected implRewind(view: HTMLElement): void;
        protected implDispose(view: HTMLElement): void;
        protected implUpdateVolume(volume: number): void;
        private view;
        private isInitializing;
        private isPlaying;
        private isShowing;
        private defaultVolume;
        private opacity;
        private volume;
        private displayTween;
    }
}
declare namespace alm.video {
    class VideoClipEvent extends alm.event.Event {
        static readonly complete: string;
        constructor(eventType: string, target: object);
    }
}
declare namespace alm.video {
    class SimpleVideoClip extends VideoClip {
        constructor(url: string, volume: number);
        protected implSetup(view: HTMLElement, volume: number): void;
        protected implStart(view: HTMLElement): void;
        protected implStop(view: HTMLElement): void;
        protected implRewind(view: HTMLElement): void;
        protected implDispose(view: HTMLElement): void;
        protected implUpdateVolume(volume: number): void;
        private videoCanplaythroughHandler;
        private videoTimeupdateHandler;
        private videoEndedHandler;
        private update;
        private startTimer;
        private stopTimer;
        private timerHandler;
        private url;
        private video;
        private isReady;
        private intervalId;
    }
}
declare namespace alm.video {
    class LoopPointVideoClip extends VideoClip {
        constructor(url: string, volume: number, loopStartPosition: number, loopEndPosition: number);
        protected implSetup(view: HTMLElement, volume: number): void;
        protected implStart(view: HTMLElement): void;
        protected implStop(view: HTMLElement): void;
        protected implRewind(view: HTMLElement): void;
        protected implUpdateVolume(volume: number): void;
        protected implDispose(view: HTMLElement): void;
        private videoCanplaythroughHandler;
        private videoTimeupdateHandler;
        private videoEndedHandler;
        private update;
        private startTimer;
        private stopTimer;
        private timerHandler;
        private url;
        private video;
        private loopStartPosition;
        private loopEndPosition;
        private isReady;
        private phase;
        private intervalId;
    }
}
declare namespace alm.video {
    class StaticImageClip extends VideoClip {
        constructor(url: string, duration: number);
        protected implSetup(view: HTMLElement, volume: number): void;
        protected implStart(view: HTMLElement): void;
        protected implStop(view: HTMLElement): void;
        protected implRewind(view: HTMLElement): void;
        protected implDispose(view: HTMLElement): void;
        protected implUpdateVolume(volume: number): void;
        private imageLoadHandler;
        private startTimer;
        private stopTimer;
        private url;
        private image;
        private duration;
        private isReady;
        private timerId;
    }
}
declare namespace alm.video {
    import EventDispatcher = alm.event.EventDispatcher;
    class VideoPlayer extends EventDispatcher {
        constructor(container?: HTMLElement, className?: string);
        load(url: string, volume?: number, id?: string): number;
        loadWithLoopPoint(url: string, loopStartPosition: number, loopEndPosition: number, volume?: number, id?: string): number;
        loadImage(url: string, duration?: number, id?: string): number;
        private loadInternal;
        unload(id: string): boolean;
        playById(id: string, rewind?: boolean, loop?: boolean, useTransition?: boolean): void;
        playByIndex(index: number, rewind?: boolean, loop?: boolean, useTransition?: boolean): void;
        stop(useTransition?: boolean): void;
        dispose(): void;
        private switchClip;
        private clipCompleteHandler;
        getContainer(): HTMLElement;
        setIsCrossOverEnabled(isEnabled: boolean): void;
        getIsCrossOverEnabled(): boolean;
        setCrossFadeDuration(duration: number): void;
        getCrossFadeDuration(): number;
        getIsPlaying(): boolean;
        getIsLoop(): boolean;
        getClipCount(): number;
        getCurrentClipId(): string;
        getOldClipId(): string;
        getCurrentClipIndex(): number;
        getOldClipIndex(): number;
        private container;
        private clips;
        private clipsById;
        private clipIndicesById;
        private clipIdsByIndex;
        private clipCount;
        private isPlaying;
        private isLoop;
        private isCrossOverEnabled;
        private crossFadeDuration;
        private currentClipId;
        private oldClipId;
    }
}
declare namespace alm.video {
    class VideoPlayerEvent extends alm.event.Event {
        static readonly complete: string;
        constructor(eventType: string, target: object, clipId: string, clipIndex: number);
        readonly clipId: string;
        readonly clipIndex: number;
    }
}
