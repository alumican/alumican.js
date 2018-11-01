/// <reference path='../../include.ts' />

namespace alm.util {

	export class CommandUtil {

		public static stop(command:cmd.Command):any {
			if (command) command.interrupt();
			return null;
		}

		public static sequence(execute:boolean, ...commands:(cmd.Command|Function)[]):cmd.Serial {
			const c:cmd.Serial = new cmd.Serial();
			c.addCommand(...commands);
			if (execute) c.execute();
			return c;
		}

		public static single(execute:boolean, command:cmd.Command):cmd.Command {
			if (execute && command) command.execute();
			return command;
		}

		private constructor() {}
	}
}