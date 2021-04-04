const Shell = require('node-powershell');

var ps;

class GetSystemInformation {
	
	getUpdatedWanIp(callback) {
		ps = getNewShell();
		ps.addCommand(`(Invoke-WebRequest ifconfig.me/ip).Content`);
		ps.invoke()
			.then(response => {
				ps.dispose().then(code => {}).catch(error => {});
				this.getMachineIp(callback, response);
			})
			.catch(err => {
				ps.dispose().then(code => {}).catch(error => {});
			});

	}
	
	getMachineIp(callback, wanIpAddress) {
		ps = getNewShell();
		ps.addCommand(`(Get-NetIPConfiguration | Where-Object -FilterScript {$_.InterfaceAlias -EQ 'Wi-Fi'}).IPv4Address.IPv4Address`);
		ps.invoke()
			.then(response => {
				callback(wanIpAddress, response);
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