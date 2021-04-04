const Shell = require('node-powershell');

var ps;

class ScreenshotFunctions {
	
	takeScreenshot(callback, imageDirectory) {
		var randomNumber = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
		
		ps = getNewShell();
		ps.addCommand(`./take_screenshot.ps1 "` + randomNumber + `" "` + imageDirectory + `"` );
		ps.invoke()
			.then(response => {
				console.log(new Date() + ': screenshot taken');
				ps.dispose().then(code => {}).catch(error => {});
				callback(randomNumber + '.bmp');
			})
			.catch(err => {
				console.log(err);
				ps.dispose().then(code => {}).catch(error => {});
			});
	}
}

module.exports = ScreenshotFunctions

function getNewShell() {
	return new Shell({
		executionPolicy: 'Bypass',
		noProfile: true
	});
}