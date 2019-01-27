import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import Button from 'tin-engine/basic/button';
import {VerticalLayout} from 'tin-engine/basic/layout';
import FontStyle from 'tin-engine/definition/font';
import Notification from './Notification';

class NotificationDisplay extends Entity {
	constructor(pos, size) {
		super(pos, size);
		this.notifications = [];
		this.notificationOffset = 0;
		this.scrollOffset = 0;
	}
	
	add(notification) {
		notification.position.y = this.notificationOffset;
		this.notificationOffset -= 20;
		this.entities.push(notification);
		if(this.scrollOffset == 0) {
			this.scrollUp();
		}
	}
	
	scrollUp() {
		this.position.y += 20;
	}
	
	scrollDown() {
		this.position.y -= 20;
	}
}

export default class NotificationMenu extends Entity {
	constructor(pos, size) {
		super(pos, size);
		this.notificationFont = new FontStyle(18, 'white');
		//this.notifications = new VerticalLayout(new V2(592/2,12), 0, 0);
		//this.add(this.notifications);
		this.notifications = new NotificationDisplay(new V2(592/2, 0), size);
		this.add(this.notifications);
		this.addNotification = this.addNotification.bind(this);
		window.addEventListener('notification', this.addNotification);
	}
	
	addNotification(e) {
		if(e.detail.type == 'new_child') {
			this.notifications.add(new Notification(e.detail.child.name + ' appeared on your doorstep.', this.notificationFont));
		}
		else if(e.detail.type == 'adoption') {
			this.notifications.add(new Notification(e.detail.child.name + ' has been adopted.', this.notificationFont));
		}
		else if(e.detail.type == 'runaway') {
			this.notifications.add(new Notification(e.detail.child.name + ' has run away.', this.notificationFont));
		}
		else if(e.detail.type == 'monthly') {
			this.notifications.add(new Notification('Monthly Report: The government sent you $' + 'this month', this.notificationFont));
		}
	}
}