/// <reference path="../../build/node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../lib/alumican.d.ts" />

namespace test {

	import Scene = scn.Scene;
	import SceneManager = scn.SceneManager;

	export class Main {
		constructor() {
			this.title = jQuery("#page-title");

			// --------------------------------------------------
			// Build scene
			this.sceneManager = new scn.SceneManager("homepage");

			jQuery(".page-link").each((index:number, element:HTMLElement):void => {
				const link = jQuery(element);
				const path = link.attr("name");
				link.attr("href", "javascript:void(0)");
				link.attr("onclick", "onMenuClick('" + path + "');");
				const scene = this.sceneManager.addSceneAt(path);
				if (scene) {
					this.setupSceneEventHandler(scene);
				}
			});
			this.setupSceneEventHandler(this.sceneManager.getRoot());

			// --------------------------------------------------
			// Start
			this.sceneManager.start();

			//sceneManager.goto("gallery/web/");
			//console.log(sceneManager.resolvePath("/"));
			//console.log(sceneManager.resolvePath("/aaa/bbb/"));
			//console.log(sceneManager.resolvePath("aaa/bbb/ccc"));
			//console.log(sceneManager.resolvePath("./aaa/bbb"));
			//console.log(sceneManager.resolvePath("aaa/bbb/../ccc"));
			//console.log(sceneManager.resolvePath("./aaa/./bbb/.././ccc"));

			//console.log(sceneManager.getSceneByPath("/").getName());
			//console.log(sceneManager.getSceneByPath("/gallery").getName());
			//console.log(sceneManager.getSceneByPath("/gallery/photo").getName());
			//console.log(sceneManager.getSceneByPath("/gallery/photo/photo-2").getName());

			// --------------------------------------------------
			(<any>window).onMenuClick = this.linkClickHandler;
		}

		private setupSceneEventHandler(scene:Scene):void {
			scene.onLoad = this.getSceneEventHandler(scene);
			scene.onUnload = this.getSceneEventHandler(scene);
			scene.onArrive = this.getSceneEventHandler(scene);
			scene.onLeave = this.getSceneEventHandler(scene);
			scene.onAscend = this.getSceneEventHandler(scene);
			scene.onDescend = this.getSceneEventHandler(scene);
		}

		private getSceneEventHandler = (scene:Scene):(() => cmd.Command) => {
			return ():cmd.Command => {
				return new cmd.Serial(
					new cmd.Wait(1000),
					():void => {
						const state:string = scn.getSceneStateString(scene.getState());
						const path:string = scene.getPath();
						this.title.text(state + " : " + path);
					}
				);
			}
		};

		private linkClickHandler = (path:string):void => {
			this.sceneManager.goto(path);
		};

		private sceneManager:SceneManager;
		private title:JQuery;
	}
}

new test.Main();