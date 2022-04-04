import colors from "colors";
import { timeStamp } from "console";

/**
 * Command error handler
 * @param {string} logMsg - Message to log on the console
 */
function handleError(logMsg: string, msg: string, error: any): string {
	console.log(colors.red(`❌ ${logMsg} - ${timeStamp("MM:DD:YYYY HH:mm:ss")}`));
	console.error({
		msg,
		error,
	});

	return "There was an error, please try again later...";
}

export { handleError };
