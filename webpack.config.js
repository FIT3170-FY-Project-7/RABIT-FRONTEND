const path              = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	mode    : 'none',
	devtool : 'source-map',
	output  : {
		path     : path.resolve(__dirname, 'build'),
		filename : 'bundle.js',
	},
	resolve : {
		alias: {
			react: path.join(__dirname, 'node_modules', 'react'),
			berry: path.join(__dirname, 'node_modules', 'berry-material-react-free', 'src')
		},
		modules: [
			path.join(__dirname, 'src'),
			'node_modules',
			path.join(__dirname, 'node_modules', 'berry-material-react-free', 'src'),
			path.join(__dirname, 'node_modules', 'berry-material-react-free', 'node_modules')
		],
		extensions: [ ".js", ".jsx", ".json", ".ts", ".tsx" ]
	},
	module  : { rules: [
			{
				test    : /\.(js|jsx|ts|tsx)$/,
				exclude : /node_modules[\/\\](?!(berry-material-react-free[\/\\]src))/,
				use     : {
					loader: 'babel-loader',
					options: {
						presets : [
							[ '@babel/preset-env', { targets: { node: 'current' } } ],
							'@babel/preset-typescript',
							[ '@babel/preset-react', { runtime: 'automatic' } ]
						],
    					plugins : [ '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime' ]
					}
				}
			},
			{
				test : /\.css$/,
				use  : [ 'style-loader', 'css-loader' ]
			},
			{
				test : /\.scss$/,
				use  : [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				test : /\.html$/,
				use  : [
					{ loader : 'html-loader' },
					// Necessary? { loader : 'markup-inline-loader' }
				]
			},
			{
				test : /\.svg$/,
				use  : [ { loader: 'svg-url-loader', options: { limit: 10000 } } ]
			}
	] },
	plugins: [ new HtmlWebPackPlugin({ template: './src/index.html' }) ]
};
