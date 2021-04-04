const WakeExecutionChain = require('./execution-chains/wake-execution-chain.js');
const WriteSystemInformation = require('./data-access/write-system-information.js');
const GetSystemInformation = require('./main-functions/get-system-information.js');
const ServerClient = require('./data-access/server-client.js');
const ScreenshotExecutionChain = require('./execution-chains/screenshot-execution-chain.js');
const RestartExecutionChain = require('./execution-chains/restart-execution-chain.js');

var isWakePcCache = 0;
var isWakePc = 0;

var wanIpAddress = '';

let wakeChain = new WakeExecutionChain();
let writeSystemInfo = new WriteSystemInformation();
let getSystemInformation = new GetSystemInformation();
let serverClient = new ServerClient();
let screenshotChain = new ScreenshotExecutionChain();
let restartChain = new RestartExecutionChain();

function runPeriodicTasks() {
	console.log(new Date() + ': running periodic tasks...');
	getSystemInformation.getUpdatedWanIp(systemInformationUpdated);
}

function systemInformationUpdated(latestWanIpAddress) {
	wanIpAddress = latestWanIpAddress;
	if(wanIpAddress.length > 0) {
		writeSystemInfo.refreshDbInfo(wanIpAddress);
	}
	console.log(new Date() + ': periodic tasks complete. Sleeping');
}

function processApprequest(requestType) {
	if(requestType == 'wake') {
		console.log(new Date() + ': waking...');
		wakeChain.startWakeChain(serverClient);
	} else if(requestType == 'screenshot') {
		console.log(new Date() + ': taking screenshot...');
		screenshotChain.startScreenshotChain(serverClient);
	} else if(requestType == 'restart') {
		console.log(new Date() + ': restarting machine...');
		restartChain.startRestartChain(serverClient);
	}
}

serverClient.startClient(processApprequest);
serverClient.writeNotification('restart', 'machine has fully restarted');
setInterval(runPeriodicTasks, 10000);