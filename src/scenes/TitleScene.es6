import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import Button from 'tin-engine/basic/button';
import {VerticalLayout} from 'tin-engine/basic/layout'

export default class TitleScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);

		var playButton = Button.create(new V2(0, 680), () => alert('play')).rect(280, 80).text("Play");
		var creditsButton = Button.create(new V2(0, 680), () => alert('play')).rect(360, 80).text("Credits");
		var helpButton = Button.create(new V2(0, 680), () => alert('play')).rect(300, 80).text("Help");

		var vLayout = new VerticalLayout(new V2(0, 20), 20, 50);
		vLayout.add(playButton);
		vLayout.add(creditsButton);
		vLayout.add(helpButton);
		vLayout.align("center");
		this.center(vLayout);
	}
}
