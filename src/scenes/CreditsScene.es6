import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import Button from 'tin-engine/basic/button';
import TextEntity from 'tin-engine/basic/text';
import ImageEntity from 'tin-engine/basic/image';
import {VerticalLayout} from 'tin-engine/basic/layout'
import TitleScene from './TitleScene';
import FontStyle from 'tin-engine/definition/font';
import graphics from 'tin-engine/core/graphic';

graphics.add('img/ui/creditsbg.png');

export default class CreditsScene extends Scene {
	constructor() {
		super();
		var font = new FontStyle(18);
		this.setSize(config.screen.w, config.screen.h);
		this.add(new ImageEntity(Zero(), 'img/ui/gamebg.png'));
		this.add(new ImageEntity(new V2(32,16), 'img/ui/creditsbg.png'));
		this.add(Button.create(new V2(220, 400), () => this.parent.goto(new TitleScene())).rect(200, 30).text("Back", font));
		var credits = new VerticalLayout(new V2(320, 50), 0, 50);
		credits.add(new TextEntity(Zero(), 'Credits'));
		credits.add(new TextEntity(Zero(), 'Programming: Tobias Rojahn'));
		credits.add(new TextEntity(Zero(), 'Programming: Norman Wong'));
		credits.add(new TextEntity(Zero(), 'Art: Emily Lampson'));
		credits.add(new TextEntity(Zero(), 'Sound FX: Yeji Jung'));
		credits.add(new TextEntity(Zero(), 'Music: Scott F. Thompson'));
		//var credits = new TextEntity(new V2(100, 100), 'asdfdsafsdfsdfsd dsfsdfsadf\ndfsafsdfs');
		
		this.add(credits);
	}
}
