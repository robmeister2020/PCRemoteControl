const axios = require('axios');

class WriteSystemInformation {
	
	refreshDbInfo(wanIpAddress, machineIpAddress) {
		axios
		  .post('https://lebtours.com/robs-home-info/robs-home-info.php', {
			wanIpAddress: wanIpAddress,
			machineIpAddress: machineIpAddress,
			isWakePc: 0
		  })
		  .then(res => {
			console.log(new Date() + ': database sync complete');
		  })
		  .catch(error => {
			console.error(res.data);
		  })
	}
	
	updateTeamViewerImageName(callback, imageName) {
		axios
		  .post('https://lebtours.com/robs-home-info/team-viewer-image.php', {
			imageName: imageName
		  })
		  .then(res => {
			console.log(new Date() + ': new screenshot name saved to server');
			callback(imageName);
		  })
		  .catch(error => {
			console.error(error);
		  })
	}
	
	updateWindowsScreenshotName(callback, imageName) {
		axios
		  .post('https://lebtours.com/robs-home-info/windows-image.php', {
			imageName: imageName
		  })
		  .then(res => {
			console.log(new Date() + ': new screenshot name saved to server');
			callback(imageName);
		  })
		  .catch(error => {
			console.error(error);
		  })
	}
}

module.exports = WriteSystemInformation