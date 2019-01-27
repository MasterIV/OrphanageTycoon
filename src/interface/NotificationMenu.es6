import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import Button from 'tin-engine/basic/button';
import {VerticalLayout} from 'tin-engine/basic/layout';
import FontStyle from 'tin-engine/definition/font';
import Notification from './Notification';
import config from './../config/config';

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
			this.scrollOffset++;
		}
		else if(e.detail.type == 'adoption') {
			this.notifications.push(e.detail.child.name + ' has been adopted.');
			this.scrollOffset++;
		}
		else if(e.detail.type == 'runaway') {
			this.notifications.push(e.detail.child.name + ' has run away.');
			this.scrollOffset++;	
		}
		else if(e.detail.type == 'month_end') {
			this.notifications.push('$' + e.detail.expenses + ' was paid to your employees.');
			this.notifications.push('Monthly Report: The government sent you $' + e.detail.income + ' this month.');
			this.scrollOffset += 2;
		}

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