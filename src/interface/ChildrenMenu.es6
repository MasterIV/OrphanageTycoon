import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import {HorizontalLayout} from 'tin-engine/basic/layout';
import {VerticalLayout} from 'tin-engine/basic/layout';
import ChildInfo from './ChildInfo';
import Kid from './../entity/Kid';
import config from './../config/config';
import sound from 'tin-engine/core/sound';



export default class ChildrenMenu extends Entity {
	constructor(children) {
		super(new V2(58, 0),  new V2(config.screen.w - 58, 128));
		this.children = children;
		this.childInfo = [];
		for(var i = 0; i < 3; i++) {
			const info = new ChildInfo(new V2(0, i * 40 + 8));
			this.childInfo.push(info);
			this.add(info);
		}
		
		this.add(Button.create(new V2(540, 8), () => this.scrollUp()).img('img/ui/upbutton.png'));
		this.add(Button.create(new V2(540, 72), () => this.scrollDown()).img('img/ui/downbutton.png'));
		
		this.scrollOffset = 0;
	}
	
	update(delta) {
		var displayPos = 0;
		for(var i = this.scrollOffset; displayPos < 3; i++) {
			const child = i >= this.children.entities.length ? null : this.children.entities[i];
			this.childInfo[displayPos].setChild(child);
			displayPos++;
		}
	}
	
	scrollUp() {
		sound.play('sound/click.mp3');
		this.scrollOffset = Math.max(0, this.scrollOffset - 1);
	}
	
	scrollDown() {
		sound.play('sound/click.mp3');
		this.scrollOffset = Math.min(this.children.entities.length - 1, this.scrollOffset + 1);
	}
}