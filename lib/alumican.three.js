var alm;
(function (alm) {
    var loader;
    (function (loader_1) {
        var ThreeTextureFileHandler = (function () {
            function ThreeTextureFileHandler() {
            }
            ThreeTextureFileHandler.prototype.getType = function () {
                return ThreeTextureFileHandler.TYPE;
            };
            ThreeTextureFileHandler.prototype.load = function (url, onComplete, onError) {
                var loader = new THREE.TextureLoader();
                var texture = loader.load(url, function (texture) {
                    onComplete(texture);
                }, function (event) {
                }, function (event) {
                    onError(event.type + ' : ' + event.message);
                });
            };
            ThreeTextureFileHandler.TYPE = 'THREE.Texture';
            return ThreeTextureFileHandler;
        }());
        loader_1.ThreeTextureFileHandler = ThreeTextureFileHandler;
    })(loader = alm.loader || (alm.loader = {}));
})(alm || (alm = {}));

//# sourceMappingURL=alumican.three.js.map
