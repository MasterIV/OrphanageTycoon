import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import Button from 'tin-engine/basic/button';
import {VerticalLayout} from 'tin-engine/basic/layout';
import Notification from './Notification';

export default class NotificationMenu extends Entity {
	constructor(pos, size) {
		super(pos, size);
		this.notifications = new VerticalLayout(new V2(0,0), 0, 0);
	}
	
	addNotification(notification) {
		this.notifications.add(notification);
	}
}