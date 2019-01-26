import Scene from 'tin-engine/lib/scene';
import V2, {Zero} from 'tin-engine/geo/v2';
import config from '../config/config';
import colors from 'tin-engine/defaults/colors';
import Button from 'tin-engine/basic/button';

export default class TitleScene extends Scene {
	constructor() {
		super();
		this.setSize(config.screen.w, config.screen.h);

		this.center(Button.create(new V2(0, 100), () => alert('test')).rect(300, 60, colors.default))


	}
}
