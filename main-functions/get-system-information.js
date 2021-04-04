const Shell = require('node-powershell');

var ps;

class GetSystemInformation {
	
	getUpdatedWanIp(callback) {
		ps = getNewShell();
		ps.addCommand(`(Invoke-WebRequest ifconfig.me/ip).Content`);
		ps.invoke()
			.then(response => {
				callback(response);
				ps.dispose().then(code => {}).catch(error => {});
			})
			.catch(err => {
				ps.dispose().then(code => {}).catch(error => {});
			});

	}
}

function getNewShell() {
	return new Shell({
		executionPolicy: 'Bypass',
		noProfile: true
	});
}

module.exports = GetSystemInformation