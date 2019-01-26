const path = require('path');

module.exports = {
	entry: {
		game: './src/game.es6',
	},

	module: { rules: [
		{
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					"presets": ["react", "stage-3"],
					"minified": false
				}
			}
		}
	]},

	resolve: {
		extensions: ['.es6', '.js', '.jsx'],
		modules: ['node_modules']
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'js')
	}
};
