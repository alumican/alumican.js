/// <reference path='../../include.ts' />

namespace alm.loader {

	export type CompleteFunction = (content:any) => void;
	export type ErrorFunction = (message:string) => void;

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

			this.handlersByType = {};

			this.eventDispatcher = new alm.event.EventDispatcher();
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public require(url:string, type:string):string {
			return this.addQuery(type, url, {});
		}

		private addQuery(type:string, url:string, param:any):string {
			if (this.queriesByUrl[url]) return this.queriesByUrl[url].id;

			const query:FileQuery = new FileQuery();
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
				const query:FileQuery = this.loadingQueries[this.loadingQueryIndex];
				query.isLoading = true;
				query.isLoadComplete = false;
				trace('[AssetLoader] loading... ' + '\'' + query.url + '' as '' + query.type + '\'');

				const handler:IFileHandler = this.handlersByType[query.type];
				if (handler) {
					handler.load(query.url, (content:any):void => {
						this.fileLoadCompleteHandler(query, content);
					},(message:string = ''):void => {
						this.fileLoadErrorHandler(query, message);
					});
				} else {
					trace('[AssetLoader] handler is not found \'' + query.type + '\'');
					this.next();
				}

			} else {
				this.isLoading_ = false;
				this.loadingQueries = [];
				this.loadingQueryIndex = -1;
				this.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.COMPLETE, this, this.currentCount / this.totalCount, this.currentCount, this.totalCount));
			}
		}

		public addHandler(handler:IFileHandler):void {
			this.handlersByType[handler.getType()] = handler;
		}

		private fileLoadCompleteHandler = (query:FileQuery, content:any):void => {
			query.isLoading = false;
			query.isLoadComplete = true;
			query.content = content;
			if (query.param.onLoad) {
				query.param.onLoad(content);
			}
			this.next();
		};

		private fileLoadErrorHandler = (query:FileQuery, message:string):void => {
			query.isLoading = false;
			query.isLoadComplete = true;
			if (query.param.onError) {
				query.param.onError(message);
			}
			this.next();
		};

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

		public getQueryByQueryId(queryId:string):FileQuery {
			return this.queriesByQueryId[queryId];
		}


		public getQueryByUrl(url:string):FileQuery {
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

		public getContentByUrl<T = any>(url:string):T { return this.queriesByUrl[url].content; }
		public getContentByQueryId<T = any>(textureId:string):T { return this.queriesByQueryId[textureId].content; }

		private loadingQueries:FileQuery[];
		private loadingQueryIndex:number;

		private queriesByQueryId:util.Hash<FileQuery>;
		private queriesByUrl:util.Hash<FileQuery>;

		private handlersByType:util.Hash<IFileHandler>;

		private eventDispatcher:alm.event.EventDispatcher;

		private static id:number = 0;
	}
}