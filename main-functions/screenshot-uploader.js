var client = require('scp2');
const ServerClient = require('../data-access/server-client.js');

let notificationWriter = new ServerClient();

class ScreenshotUploader {
	
	uploadScreenshot(filename, notificationType, notificationText) {
		client.scp(filename, {
			host: '185.176.42.221',
			username: 'root',
			password: '1j2q0cdM9IFb',
			path: '/var/www/lebtours.com/robs-home-info/images/'
		}, function(err) {
		   if(err){
			  console.log(new Date() + ': error in screenshot upload');
			  console.log(err);
		   }else{
			  notificationWriter.writeNotification(notificationType, notificationText);
			  console.log(new Date() + ': screenshot uploaded to server');   
		   }
		});
	}
}

module.exports = ScreenshotUploader