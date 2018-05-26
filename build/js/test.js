var test;
(function (test) {
    var Main = (function () {
        function Main() {
            window.onMenuClick = function (path) {
                sceneManager.goto(path);
            };
            var sceneManager = new scn.SceneManager("homepage");
            var rootScene = sceneManager.getRoot();
            trace(124);
            trace(jQuery(".page-link"));
            jQuery(".page-link").each(function (index, element) {
                trace(element);
            });
            var aboutScene = new scn.Scene("about");
            rootScene.addChild(aboutScene);
            var galleryScene = new scn.Scene("gallery");
            rootScene.addChild(galleryScene);
            var webScene = new scn.Scene("web");
            galleryScene.addChild(webScene);
            for (var i = 0; i < 2; ++i) {
                var contentScene = new scn.Scene("web-" + (i + 1));
                webScene.addChild(contentScene);
            }
            var photoScene = new scn.Scene("photo");
            galleryScene.addChild(photoScene);
            for (var i = 0; i < 4; ++i) {
                var contentScene = new scn.Scene("photo-" + (i + 1));
                photoScene.addChild(contentScene);
            }
            var movieScene = new scn.Scene("movie");
            galleryScene.addChild(movieScene);
            for (var i = 0; i < 1; ++i) {
                var contentScene = new scn.Scene("movie-" + (i + 1));
                movieScene.addChild(contentScene);
            }
            var contactScene = new scn.Scene("contact");
            rootScene.addChild(contactScene);
            contactScene.onArrive = function () {
                return new cmd.Serial(new cmd.Wait(1000), function () {
                    document.getElementById("page-title").textContent = "Contact";
                });
            };
            sceneManager.start();
        }
        return Main;
    }());
    test.Main = Main;
})(test || (test = {}));
new test.Main();

//# sourceMappingURL=test.js.map
