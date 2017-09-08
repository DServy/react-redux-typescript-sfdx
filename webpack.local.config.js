var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

var child_process = require('child_process');
var orgInfo = JSON.parse(child_process.execSync("sfdx force:org:display --json").toString('utf8'));

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		'react-hot-loader/patch',
		'./index.tsx'
	],
	output: {
		filename: 'app.js',
		publicPath: "/",
		path: path.resolve(__dirname, "dist")
	},
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'json', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.(ts|tsx)$/,
				loader: ['react-hot-loader/webpack', 'ts-loader']
			},
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: 'dev-index.html'
        }),
		new webpack.DefinePlugin( //inject global
        {
            '__ACCESSTOKEN__': JSON.stringify(orgInfo.result.accessToken),
            '__RESTHOST__':JSON.stringify('https://dry-taiga-29622.herokuapp.com')
		}),
	],
	devServer: {
        hot: true,
        port: 3000
		//Enable this if you want to never refresh (this allows hot-reloading app.tsx, but won't auto-refresh if you change index.tsx)
		//hotOnly: true
	}
};