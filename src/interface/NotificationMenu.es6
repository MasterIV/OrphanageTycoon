import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import Button from 'tin-engine/basic/button';
import {VerticalLayout} from 'tin-engine/basic/layout';
import FontStyle from 'tin-engine/definition/font';
import Notification from './Notification';

export default class NotificationMenu extends Entity {
	constructor(pos, size) {
		super(pos, size);
		this.notificationFont = new FontStyle(12, 'white');
		this.notifications = new VerticalLayout(new V2(592/2,12), 0, 0);
		this.notifications.add(new Notification('asdf', this.notificationFont));
		this.add(this.notifications);
	}
	
	addNotification(text) {
		this.notifications.add(new Notification(text, this.notificationFont));
	}
}