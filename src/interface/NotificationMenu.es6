import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import Button from 'tin-engine/basic/button';
import {VerticalLayout} from 'tin-engine/basic/layout';
import FontStyle from 'tin-engine/definition/font';
import Notification from './Notification';
import config from './../config/config';
/*
class NotificationDisplay extends Entity {
	constructor(pos) {
		super(pos, new V2(config.screen.w - 48, 128));
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
	constructor() {
		super(new V2(48, 0), new V2(config.screen.w - 48, 128));
		this.notificationFont = new FontStyle(18, 'white');
		//this.notifications = new VerticalLayout(new V2(592/2,12), 0, 0);
		//this.add(this.notifications);
		this.notifications = new NotificationDisplay(new V2(592/2, -6));
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
}*/
export default class NotificationMenu extends Entity {
	constructor() {
		super(new V2(48, 0), new V2(config.screen.w - 48, 128));
		this.notificationFont = new FontStyle(18, 'white');
		this.notifications = [];
		this.notificationDisplays = [];
		for(var i = 0; i < 6; i++) {
			const notification = new Notification(new V2(592 / 2, i * 20 + 15), this.notificationFont);
			this.notificationDisplays.push(notification);
			this.add(notification);
		}
		this.scrollOffset = 0;
		this.add(this.notifications);
		this.addNotification = this.addNotification.bind(this);
		window.addEventListener('notification', this.addNotification);
		
		this.add(Button.create(new V2(540, 10), () => this.scrollUp()).img('img/ui/upbutton.png'));
		this.add(Button.create(new V2(540, 70), () => this.scrollDown()).img('img/ui/downbutton.png'));
	}
	
	addNotification(e) {
		if(e.detail.type == 'new_child') {
			this.notifications.push(e.detail.child.name + ' appeared on your doorstep.');
		}
		else if(e.detail.type == 'adoption') {
			this.notifications.push(e.detail.child.name + ' has been adopted.');
		}
		else if(e.detail.type == 'runaway') {
			this.notifications.push(e.detail.child.name + ' has run away.');
		}
		else if(e.detail.type == 'monthly') {
			this.notifications.push('Monthly Report: The government sent you $' + 'this month');
		}
		this.scrollOffset++;
		this.updateText();
	}
	
	updateText() {
		for(var i = 0; i < 6; i++) {
			this.notificationDisplays[i].text(((this.scrollOffset - i - 1) <= 0) ? '' : this.notifications[this.scrollOffset - i - 1]);
		}
	}
	
	scrollUp() {
		this.scrollOffset = Math.min(this.notifications.length, this.scrollOffset + 1);
		this.updateText();
	}
	
	scrollDown() {
		this.scrollOffset = Math.max(2, this.scrollOffset - 1);
		this.updateText();
	}
}