import V2, {Zero} from 'tin-engine/geo/v2';
import Entity from 'tin-engine/basic/entity'
import Button from 'tin-engine/basic/button';
import {HorizontalLayout} from 'tin-engine/basic/layout';
import {VerticalLayout} from 'tin-engine/basic/layout';
import ChildInfo from './ChildInfo';
import Kid from './../entity/Kid';
import config from './../config/config';

class ChildList {
	constructor(maxDisplayed, displayList) {
		this.display = displayList;
		this.children = [];
		this.max = maxDisplayed;
	}
	
	updateList() {
		var displayPos = 0;

		for(var i = this.currentPosition; i < this.children.length && displayPos < 6; i++) {
			this.display[displayPos].setChild(this.children[i]);
			displayPos++;
		}
	}
	
	add(child) {
		
	}
}

export default class ChildrenMenu extends Entity {
	constructor(children) {
		super(new V2(48, 0),  new V2(config.screen.w - 48, 128));
	}
}