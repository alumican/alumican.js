var test;
(function (test) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this.getSceneEventHandler = function (scene) {
                return function () {
                    return new cmd.Serial(new cmd.Wait(1000), function () {
                        var state = scn.getSceneStateString(scene.getState());
                        var path = scene.getPath();
                        _this.title.text(state + ' : ' + path);
                    });
                };
            };
            this.linkClickHandler = function (path) {
                _this.sceneManager.goto(path);
            };
            this.title = jQuery('#page-title');
            this.sceneManager = new scn.SceneManager('homepage');
            jQuery('.page-link').each(function (index, element) {
                var link = jQuery(element);
                var path = link.attr('name');
                link.attr('href', 'javascript:void(0)');
                link.attr('onclick', 'onMenuClick(\'' + path + '\');');
                var scene = _this.sceneManager.addSceneAt(path);
                if (scene) {
                    _this.setupSceneEventHandler(scene);
                }
            });
            this.setupSceneEventHandler(this.sceneManager.getRoot());
            this.sceneManager.start();
            window.onMenuClick = this.linkClickHandler;
        }
        Main.prototype.setupSceneEventHandler = function (scene) {
            scene.onLoad = this.getSceneEventHandler(scene);
            scene.onUnload = this.getSceneEventHandler(scene);
            scene.onArrive = this.getSceneEventHandler(scene);
            scene.onLeave = this.getSceneEventHandler(scene);
            scene.onAscend = this.getSceneEventHandler(scene);
            scene.onDescend = this.getSceneEventHandler(scene);
        };
        return Main;
    }());
    test.Main = Main;
})(test || (test = {}));
new test.Main();

//# sourceMappingURL=test.js.map
