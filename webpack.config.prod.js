var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
	entry: {
		bundle: ["./src/client/index.tsx"]
	},
	output: {
		filename: "bundle.js",
		path: __dirname + "/build/client/",
		filename: '[name].js',
	},
	target: 'web',
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/client/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
				// Note that you can add custom options here if you need to handle other custom logic in index.html
				// To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
			trackJSToken: ''
	    }),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			noInfo: true, // set to false to see a list of every file being bundled.
			// options: {
			// 	sassLoader: {
			// 		includePaths: [path.resolve(__dirname, 'src/client', 'scss')]
			// 	},
			// 	context: '/',
			// 	postcss: () => [autoprefixer],
			// }
	    })
	],

	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
		]
	},
	devtool: 'source-map'
};


module.exports = config;
