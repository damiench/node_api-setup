var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
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
			'/authenticate/*': {
				'target': {
					'host': 'localhost',
					'protocol': 'http',
					'port': 3000
				},
				changeOrigin: true,
				ignorePath: true,
				secure: false
			}
		}
	}
};
