var alm;
(function (alm) {
    var util;
    (function (util) {
        var ThreeUtil = (function () {
            function ThreeUtil() {
            }
            ThreeUtil.getEmbeddedShader = function (shaderId) {
                return {
                    vertexShader: document.getElementById(shaderId + '.vert').textContent,
                    fragmentShader: document.getElementById(shaderId + '.frag').textContent
                };
            };
            ThreeUtil.setEmission = function (model, color) {
                model.traverse(function (o) {
                    if (o.isMesh) {
                        o.material.emissive = color;
                    }
                });
            };
            return ThreeUtil;
        }());
        util.ThreeUtil = ThreeUtil;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var util;
    (function (util) {
        var EasingValue = alm.math.EasingValue;
        var EasingThreeVector3 = (function () {
            function EasingThreeVector3(initValue, easing, tolerance) {
                if (easing === void 0) { easing = 0.1; }
                if (tolerance === void 0) { tolerance = 0; }
                this.x = new EasingValue(initValue.x, easing, tolerance);
                this.y = new EasingValue(initValue.y, easing, tolerance);
                this.z = new EasingValue(initValue.z, easing, tolerance);
            }
            EasingThreeVector3.prototype.update = function (useTransition) {
                if (useTransition === void 0) { useTransition = true; }
                this.x.update(useTransition);
                this.y.update(useTransition);
                this.z.update(useTransition);
            };
            EasingThreeVector3.prototype.setTarget = function (x, y, z) {
                this.x.target = x;
                this.y.target = y;
                this.z.target = z;
            };
            EasingThreeVector3.prototype.setEasing = function (easing) {
                this.x.easing = easing;
                this.y.easing = easing;
                this.z.easing = easing;
            };
            return EasingThreeVector3;
        }());
        util.EasingThreeVector3 = EasingThreeVector3;
    })(util = alm.util || (alm.util = {}));
})(alm || (alm = {}));
1;
var alm;
(function (alm) {
    var io;
    (function (io) {
        var ThreeTextureFileHandler = (function () {
            function ThreeTextureFileHandler() {
            }
            ThreeTextureFileHandler.prototype.getType = function () {
                return ThreeTextureFileHandler.TYPE;
            };
            ThreeTextureFileHandler.prototype.load = function (url, onComplete, onError) {
                var loader = new THREE.TextureLoader();
                loader.crossOrigin = 'anonymous';
                var texture = loader.load(url, function (texture) {
                    onComplete(texture);
                }, function (event) {
                }, function (event) {
                    onError(event);
                });
            };
            ThreeTextureFileHandler.TYPE = 'THREE.Texture';
            return ThreeTextureFileHandler;
        }());
        io.ThreeTextureFileHandler = ThreeTextureFileHandler;
    })(io = alm.io || (alm.io = {}));
})(alm || (alm = {}));

//# sourceMappingURL=index.js.map
