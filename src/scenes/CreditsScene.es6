import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import Button from 'tin-engine/basic/button';
import TextEntity from 'tin-engine/basic/text';
import ImageEntity from 'tin-engine/basic/image';
import {VerticalLayout} from 'tin-engine/basic/layout'
import TitleScene from './TitleScene';

export default class CreditsScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);
		this.add(new ImageEntity(Zero(), 'img/ui/gamebg.png'));
		this.add(Button.create(new V2(180, 300), () => this.parent.goto(new TitleScene())).rect(200, 30).text("Back"));
		var credits = new VerticalLayout(new V2(270, 30), 0, 50);
		credits.add(new TextEntity(Zero(), 'Credits:'));
		credits.add(new TextEntity(Zero(), 'asdf'));
		credits.add(new TextEntity(Zero(), 'asdffds:'));
		credits.add(new TextEntity(Zero(), 'asdffsd:'));
		//var credits = new TextEntity(new V2(100, 100), 'asdfdsafsdfsdfsd dsfsdfsadf\ndfsafsdfs');
		
		this.add(credits);
	}
}
