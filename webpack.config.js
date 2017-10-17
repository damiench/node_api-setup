var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
require('dotenv').config();

var config = {};

(function(env) {
	config = {
		entry: {
			bundle: [
				"react-hot-loader/patch",
				"./src/client/index.tsx",
				"webpack-dev-server/client?http://localhost:8080"]
		},
		output: {
			filename: "bundle.js",
			path: __dirname + "/build/client/",
			filename: '[name].js',
		},
		devtool: 'eval-source-map',
		target: 'web',
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"]
		},

		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				template: './src/client/index.html',
				minify: {
					removeComments: true,
					collapseWhitespace: true
				},
				inject: true
			})
		],

		module: {
			rules: [
				{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			]
		},
		devServer: {
			hot: true,
			proxy: {
				'/': 'http://' + env.HOST + ':' + env.PORT
			}
		}
	};
})(process.env);


module.exports = config;
