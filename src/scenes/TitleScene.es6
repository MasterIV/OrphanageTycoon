import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import Button from 'tin-engine/basic/button';
import {VerticalLayout} from 'tin-engine/basic/layout'
import GameScene from './GameScene';
import CreditsScene from './CreditsScene';

export default class TitleScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);
		this.bg = 'img/title.png';
		var playButton = Button.create(new V2(251, 321), () => this.parent.goto(new GameScene())).img('img/ui/playbutton.png');
		var creditsButton = Button.create(new V2(208, 404), () => this.parent.goto(new CreditsScene())).img('img/ui/creditsbutton.png');
		var helpButton = Button.create(new V2(249, 363), () =>  window.open('https://github.com/MasterIV/OrphanageTycoon/blob/master/README.md')).img('img/ui/helpbutton.png');

		
		this.add(playButton);
		this.add(helpButton);
		this.add(creditsButton);
	}
}
