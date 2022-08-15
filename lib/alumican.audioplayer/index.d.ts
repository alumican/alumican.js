/// <reference types="alumican" />
declare namespace alm.audio {
    class AudioClip {
        constructor(context: AudioContext, destination: AudioNode, fileName?: string, masterVolume?: number);
        load(url: string): void;
        play(loop?: boolean, overwrite?: boolean): void;
        stop(): void;
        getVolume(): number;
        setVolume(volume: number): void;
        fadeTo(to: number, duration?: number, onComplete?: Function): void;
        fadeIn(duration?: number): void;
        fadeOut(duration?: number, stopOnComplete?: boolean): void;
        private applyVolume;
        getIsAvailable(): boolean;
        getDuration(): number;
        getCurrentTime(): number;
        private isAvailable;
        private context;
        private volume;
        private masterVolume;
        private buffer;
        private duration;
        private sourceNode;
        private gainNode;
        private volumeTween;
    }
}
declare namespace alm.audio {
    import EventDispatcher = alm.event.EventDispatcher;
    class AudioPlayer extends EventDispatcher {
        private constructor();
        add(url: string, masterVolute?: number, id?: string): boolean;
        getClip(id: string): AudioClip;
        getMasterVolume(): number;
        setMasterVolume(volume: number): void;
        static getInstance(): AudioPlayer;
        private static instance;
        private isAvailable;
        private context;
        private clipsById;
        private masterGainNode;
        private masterVolume;
    }
}
declare namespace alm.audio {
    class CrossOverLoopAudio {
        constructor(crossOverDuration?: number);
        add(url: string, masterVolume?: number): void;
        play(): void;
        stop(): void;
        setVolume(volume: number): void;
        private playCurrent;
        private stopCurrent;
        private timerHandler;
        private audioPlayer;
        private volume;
        private clipIds;
        private clip;
        private clipIndex;
        private clipCount;
        private isPlaying;
        private crossOverDuration;
        private timeoutId;
    }
}
declare namespace alm.audio {
    class FootstepAudio {
        constructor(intervalMin?: number, intervalMax?: number);
        add(url: string, masterVolume?: number): void;
        play(immediately?: boolean): void;
        stop(): void;
        setSpeed(speedRatio: number): void;
        setVolume(volume: number): void;
        private timerHandler;
        private audioPlayer;
        private volume;
        private clipIds;
        private clipIndex;
        private clipCount;
        private startTime;
        private isWaitingForFirstStep;
        private intervalMin;
        private intervalMax;
        private interval;
        private intervalId;
        private isPlaying;
    }
}
