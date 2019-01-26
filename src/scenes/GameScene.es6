import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import Viewport from '../entity/Viewport';
import Menu from '../interface/Menu';
import Button from 'tin-engine/basic/button';
import Orphanage from '../entity/Orphanage';

export default class GameScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);
		this.bg = 'img/ui/gamebg.png';

		const orphanage = new Orphanage();
		const viewport = new Viewport(orphanage);

		this.add(viewport);
		this.add(new Menu(new V2(0, config.screen.h - 128), new V2(config.screen.w, 128)));

	}
}
