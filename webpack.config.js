const path              = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool : 'source-map',
	output  : {
		path     : path.resolve(__dirname, 'build'),
		filename : 'bundle.js',
	},
	resolve : {
		modules    : [path.join(__dirname, 'src'), 'node_modules'],
		alias      : { react: path.join(__dirname, 'node_modules', 'react') },
		extensions : [".js", "jsx", ".json", ".ts", ".tsx"]
	},
	module  : { rules: [
			{
				test    : /\.(js|jsx|ts|tsx)$/,
				exclude : /node_modules/,
				use     : { loader: 'babel-loader' }
			},
			{
				test : /\.css$/,
				use  : [
					{ loader : 'style-loader' },
					{ loader : 'css-loader'   }
				]
			},
			{
				test : /\.scss$/,
				use  : [
					{ loader : 'style-loader' },
					{ loader : 'css-loader'   },
					{ loader : 'sass-loader' }
				]
			},
			{
				test : /\.html$/,
				use  : [
					{ loader : 'html-loader' },
					{ loader : 'markup-inline-loader' }
				]
			},
			{
				test : /\.svg$/,
				use  : [ { loader: 'svg-url-loader', options: { limit: 10000 } } ]
			}
	] },
	plugins: [ new HtmlWebPackPlugin({ template: './src/index.html' }) ]
};