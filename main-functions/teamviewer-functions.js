const Shell = require('node-powershell');

var ps;

class TeamViewerFunctions {
	
	closeTeamViewer() {
		ps = getNewShell();
		ps.addCommand(`Stop-Process -Name "TeamViewer"`);
		ps.invoke()
			.then(response => {
				console.log(new Date() + ' any open TeamViewer instance has been closed');
				ps.dispose().then(code => {}).catch(error => {});
			})
			.catch(err => {
				console.log(err);
				ps.dispose().then(code => {}).catch(error => {});
			});
	}
	
	openTeamViewer(callback) {
		ps = getNewShell();
		ps.addCommand(`C:/Users/thepo/Applications/RobsRemoteInfo/powershell-scripts/open_teamviewer.ps1`);
		ps.invoke()
			.then(response => {
				console.log(new Date() + ' TeamViewer successfully opened');
				ps.dispose();
				callback();
			})
			.catch(err => {
				console.log(err);
				ps.dispose();
			});
	}
}

module.exports = TeamViewerFunctions

function getNewShell() {
	return new Shell({
		executionPolicy: 'Bypass',
		noProfile: true
	});
}