const RestartFunctions = require('../main-functions/restart-functions.js');

let restartFunctions = new RestartFunctions();

var notificationWriter;

class RestartExecutionChain {
	
	startRestartChain(writeNotification) {
		notificationWriter = writeNotification;
		this.restartMachine();
	}
	
	restartMachine() {
		restartFunctions.restartMachine(notificationWriter);
	}
}

module.exports = RestartExecutionChain