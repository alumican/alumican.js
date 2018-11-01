/// <reference path='../../include.ts' />

namespace alm.loader {

	import EventDispatcher = alm.event.EventDispatcher;

	export class AssetLoader {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor() {
			this.isLoading_ = false;

			this.currentCount = 0;
			this.totalCount = 0;

			this.loadingQueries = [];
			this.loadingQueryIndex = -1;

			this.queriesByQueryId = {};
			this.queriesByUrl = {};

			this.texturesByUrl = {};
			this.texturesByQueryId = {};

			this.eventDispatcher = new EventDispatcher();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public requireJQueryJson(url:string):string {
			return this.addQuery('jQuery.JSON', url, {});
		}

		public requireThreeTexture(url:string):string {
			return this.addQuery('THREE.Texture', url, {});
		}

		//public requireJQueryJson(url:string, onLoad?:(data:any)=>void):string {
		//	return this.addQuery('jQuery.JSON', url, { onLoad: onLoad });
		//}

		//public requireThreeTexture(url:string, onLoad?:(texture:THREE.Texture)=>void, onError?:(message:string)=>void):string {
		//	return this.addQuery('THREE.Texture', url, { onLoad: onLoad, onError: onError });
		//}

		//public requireThreeTextureAtlas(baseUrl:string, onLoad?:(texture:THREE.Texture)=>void, onError?:(message:string)=>void):string {
		//	return this.addQuery('THREE.TextureAtlas', baseUrl, { onLoad: onLoad, onError: onError });
		//}

		private addQuery(type:string, url:string, param:any):string {
			if (this.queriesByUrl[url]) return this.queriesByUrl[url].id;

			const query:LoaderQuery = new LoaderQuery();
			query.id = String(AssetLoader.id);
			query.type = type;
			query.url = url;
			query.param = param;
			this.loadingQueries.push(query);
			this.queriesByQueryId[query.id] = query;
			this.queriesByUrl[query.url] = query;
			++AssetLoader.id;
			return query.id;
		}

		public load():void {
			if (this.isLoading_) return;
			this.isLoading_ = true;
			this.loadingQueryIndex = -1;
			this.next();
		}

		private next():void {
			this.currentCount = this.loadingQueryIndex + 1;
			this.totalCount = this.loadingQueries.length;

			if (this.currentCount > 0) {
				this.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.PROGRESS, this, this.currentCount / this.totalCount, this.currentCount, this.totalCount));
			}

			if (this.currentCount < this.totalCount) {
				this.loadingQueryIndex++;
				const query:LoaderQuery = this.loadingQueries[this.loadingQueryIndex];
				query.isLoading = true;
				query.isLoadComplete = false;
				trace('[AssetLoader] loading... ' + '\'' + query.url + '' as '' + query.type + '\'');
				switch (query.type) {

					// --------------------------------------------------
					// jQuery JSON
					case 'jQuery.JSON':
						jQuery.getJSON(
							query.url,
							(data:any):void => {
								query.isLoading = false;
								query.isLoadComplete = true;
								query.content = data;
								if (query.param.onLoad)
									query.param.onLoad(data);
								this.next();
							}
						);
						break;

					// --------------------------------------------------
					// Three.js Texture
					case 'THREE.Texture':
						let url:string = query.url;
						const loader:THREE.TextureLoader = new THREE.TextureLoader();
						const texture:THREE.Texture = loader.load(
							url,
							(texture:THREE.Texture):void => {
								query.isLoading = false;
								query.isLoadComplete = true;
								query.content = texture;
								if (query.param.onLoad)
									query.param.onLoad(texture);
								this.next();
							},
							(event:ProgressEvent):void => {
							},
							(event:ErrorEvent):void => {
								query.isLoading = false;
								query.isLoadComplete = true;
								if (query.param.onError)
									query.param.onError(event.type + ' : ' + event.message);
								this.next();
							}
						);
						this.texturesByUrl[query.url] = texture;
						this.texturesByQueryId[query.id] = texture;
						break;

					/*
					// --------------------------------------------------
					// Three.js Texture Atlas
					case 'THREE.TextureAtlas':
						jQuery.getJSON(
							query.url + '.json',
							(json:any):void => {
								THREE.ImageUtils.loadTexture(
									query.url,
									null,
									(textureAtlas:THREE.Texture):void => {
										const textureAtlasWidth:number = textureAtlas.image.width;
										const textureAtlasHeight:number = textureAtlas.image.height;
										const texturesByTextureId:Hash<THREE.Texture> = {};
										const texture:THREE.Texture;
										const textureFrame:any;
										for (let textureId in json.frames) {
											texture = textureAtlas.clone();
											textureFrame = json.frames[textureId].frame;
											texture.repeat.x = textureFrame.w / textureAtlasWidth;
											texture.repeat.y = textureFrame.h / textureAtlasHeight;
											texture.offset.x = Math.abs(textureFrame.x) / textureAtlasWidth;
											texture.offset.y = Math.abs(textureFrame.y) / textureAtlasHeight;
											texture.needsUpdate = true;
											texturesByTextureId[textureId] = texture;
										}
										query.isLoading = false;
										query.isLoadComplete = true;
										query.content = texturesByTextureId;
										query.param.onLoad(texturesByTextureId);
										this.next();
									},
									(message:string):void => {
										query.isLoading = false;
										query.isLoadComplete = true;
										query.param.onError(message);
										this.next();
									}
								);
							}
						);
						break;
					*/

					// --------------------------------------------------
					default:
						this.next();
				}
			} else {
				this.isLoading_ = false;
				this.loadingQueries = [];
				this.loadingQueryIndex = -1;
				this.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.COMPLETE, this, this.currentCount / this.totalCount, this.currentCount, this.totalCount));
			}
		}

		public addLoadUpdateListener(listener:(event:AssetLoaderEvent) => void):void {
			this.eventDispatcher.addEventListener(AssetLoaderEvent.PROGRESS, listener);
		}

		public removeLoadUpdateListener(listener:(event:AssetLoaderEvent) => void):void {
			this.eventDispatcher.removeEventListener(AssetLoaderEvent.PROGRESS, listener);
		}

		public addLoadCompleteListener(listener:(event:AssetLoaderEvent) => void):void {
			this.eventDispatcher.addEventListener(AssetLoaderEvent.COMPLETE, listener);
		}

		public removeLoadCompleteListener(listener:(event:AssetLoaderEvent) => void):void {
			this.eventDispatcher.removeEventListener(AssetLoaderEvent.COMPLETE, listener);
		}

		public getQueryByQueryId(queryId:string):LoaderQuery {
			return this.queriesByQueryId[queryId];
		}


		public getQueryByUrl(url:string):LoaderQuery {
			return this.queriesByUrl[url];
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public isLoading():boolean { return this.isLoading_; }
		private isLoading_:boolean;

		public getCurrentCount():number { return this.currentCount; }
		private currentCount:number;

		public getTotalCount():number { return this.totalCount; }
		private totalCount:number;

		public getTexturesByUrl(url:string):THREE.Texture { return this.texturesByUrl[url]; }
		private texturesByUrl:util.Hash<THREE.Texture>;

		public getTexturesByQueryId(textureId:string):THREE.Texture { return this.texturesByQueryId[textureId]; }
		private texturesByQueryId:util.Hash<THREE.Texture>;

		private loadingQueries:LoaderQuery[];
		private loadingQueryIndex:number;

		private queriesByQueryId:util.Hash<LoaderQuery>;
		private queriesByUrl:util.Hash<LoaderQuery>;
		private eventDispatcher:EventDispatcher;

		private static id:number = 0;
	}





	export class LoaderQuery {
		constructor() {
			this.isLoading = false;
			this.isLoadComplete = false;
		}

		public id:string;
		public type:string;
		public url:string;
		public param:any;
		public content:any;
		public isLoading:boolean;
		public isLoadComplete:boolean;
	}
}