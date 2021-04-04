const Shell = require('node-powershell');

var ps;

class RestartFunctions {
	
	restartMachine(notificationWriter) {
		
		notificationWriter.writeNotification('restart', 'machine is restarting');
						
		ps = getNewShell();
		ps.addCommand(`Restart-Computer -Force`);
		ps.invoke()
			.then(response => {
				ps.dispose().then(code => {}).catch(error => {});
			})
			.catch(err => {
				console.log(err);
				ps.dispose().then(code => {}).catch(error => {});
			});
	}
}

module.exports = RestartFunctions

function getNewShell() {
	return new Shell({
		executionPolicy: 'Bypass',
		noProfile: true
	});
}