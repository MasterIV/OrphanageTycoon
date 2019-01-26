import Game from 'tin-engine/core/game.es6';
import graphics from 'tin-engine/core/graphic';
import controls from 'tin-engine/core/controls';
import mouse from 'tin-engine/core/mouse';
import config from './config/config';
import TitleScene from './scenes/TitleScene';

import rooms from './config/rooms';

window.onload = () => {
	for(var r in rooms)
		graphics.add('img/rooms/'+r+'.png');

	graphics.load(() => {
		document.getElementById('loading').style.display = 'none';

		const game = new Game(config);
		controls.init(game);
		mouse.init(game);
		game.run(new TitleScene());
	});
};
