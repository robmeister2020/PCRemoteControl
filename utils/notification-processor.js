class NotificationProcessor {
	
	static createFormattedNotification(notificationType, notificationText) {
		return {
			notificationText: notificationText,
			notificationTime: new Date(),
			notificationType: notificationType
		}
	}
}

module.exports = NotificationProcessor;