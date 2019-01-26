import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import ViewPort from 'tin-engine/lib/viewport';
import Menu from '../interface/Menu';
import Button from 'tin-engine/basic/button';
import ImageEntity from 'tin-engine/basic/image';

export default class GameScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);

		// const viewport = new ViewPort();
		// viewport.setSize(1440, 500);
		// this.add(viewport);
		this.add(new ImageEntity(Zero, 'img/ui/gamebg.png'));
		this.add(new Menu(new V2(0, config.screen.h - 128), new V2(config.screen.w, 128)));

	}
}
