import V2, { Zero } from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity';
import config from '../config/config';
import Button from 'tin-engine/basic/button';
import ImageEntity from 'tin-engine/basic/image';
import { VerticalLayout } from 'tin-engine/basic/layout';
import graphics from 'tin-engine/core/graphic';
import sound from 'tin-engine/core/sound';

graphics.add('img/ui/buildmenubutton.png');
graphics.add('img/ui/employeemenubutton.png');
graphics.add('img/ui/kidsmenubutton.png');
graphics.add('img/ui/notificationmenubutton.png');
graphics.add('img/ui/menubg.png');
graphics.add('img/ui/upbutton.png');
graphics.add('img/ui/downbutton.png');

export default class Menu extends Entity {
	constructor() {
		super(new V2(0, config.screen.h - 128), new V2(config.screen.w, 128));
		this.add(new ImageEntity(new V2(48,0), 'img/ui/menubg.png'));
		
		this.buildMenu = null;
		this.childrenMenu = null;
		this.employeeMenu = null;
		this.notificationMenu = null;
		
		var menuButtonLayout = new VerticalLayout(Zero(), 0, 0);

		menuButtonLayout.add(Button.create(Zero(), () => this.switchMenu(0)).img('img/ui/buildmenubutton.png'));
		menuButtonLayout.add(Button.create(Zero(), () => this.switchMenu(1)).img('img/ui/kidsmenubutton.png'));
		menuButtonLayout.add(Button.create(Zero(), () => this.switchMenu(2)).img('img/ui/employeemenubutton.png'));
		menuButtonLayout.add(Button.create(Zero(), () => this.switchMenu(3)).img('img/ui/notificationmenubutton.png'));

		this.add(menuButtonLayout);
	}
	
	addMenu(menu, index) {
		switch(index) {
			case 0:
				this.buildMenu = menu;
				this.add(this.buildMenu);
			break;
			case 1:
				this.childrenMenu = menu;
			break;
			case 2:
				this.employeeMenu = menu;
			break;
			case 3:
				this.notificationMenu = menu;
			break;
		}
	}
	
	switchMenu(index) {
		sound.play('sound/click.mp3');
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