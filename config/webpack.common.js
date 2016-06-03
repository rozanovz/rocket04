var webpack = require('webpack');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	name: 'js',
	entry:{
		'app': ['./app/app.js'], 
		'vendor': ['./app/vendor.js'],
		'slicknav': ['./app/libs/slicknav.js'],
		'ngCart': ['./app/libs/ngCart.js'],
		'css':[
			'file?name=./styles/main.css!sass!./app/styles/main.scss',
			'file?name=./styles/styles.css!sass!./app/styles/styles.scss'
		],
	},

	output: {
	    path: helpers.root('dist'),
	    publicPath: 'http://localhost:8080/',
	    filename: './scripts/[name].js',
	    chunkFilename: '[id].chunk.js'
  	},
	
	module: {
		loaders: [
			{
				test: /.js?$/,
				loader: 'babel',
				exclude: './node_modules/',
				query:{
					presets: ['es2015'],
					// compact: false
				}
			},
	        { 
	        	test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, 
	        	loader: "file" 
	        }
		]
	},
	
	devServer: {
	    contentBase: './dist',
	    historyApiFallback: true,
		stats: 'minimal'
	},

	plugins: [
	    new webpack.optimize.CommonsChunkPlugin({
	      name: ['app', 'vendor']
	    }),
	    new webpack.NoErrorsPlugin(),
    	new CopyWebpackPlugin([
    		{from: './app/index.html', to: './'},
    		{from: './app/views/', to: './views/'},
    		{from: './app/fonts/', to: './fonts'},
    		{from: './app/styles/arrows.svg', to: './styles'},
    		{from: './app/styles/clock.svg', to: './styles'},
    		{from: './app/styles/spinner.svg', to: './styles'},
    		{from: './app/styles/hamburger_sprites.svg', to: './styles'},
    	])
	]
}