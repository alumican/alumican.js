/// <reference path='../include.ts' />

namespace cmd {

	export enum CommandState {
		Sleeping     = 0,
		Executing    = 1,
		Interrupting = 2,
	}
}