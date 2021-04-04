const io = require("socket.io-client");
const NotificationProcessor = require('../utils/notification-processor.js');

var appRequestProcessorCallback;
var notification;

var failedConnectionAttempts = 0;
var erroredConnectionAttempts = 0;

class ServerClient {
	
	startClient(callback) {
		const socket = io("ws://185.176.42.221:8000", {
			reconnectionDelayMax: 10000,
			reconnectionAttempts: 'Infinity'
		});
		
		socket.on("connect", () => {
			failedConnectionAttempts = 0;
			erroredConnectionAttempts = 0;
			console.log(new Date() + ': notifications and request client connected to remote server');
		});
		
		socket.on("requestToDesktop", (request) => {
			console.log(new Date() + ': request received from app: ' + request);
			appRequestProcessorCallback(request);
		});
		
		socket.on("connect_failed", () => {
			failedConnectionAttempts ++;
			if(failedConnectionAttempts == 10) {
				console.log(new Date() + ': connection has failed 10 times in a row. Restarting machine...');
				appRequestProcessorCallback('restart');
			} else {
				console.log(new Date() + ': connection failed on attempt ' + failedConnectionAttempts);
				console.log(new Date() + ': WARNING: If the connection fails 10 times in a row, machine will be restarted.');
			}
		});
		
		socket.on("connect_error", () => {
			erroredConnectionAttempts ++;
			if(erroredConnectionAttempts == 10) {
				console.log(new Date() + ': connection has thrown an error on the last 10 attempts. Restaring machine...');
				appRequestProcessorCallback('restart');
			} else {
				console.log(new Date() + ': connection error on attempt ' + erroredConnectionAttempts);
				console.log(new Date() + ': WARNING: If the connection throws an error 10 times in a row, machine will be restarted');
			}
		});

		appRequestProcessorCallback = callback;
		
	}
	
	writeNotification(notificationType, notificationText) {
		
		notification = NotificationProcessor.createFormattedNotification(notificationType, notificationText);
		
		const socket = io("ws://185.176.42.221:8000", {
			reconnectionDelayMax: 10000,
			reconnectionAttempts: 'Infinity'
		});
		
		socket.on("connect", () => {
			socket.emit("notification", JSON.stringify(notification));
			socket.close();
		});
	}	
}

module.exports = ServerClient