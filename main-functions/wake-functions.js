const Shell = require('node-powershell');

var ps;

class WakeFunctions {
	
	wakeMachine(callback) {
		ps = getNewShell();
		ps.addCommand(`$wshell = New-Object -ComObject wscript.shell;
	$wshell.AppActivate('title of some application')
	Sleep 1
	$wshell.SendKeys('~')`);
	ps.invoke()
        .then(response => {
			console.log(new Date() + ': machine wake successful');
			ps.dispose().then(code => {}).catch(error => {});
			callback();
        })
        .catch(err => {
			ps.dispose().then(code => {}).catch(error => {});
			return false;
        });
}
}

function getNewShell() {
	return new Shell({
		executionPolicy: 'Bypass',
		noProfile: true
	});
}

module.exports = WakeFunctions