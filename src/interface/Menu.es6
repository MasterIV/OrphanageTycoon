import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import config from '../config/config';
import BuildMenu from './../interface/BuildMenu';
import ChildrenMenu from './../interface/ChildrenMenu';
import EmployeeMenu from './../interface/EmployeeMenu';
import NotificationMenu from './../interface/NotificationMenu';
import Button from 'tin-engine/basic/button';
import ImageEntity from 'tin-engine/basic/image';
import {VerticalLayout} from 'tin-engine/basic/layout';
import graphics from 'tin-engine/core/graphic';

graphics.add('img/ui/buildmenubutton.png');
graphics.add('img/ui/employeemenubutton.png');
graphics.add('img/ui/kidsmenubutton.png');
graphics.add('img/ui/notificationmenubutton.png');
graphics.add('img/ui/menubg.png');

export default class Menu extends Entity {
	constructor(cursor) {
		super(new V2(0, config.screen.h - 128), new V2(config.screen.w, 128));
		this.cursor = cursor;
		this.add(new ImageEntity(Zero(), 'img/ui/menubg.png'));
		
		this.buildMenu = new BuildMenu(cursor, new V2(48, 0), new V2(this.size.x - 48, this.size.y));	//48 is the width of the menu buttons. Should probably grab the number from a config file instead of just hard coding it.
		this.childrenMenu = new ChildrenMenu(new V2(48, 0), new V2(this.size.x - 48, this.size.y));
		this.employeeMenu = new EmployeeMenu(new V2(48, 0), new V2(this.size.x - 48, this.size.y));
		this.notificationMenu = new NotificationMenu(new V2(48, 0), new V2(this.size.x - 48, this.size.y));
		
		var menuButtonLayout = new VerticalLayout(Zero(), 0, 0);

		menuButtonLayout.add(Button.create(Zero(), () => this.switchMenu(0)).img('img/ui/buildmenubutton.png'));
		menuButtonLayout.add(Button.create(Zero(), () => this.switchMenu(1)).img('img/ui/kidsmenubutton.png'));
		menuButtonLayout.add(Button.create(Zero(), () => this.switchMenu(2)).img('img/ui/employeemenubutton.png'));
		menuButtonLayout.add(Button.create(Zero(), () => this.switchMenu(3)).img('img/ui/notificationmenubutton.png'));

		this.add(menuButtonLayout);
		this.add(this.buildMenu);
	}
	
	switchMenu(index) {
		this.entities.pop();
		switch(index) {
			case 0:
				this.add(this.buildMenu);
			break;
			case 1:
				this.add(this.childrenMenu);
			break;
			case 2:
				this.add(this.employeeMenu);
			break;
			case 3:
				this.add(this.notificationMenu);
			break;
			default:
				this.add(this.buildMenu);
			break;
		}
	}
}