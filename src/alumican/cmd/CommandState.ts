/// <reference path='../index.ts' />

namespace cmd {

	export enum CommandState {
		sleeping     = 0,
		executing    = 1,
		interrupting = 2,
	}
}
