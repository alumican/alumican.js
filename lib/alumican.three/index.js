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
