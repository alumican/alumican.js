var alm;
(function (alm) {
    var audio;
    (function (audio) {
        var Cmd = alm.util.Cmd;
        var Easing = alm.math.Easing;
        class AudioClip {
            constructor(context, destination, fileName = '', masterVolume = 1) {
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
            load(url) {
                const request = new XMLHttpRequest();
                request.responseType = 'arraybuffer';
                request.onreadystatechange = () => {
                    if (request.readyState == 4) {
                        if (request.status == 0 || request.status == 200) {
                            this.context.decodeAudioData(request.response, (buffer) => {
                                trace('[AudioClip] load complete :', url);
                                this.isAvailable = true;
                                this.buffer = buffer;
                                this.duration = this.buffer.duration;
                            }, (error) => {
                                trace('[AudioClip] load error :', error);
                                trace(error);
                            });
                        }
                    }
                };
                request.open('GET', url, true);
                request.send('');
            }
            play(loop = false, overwrite = true) {
                if (!this.isAvailable)
                    return;
                if (!overwrite && this.sourceNode)
                    return;
                this.stop();
                this.sourceNode = this.context.createBufferSource();
                this.sourceNode.buffer = this.buffer;
                this.sourceNode.loop = loop;
                this.sourceNode.connect(this.gainNode);
                this.sourceNode.start(0);
            }
            stop() {
                if (this.sourceNode) {
                    this.sourceNode.stop();
                    this.sourceNode.disconnect(this.gainNode);
                    this.sourceNode = null;
                }
            }
            getVolume() {
                return this.volume;
            }
            setVolume(volume) {
                Cmd.stop(this.volumeTween);
                if (this.volume == volume)
                    return;
                this.volume = volume;
                this.applyVolume();
            }
            fadeTo(to, duration = 1000, onComplete = null) {
                Cmd.stop(this.volumeTween);
                this.volumeTween = new cmd.Tween(this, { volume: to }, null, duration, Easing.linear, null, () => {
                    this.applyVolume();
                }, () => {
                    if (onComplete)
                        onComplete();
                });
                this.volumeTween.execute();
            }
            fadeIn(duration = 1000) {
                this.fadeTo(1, duration);
            }
            fadeOut(duration = 1000, stopOnComplete = true) {
                this.fadeTo(0, duration, () => {
                    if (stopOnComplete) {
                        this.stop();
                    }
                });
            }
            applyVolume() {
                this.gainNode.gain.value = this.volume * this.masterVolume;
            }
            getIsAvailable() {
                return this.isAvailable;
            }
            getDuration() {
                return this.duration;
            }
            getCurrentTime() {
                return this.context.currentTime;
            }
        }
        audio.AudioClip = AudioClip;
    })(audio = alm.audio || (alm.audio = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var audio;
    (function (audio) {
        var EventDispatcher = alm.event.EventDispatcher;
        class AudioPlayer extends EventDispatcher {
            constructor() {
                super();
                const AudioContext = window['AudioContext'] || window['webkitAudioContext'] || null;
                this.isAvailable = AudioContext != null;
                if (this.isAvailable) {
                    this.context = new AudioContext();
                    this.clipsById = {};
                    this.masterGainNode = this.context.createGain();
                    this.masterGainNode.connect(this.context.destination);
                    this.masterVolume = 1;
                }
            }
            add(url, masterVolute = 1, id = '') {
                if (!this.isAvailable)
                    return false;
                if (id == '')
                    id = url;
                if (this.clipsById[id])
                    return false;
                this.clipsById[id] = new audio.AudioClip(this.context, this.masterGainNode, url, masterVolute);
                return true;
            }
            getClip(id) {
                if (!this.isAvailable)
                    return;
                return this.clipsById[id];
            }
            getMasterVolume() {
                if (!this.isAvailable)
                    return 0;
                return this.masterVolume;
            }
            setMasterVolume(volume) {
                if (!this.isAvailable)
                    return;
                this.masterVolume = volume;
                this.masterGainNode.gain.value = this.masterVolume;
            }
            static getInstance() { return AudioPlayer.instance || (AudioPlayer.instance = new AudioPlayer()); }
        }
        AudioPlayer.instance = null;
        audio.AudioPlayer = AudioPlayer;
    })(audio = alm.audio || (alm.audio = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var audio;
    (function (audio) {
        class CrossOverLoopAudio {
            constructor(crossOverDuration = 1) {
                this.timerHandler = () => {
                    if (++this.clipIndex == this.clipCount)
                        this.clipIndex = 0;
                    this.playCurrent();
                };
                this.audioPlayer = audio.AudioPlayer.getInstance();
                this.clipCount = 0;
                this.clipIndex = 0;
                this.clipIds = [];
                this.clip = null;
                this.isPlaying = false;
                this.volume = 1;
                this.crossOverDuration = crossOverDuration;
                this.timeoutId = -1;
            }
            add(url, masterVolume = 1) {
                const id = url + '-' + this.clipCount;
                this.audioPlayer.add(url, masterVolume, id);
                this.clipIds.push(id);
                this.clipCount = this.clipIds.length;
            }
            play() {
                if (this.isPlaying)
                    return;
                this.isPlaying = true;
                this.playCurrent();
            }
            stop() {
                if (!this.isPlaying)
                    return;
                this.isPlaying = false;
                this.stopCurrent();
            }
            setVolume(volume) {
                this.volume = volume;
                if (this.clip) {
                    this.clip.setVolume(this.volume);
                }
            }
            playCurrent() {
                this.clip = this.audioPlayer.getClip(this.clipIds[this.clipIndex]);
                this.clip.setVolume(this.volume);
                this.clip.play(false, true);
                const interval = (this.clip.getDuration() - this.crossOverDuration) * 1000;
                this.timeoutId = window.setTimeout(this.timerHandler, interval);
            }
            stopCurrent() {
                if (this.timeoutId != -1) {
                    window.clearTimeout(this.timeoutId);
                    this.timeoutId = -1;
                }
                if (this.clip) {
                    this.clip.stop();
                    this.clip = null;
                }
            }
        }
        audio.CrossOverLoopAudio = CrossOverLoopAudio;
    })(audio = alm.audio || (alm.audio = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var audio;
    (function (audio) {
        var Num = alm.util.Num;
        var Easing = alm.math.Easing;
        class FootstepAudio {
            constructor(intervalMin = 0.12, intervalMax = 0.6) {
                this.timerHandler = () => {
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
                this.audioPlayer = audio.AudioPlayer.getInstance();
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
            add(url, masterVolume = 1) {
                const id = url + '-' + this.clipCount;
                this.audioPlayer.add(url, masterVolume, id);
                this.clipIds.push(id);
                this.clipCount = this.clipIds.length;
            }
            play(immediately = true) {
                if (this.isPlaying)
                    return;
                this.isPlaying = true;
                this.isWaitingForFirstStep = true;
                this.startTime = immediately ? 0 : new Date().getTime();
                this.intervalId = window.setInterval(this.timerHandler, 1000 / 60);
                this.timerHandler();
            }
            stop() {
                if (!this.isPlaying)
                    return;
                this.isPlaying = false;
                window.clearInterval(this.intervalId);
            }
            setSpeed(speedRatio) {
                this.interval = Num.ease(speedRatio, 0, 1, this.intervalMax, this.intervalMin, Easing.easeOutSine);
            }
            setVolume(volume) {
                this.volume = volume;
            }
        }
        audio.FootstepAudio = FootstepAudio;
    })(audio = alm.audio || (alm.audio = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
