const ScreenshotFunctions = require('../main-functions/screenshot-functions.js');
const ScreenshotUploader = require('../main-functions/screenshot-uploader.js');
const WriteSystemInformation = require('../data-access/write-system-information.js');

let screenshotFunctions = new ScreenshotFunctions();
let screenshotUploader = new ScreenshotUploader();
let writeSystemInfo = new WriteSystemInformation();

var notificationWriter;

class ScreenshotExecutionChain {
	
	startScreenshotChain(writeNotification) {
		console.log(new Date() + ': taking screenshot');
		notificationWriter = writeNotification;
		this.takeScreenshot();
	}
	
	takeScreenshot() {
		screenshotFunctions.takeScreenshot(new ScreenshotExecutionChain().saveScreenshotFilename, 'windows-screenshots');
	}
	
	saveScreenshotFilename(filename) {
		console.log(new Date() + ': updating latest screenshot name on server');
		writeSystemInfo.updateWindowsScreenshotName(new ScreenshotExecutionChain().uploadScreenshot, filename);
	}
	
	uploadScreenshot(filename) {
		console.log(new Date() + ': Uploading screenshot...');
		screenshotUploader.uploadScreenshot('windows-screenshots/' + filename, 'windowsScreenshot', 'New Windows screenshot is available');
	}
}

module.exports = ScreenshotExecutionChain