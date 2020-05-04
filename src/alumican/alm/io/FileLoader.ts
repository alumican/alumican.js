/// <reference path='../../index.ts' />

namespace alm.io {

	import EventDispatcher = alm.event.EventDispatcher;
	export type CompleteFunction = (content:any, info?:any) => void;
	export type ErrorFunction = (info?:any) => void;

	export class FileLoader extends EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(totalThreadCount:number = 3) {
			super();

			this.isLoading_ = false;

			this.currentCount = 0;
			this.totalCount = 0;

			this.currentThreadCount = 0;
			this.totalThreadCount = totalThreadCount;

			this.loadingQueries = [];
			this.loadingQueryIndex = -1;

			this.queriesByQueryId = {};
			this.queriesByUrl = {};

			this.handlersByType = {};

			trace('[FileLoader] totalThreadCount : ' + this.totalThreadCount);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public require(url:string, type:string, id:string = ''):string {
			return this.addQuery(type, url, {}, id);
		}

		private addQuery(type:string, url:string, param:any, id:string = ''):string {
			if (this.queriesByUrl[url]) return this.queriesByUrl[url].id;

			const query:FileQuery = new FileQuery();
			query.type = type;
			query.url = url;
			query.param = param;

			if (id != '') {
				query.id = id;
			} else {
				query.id = String(FileLoader.id);
				++FileLoader.id;
			}

			this.loadingQueries.push(query);
			this.queriesByQueryId[query.id] = query;
			this.queriesByUrl[query.url] = query;
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

			const progress = this.currentCount / this.totalCount;
			if (this.currentCount == 0) {
				this.dispatchEvent(new FileLoaderProgressEvent(FileLoaderProgressEvent.START, this, progress, this.currentCount, this.totalCount));
			} else {
				this.dispatchEvent(new FileLoaderProgressEvent(FileLoaderProgressEvent.PROGRESS, this, progress, this.currentCount, this.totalCount));
			}

			while (this.currentThreadCount < this.totalThreadCount) {
				if (this.loadingQueryIndex + 1 < this.totalCount) {
					// add thread
					++this.currentThreadCount;

					++this.loadingQueryIndex;
					const query:FileQuery = this.loadingQueries[this.loadingQueryIndex];
					query.isLoading = true;
					query.isLoadComplete = false;
					trace('[FileLoader] loading... ' + '\'' + query.url + '\' as \'' + query.type + '\'');

					const handler:IFileHandler = this.handlersByType[query.type];
					if (handler) {
						handler.load(query.url, (content:any, info:any = null):void => {
							this.fileLoadCompleteHandler(query, content, info);
						},(info:any = null):void => {
							this.fileLoadErrorHandler(query, info);
						});
					} else {
						trace('[FileLoader] handler is not found \'' + query.type + '\'');
						--this.currentThreadCount;
					}
					// continue loop

				} else {
					// all finished
					this.isLoading_ = false;
					this.loadingQueries = [];
					this.loadingQueryIndex = -1;
					this.dispatchEvent(new FileLoaderProgressEvent(FileLoaderProgressEvent.COMPLETE, this, progress, this.currentCount, this.totalCount));
					break;
				}
			}

			/*
			if (this.currentCount < this.totalCount) {
				++this.loadingQueryIndex;
				const query:FileQuery = this.loadingQueries[this.loadingQueryIndex];
				query.isLoading = true;
				query.isLoadComplete = false;
				trace('[FileLoader] loading... ' + '\'' + query.url + '\' as \'' + query.type + '\'');

				++this.currentThreadCount;

				const handler:IFileHandler = this.handlersByType[query.type];
				if (handler) {
					handler.load(query.url, (content:any):void => {
						this.fileLoadCompleteHandler(query, content);
					},(message:string = ''):void => {
						this.fileLoadErrorHandler(query, message);
					});
				} else {
					trace('[FileLoader] handler is not found \'' + query.type + '\'');
					--this.currentThreadCount;
					this.next();
				}

			} else {
				this.isLoading_ = false;
				this.loadingQueries = [];
				this.loadingQueryIndex = -1;
				this.dispatchEvent(new FileLoaderEvent(FileLoaderEvent.COMPLETE, this, this.currentCount / this.totalCount, this.currentCount, this.totalCount));
			}
			*/
		}

		public addHandler(handler:IFileHandler):void {
			this.handlersByType[handler.getType()] = handler;
		}

		private fileLoadCompleteHandler = (query:FileQuery, content:any, info:object = null):void => {
			--this.currentThreadCount;
			query.isLoading = false;
			query.isLoadComplete = true;
			query.content = content;
			if (query.param.onLoad) {
				query.param.onLoad(content, info);
			}

			this.dispatchEvent(new FileLoaderSuccessEvent(FileLoaderSuccessEvent.SUCCESS, this, content, info));
			this.next();
		};

		private fileLoadErrorHandler = (query:FileQuery, info:any = null):void => {
			--this.currentThreadCount;
			query.isLoading = false;
			query.isLoadComplete = true;
			if (query.param.onError) {
				query.param.onError(info);
			}

			this.dispatchEvent(new FileLoaderErrorEvent(FileLoaderErrorEvent.ERROR, this, info));
			this.next();
		};

		public getQueryByQueryId(queryId:string):FileQuery {
			return this.queriesByQueryId[queryId];
		}

		public getQueryByUrl(url:string):FileQuery {
			return this.queriesByUrl[url];
		}

		public isLoading():boolean {
			return this.isLoading_;
		}

		public getCurrentCount():number {
			return this.currentCount;
		}

		public getTotalCount():number {
			return this.totalCount;
		}

		public getContentByUrl<T = any>(url:string):T {
			return this.queriesByUrl[url].content;
		}

		public getContentByQueryId<T = any>(textureId:string):T {
			return this.queriesByQueryId[textureId].content;
		}

		public getCurrentThreadCount():number {
			return this.currentThreadCount;
		}

		public getTotalThreadCount():number {
			return this.totalThreadCount;
		}





		// --------------------------------------------------
		//
		// VARIABLE
		//
		// --------------------------------------------------

		private isLoading_:boolean;

		private currentCount:number;
		private totalCount:number;

		private currentThreadCount:number;
		private totalThreadCount:number;

		private loadingQueries:FileQuery[];
		private loadingQueryIndex:number;

		private queriesByQueryId:util.Hash<FileQuery>;
		private queriesByUrl:util.Hash<FileQuery>;

		private handlersByType:util.Hash<IFileHandler>;

		private static id:number = 0;
	}
}
