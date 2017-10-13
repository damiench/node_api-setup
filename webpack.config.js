var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/client/index.tsx",
	output: {
		filename: "bundle.js",
		path: __dirname + "/build/client/"
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	plugins: [
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


};
