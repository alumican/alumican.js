/// <reference path="../reference.ts" />

namespace alm {

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
	}
}