var alm;
(function (alm) {
    var video;
    (function (video) {
        var Cmd = alm.util.Cmd;
        var Easing = alm.math.Easing;
        var EventDispatcher = alm.event.EventDispatcher;
        class VideoClip extends EventDispatcher {
            constructor(volume) {
                super();
                this.volume = this.defaultVolume = volume;
                this.isInitializing = true;
            }
            setup() {
                this.isShowing = true;
                this.isPlaying = false;
                this.opacity = 1;
                this.view = document.createElement('div');
                this.view.classList.add('video-clip');
                this.implSetup(this.view, this.volume);
                this.hide(0, 0);
                this.isInitializing = false;
            }
            start(duration) {
                if (this.isPlaying)
                    return;
                this.isPlaying = true;
                this.show(duration);
            }
            stop(duration, delay) {
                if (!this.isPlaying)
                    return;
                this.isPlaying = false;
                this.hide(duration, delay);
            }
            rewind() {
                this.implRewind(this.view);
            }
            restart() {
                if (this.isPlaying) {
                    this.implRewind(this.view);
                    this.implStart(this.view);
                }
                else {
                    this.start(0);
                }
            }
            dispose() {
                this.displayTween = Cmd.stop(this.displayTween);
                this.implDispose(this.view);
                if (this.view) {
                    this.view.remove();
                    this.view = null;
                }
            }
            show(duration) {
                if (this.isShowing)
                    return;
                this.isShowing = true;
                const view = this.getView();
                if (this.displayTween) {
                    this.displayTween = Cmd.stop(this.displayTween);
                }
                if (duration > 0) {
                    this.displayTween = new cmd.Tween(this, { opacity: 1 }, null, duration, Easing.easeOutQuad, () => {
                        view.style.display = 'block';
                        this.implStart(this.view);
                    }, () => {
                        view.style.opacity = this.opacity.toString();
                        this.applyVolume();
                    }, () => {
                        this.displayTween = null;
                    });
                    this.displayTween.execute();
                }
                else {
                    view.style.display = 'block';
                    this.implStart(this.view);
                    this.opacity = 1;
                    view.style.opacity = this.opacity.toString();
                    this.applyVolume();
                }
            }
            hide(duration, delay) {
                if (!this.isShowing)
                    return;
                this.isShowing = false;
                const view = this.getView();
                if (this.displayTween) {
                    this.displayTween = Cmd.stop(this.displayTween);
                }
                if (duration > 0) {
                    const tween = new cmd.Tween(this, { opacity: 0 }, null, duration, Easing.easeOutQuad, null, () => {
                        view.style.opacity = this.opacity.toString();
                        this.applyVolume();
                    }, () => {
                        view.style.display = 'none';
                        this.displayTween = null;
                        if (!this.isInitializing) {
                            this.implStop(this.view);
                        }
                    });
                    if (delay > 0) {
                        this.displayTween = new cmd.Serial(new cmd.Wait(delay), tween);
                    }
                    else {
                        this.displayTween = tween;
                    }
                    this.displayTween.execute();
                }
                else {
                    this.opacity = 0;
                    view.style.opacity = this.opacity.toString();
                    this.applyVolume();
                    view.style.display = 'none';
                    if (!this.isInitializing) {
                        this.implStop(this.view);
                    }
                }
            }
            applyVolume() {
                if (this.defaultVolume > 0) {
                    this.volume = this.defaultVolume * this.opacity;
                    this.implUpdateVolume(this.volume);
                }
            }
            dispatchVideoEvent(eventType) {
                this.dispatchEvent(new video.VideoClipEvent(eventType, this));
            }
            getView() {
                return this.view;
            }
            getIsPlaying() {
                return this.isPlaying;
            }
            getDefaultVolume() {
                return this.defaultVolume;
            }
            getVolume() {
                return this.volume;
            }
            getOpacity() {
                return this.opacity;
            }
            implSetup(view, volume) {
            }
            implStart(view) {
            }
            implStop(view) {
            }
            implRewind(view) {
            }
            implDispose(view) {
            }
            implUpdateVolume(volume) {
            }
        }
        video.VideoClip = VideoClip;
    })(video = alm.video || (alm.video = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var video;
    (function (video) {
        class VideoClipEvent extends alm.event.Event {
            constructor(eventType, target) {
                super(eventType, target);
            }
        }
        VideoClipEvent.complete = 'VideoClipEvent.complete';
        video.VideoClipEvent = VideoClipEvent;
    })(video = alm.video || (alm.video = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var video;
    (function (video) {
        class SimpleVideoClip extends video.VideoClip {
            constructor(url, volume) {
                super(volume);
                this.videoCanplaythroughHandler = (event) => {
                    if (this.isReady)
                        return;
                    this.isReady = true;
                };
                this.videoTimeupdateHandler = (event) => {
                    this.update();
                };
                this.videoEndedHandler = (event) => {
                };
                this.timerHandler = () => {
                    this.update();
                };
                this.url = url;
                this.intervalId = -1;
                this.setup();
            }
            implSetup(view, volume) {
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
                this.video.addEventListener('ended', this.videoEndedHandler);
                this.video.load();
                this.getView().appendChild(this.video);
            }
            implStart(view) {
                if (this.video.paused) {
                    this.video.play();
                }
                this.startTimer();
            }
            implStop(view) {
                if (!this.video.paused) {
                    this.video.pause();
                }
                this.video.currentTime = 0;
                this.stopTimer();
            }
            implRewind(view) {
                this.video.currentTime = 0;
            }
            implDispose(view) {
                view.removeChild(this.video);
                this.video.pause();
                this.video.removeAttribute('src');
                this.video.load();
                this.video = null;
                this.stopTimer();
            }
            implUpdateVolume(volume) {
                this.video.volume = volume;
            }
            update() {
                if (this.video.currentTime >= this.video.duration) {
                    if (!this.video.paused) {
                        this.video.pause();
                    }
                    this.stopTimer();
                    this.dispatchVideoEvent(video.VideoClipEvent.complete);
                }
            }
            startTimer() {
                if (this.intervalId !== -1)
                    return;
                this.intervalId = window.setInterval(this.timerHandler, 1000 / 60);
            }
            stopTimer() {
                if (this.intervalId === -1)
                    return;
                window.clearInterval(this.intervalId);
                this.intervalId = -1;
            }
        }
        video.SimpleVideoClip = SimpleVideoClip;
    })(video = alm.video || (alm.video = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var video;
    (function (video) {
        class LoopPointVideoClip extends video.VideoClip {
            constructor(url, volume, loopStartPosition, loopEndPosition) {
                super(volume);
                this.videoCanplaythroughHandler = (event) => {
                    if (this.isReady)
                        return;
                    this.isReady = true;
                };
                this.videoTimeupdateHandler = (event) => {
                    this.update();
                };
                this.videoEndedHandler = (event) => {
                };
                this.timerHandler = () => {
                    this.update();
                };
                this.url = url;
                this.loopStartPosition = loopStartPosition;
                this.loopEndPosition = loopEndPosition;
                this.intervalId = -1;
                this.setup();
            }
            implSetup(view, volume) {
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
                this.video.addEventListener('ended', this.videoEndedHandler);
                this.video.load();
                this.getView().appendChild(this.video);
            }
            implStart(view) {
                this.phase = 0;
                this.video.currentTime = 0;
                if (this.video.paused) {
                    this.video.play();
                }
                this.startTimer();
            }
            implStop(view) {
                this.phase = 2;
                this.video.currentTime = this.loopEndPosition;
            }
            implRewind(view) {
                this.phase = 0;
                this.video.currentTime = 0;
            }
            implUpdateVolume(volume) {
                this.video.volume = volume;
            }
            implDispose(view) {
                view.removeChild(this.video);
                this.video.pause();
                this.video.removeAttribute('src');
                this.video.load();
                this.video = null;
                this.stopTimer();
            }
            update() {
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
                    this.dispatchVideoEvent(video.VideoClipEvent.complete);
                }
            }
            startTimer() {
                if (this.intervalId !== -1)
                    return;
                this.intervalId = window.setInterval(this.timerHandler, 1000 / 60);
            }
            stopTimer() {
                if (this.intervalId === -1)
                    return;
                window.clearInterval(this.intervalId);
                this.intervalId = -1;
            }
        }
        video.LoopPointVideoClip = LoopPointVideoClip;
    })(video = alm.video || (alm.video = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var video;
    (function (video) {
        class StaticImageClip extends video.VideoClip {
            constructor(url, duration) {
                super(0);
                this.imageLoadHandler = (event) => {
                    if (this.isReady)
                        return;
                    this.isReady = true;
                };
                this.url = url;
                this.duration = duration;
                this.timerId = -1;
                this.setup();
            }
            implSetup(view, volume) {
                this.isReady = false;
                this.image = new Image();
                this.image.addEventListener('load', this.imageLoadHandler);
                this.image.classList.add('video-media');
                this.image.src = this.url;
                this.getView().appendChild(this.image);
            }
            implStart(view) {
                this.startTimer();
            }
            implStop(view) {
                this.stopTimer();
            }
            implRewind(view) {
                this.stopTimer();
                this.startTimer();
            }
            implDispose(view) {
                this.stopTimer();
                view.removeChild(this.image);
                this.image.removeEventListener('load', this.imageLoadHandler);
                this.image.remove();
                this.image.src = '';
                this.image = null;
            }
            implUpdateVolume(volume) {
            }
            startTimer() {
                if (this.timerId !== -1)
                    return;
                if (this.duration > 0) {
                    this.timerId = window.setTimeout(() => {
                        this.timerId = -1;
                        this.dispatchVideoEvent(video.VideoClipEvent.complete);
                    }, this.duration);
                }
            }
            stopTimer() {
                if (this.timerId === -1)
                    return;
                window.clearTimeout(this.timerId);
                this.timerId = -1;
            }
        }
        video.StaticImageClip = StaticImageClip;
    })(video = alm.video || (alm.video = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var video;
    (function (video) {
        var EventDispatcher = alm.event.EventDispatcher;
        class VideoPlayer extends EventDispatcher {
            constructor(container = null, className = 'video-player') {
                super();
                this.clipCompleteHandler = (event) => {
                    if (this.isLoop) {
                        this.switchClip(this.currentClipId, true, true, false);
                    }
                    else {
                        this.dispatchEvent(new video.VideoPlayerEvent(video.VideoPlayerEvent.complete, this, this.currentClipId, this.clipIndicesById[this.currentClipId]));
                    }
                };
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
            load(url, volume = 1, id = '') {
                return this.loadInternal(url, id, () => {
                    return new video.SimpleVideoClip(url, volume);
                });
            }
            loadWithLoopPoint(url, loopStartPosition, loopEndPosition, volume = 1, id = '') {
                return this.loadInternal(url, id, () => {
                    return new video.LoopPointVideoClip(url, volume, loopStartPosition, loopEndPosition);
                });
            }
            loadImage(url, duration = 0, id = '') {
                return this.loadInternal(url, id, () => {
                    return new video.StaticImageClip(url, duration);
                });
            }
            loadInternal(url, id, clipFactory) {
                if (id === '')
                    id = url;
                if (this.clipsById[id])
                    return -1;
                console.debug('[VideoPlayer] load :', url);
                const clip = clipFactory();
                clip.addEventListener(video.VideoClipEvent.complete, this.clipCompleteHandler);
                this.container.appendChild(clip.getView());
                const index = this.clipCount;
                this.clips.push(clip);
                this.clipsById[id] = clip;
                this.clipIndicesById[id] = index;
                this.clipIdsByIndex[index] = id;
                ++this.clipCount;
                return index;
            }
            unload(id) {
                if (!this.clipsById[id])
                    return false;
                if (this.currentClipId === id) {
                    this.stop();
                }
                const clip = this.clipsById[id];
                clip.removeEventListener(video.VideoClipEvent.complete, this.clipCompleteHandler);
                clip.dispose();
                this.container.removeChild(clip.getView());
                delete this.clipsById[id];
                this.clips[this.clipIndicesById[id]] = null;
            }
            playById(id, rewind = false, loop = false, useTransition = true) {
                this.switchClip(id, rewind, loop, useTransition);
            }
            playByIndex(index, rewind = false, loop = false, useTransition = true) {
                this.switchClip(this.clipIdsByIndex[index], rewind, loop, useTransition);
            }
            stop(useTransition = true) {
                this.switchClip('', false, false, useTransition);
            }
            dispose() {
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
            switchClip(clipId, useRewind, isLoop, useTransition) {
                if (!this.clipsById[clipId])
                    clipId = '';
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
                }
                else {
                    this.isPlaying = false;
                }
            }
            getContainer() {
                return this.container;
            }
            setIsCrossOverEnabled(isEnabled) {
                this.isCrossOverEnabled = isEnabled;
            }
            getIsCrossOverEnabled() {
                return this.isCrossOverEnabled;
            }
            setCrossFadeDuration(duration) {
                this.crossFadeDuration = duration;
            }
            getCrossFadeDuration() {
                return this.crossFadeDuration;
            }
            getIsPlaying() {
                return this.isPlaying;
            }
            getIsLoop() {
                return this.isLoop;
            }
            getClipCount() {
                return this.clipCount;
            }
            getCurrentClipId() {
                return this.currentClipId;
            }
            getOldClipId() {
                return this.oldClipId;
            }
            getCurrentClipIndex() {
                return this.clipIndicesById[this.currentClipId];
            }
            getOldClipIndex() {
                return this.clipIndicesById[this.oldClipId];
            }
        }
        video.VideoPlayer = VideoPlayer;
    })(video = alm.video || (alm.video = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var video;
    (function (video) {
        class VideoPlayerEvent extends alm.event.Event {
            constructor(eventType, target, clipId, clipIndex) {
                super(eventType, target);
                this.clipId = clipId;
                this.clipIndex = clipIndex;
            }
        }
        VideoPlayerEvent.complete = 'VideoPlayerEvent.complete';
        video.VideoPlayerEvent = VideoPlayerEvent;
    })(video = alm.video || (alm.video = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
