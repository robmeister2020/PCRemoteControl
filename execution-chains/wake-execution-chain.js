const WakeFunctions = require('../main-functions/wake-functions.js');
const TeamViewerFunctions = require('../main-functions/teamviewer-functions.js');
const ScreenshotFunctions = require('../main-functions/screenshot-functions.js');
const ScreenshotUploader = require('../main-functions/screenshot-uploader.js');
const WriteSystemInformation = require('../data-access/write-system-information.js');

let wakeFunctions = new WakeFunctions();
let teamViewerFunctions = new TeamViewerFunctions();
let screenshotFunctions = new ScreenshotFunctions();
let screenshotUploader = new ScreenshotUploader();
let writeSystemInfo = new WriteSystemInformation();

var notificationWriter;
var notificationType;
var notificationText;

class WakeExecutionChain {
	
	startWakeChain(writeNotification) {
		console.log(new Date() + ': Waking machine from sleep state');
		notificationWriter = writeNotification;
		wakeFunctions.wakeMachine(this.openTeamViewer);
	}
	
	openTeamViewer() {
		console.log(new Date() + ': waiting for 5 seconds before opening TeamViewer...');
		notificationWriter.writeNotification('wake', 'Laptop is awake');
		setTimeout(function(){
			console.log(new Date() + ': closing open instances of TeamViewer');
			teamViewerFunctions.closeTeamViewer();
			console.log(new Date() + ': opening TeamViewer');
			teamViewerFunctions.openTeamViewer(new WakeExecutionChain().takeTeamViewerScreenshot);
		}, 5000)
	}
	
	takeTeamViewerScreenshot() {
		console.log(new Date() + ': waiting 20 seconds before attempting to take TeamViewer screenshot...');
		setTimeout(function(){
			console.log(new Date() + ': taking TeamViewer screenshot');
			screenshotFunctions.takeScreenshot(new WakeExecutionChain().saveTeamViewerScreenshotFilename, 'teamviewer-screenshots');
		}, 20000);
	}
	
	saveTeamViewerScreenshotFilename(filename) {
		console.log(new Date() + ': updating latest TeamViewer screenshot name on server');
		writeSystemInfo.updateTeamViewerImageName(new WakeExecutionChain().uploadTeamViewerScreenshot, filename);
	}
	
	uploadTeamViewerScreenshot(filename) {
		console.log(new Date() + ': Uploading TeamViewer screenshot...');
		notificationType = 'teamViewerScreenshot';
		notificationText = 'New TeamViewer code is available';
		screenshotUploader.uploadScreenshot('teamviewer-screenshots/' + filename, notificationType, notificationText);
	}
}

module.exports = WakeExecutionChain