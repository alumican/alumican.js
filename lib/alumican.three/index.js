var alm;
(function (alm) {
    var util;
    (function (util) {
        class ThreeUtil {
            static getEmbeddedShader(shaderId) {
                return {
                    vertexShader: document.getElementById(shaderId + '.vert').textContent,
                    fragmentShader: document.getElementById(shaderId + '.frag').textContent
                };
            }
            static setEmission(model, color) {
                model.traverse((o) => {
                    if (o.isMesh) {
                        o.material.emissive = color;
                    }
                });
            }
            constructor() { }
        }
        util.ThreeUtil = ThreeUtil;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var EasingValue = alm.math.EasingValue;
        class EasingThreeVector3 {
            constructor(initValue, easing = 0.1, tolerance = 0) {
                this.x = new EasingValue(initValue.x, easing, tolerance);
                this.y = new EasingValue(initValue.y, easing, tolerance);
                this.z = new EasingValue(initValue.z, easing, tolerance);
            }
            update(useTransition = true) {
                this.x.update(useTransition);
                this.y.update(useTransition);
                this.z.update(useTransition);
            }
            setTarget(x, y, z) {
                this.x.target = x;
                this.y.target = y;
                this.z.target = z;
            }
            setEasing(easing) {
                this.x.easing = easing;
                this.y.easing = easing;
                this.z.easing = easing;
            }
        }
        util.EasingThreeVector3 = EasingThreeVector3;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
1;
var alm;
(function (alm) {
    var io;
    (function (io) {
        class ThreeTextureFileHandler {
            constructor() {
            }
            getType() {
                return ThreeTextureFileHandler.type;
            }
            load(url, onComplete, onError) {
                const loader = new THREE.TextureLoader();
                loader.crossOrigin = 'anonymous';
                const texture = loader.load(url, (texture) => {
                    onComplete(texture);
                }, (event) => {
                }, (event) => {
                    onError(event);
                });
            }
        }
        ThreeTextureFileHandler.type = 'THREE.Texture';
        io.ThreeTextureFileHandler = ThreeTextureFileHandler;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
