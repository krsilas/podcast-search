const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const WorkboxConfig = require('./workbox.config.js')

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = { 
	entry: {
		bundle: ['./src/main.js'],
		//'service-worker': './src/service-worker.js'
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						dev: true,
						emitCss: true,
						hotReload: true,
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						  hmr: process.env.NODE_ENV === 'development',
						},
					},
					{ loader: "css-loader", options: { importLoaders: 1 } },
					{
						loader: 'postcss-loader',
						options: {
						  ident: 'postcss',
						  plugins: [
							require('tailwindcss'),
							require('autoprefixer'),
						  ],
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					esModule: false,
					name: '[name].[ext]'
				}
			  },
		]
	},
	mode: process.env.NODE_ENV,
	devServer: {
		historyApiFallback: true,
		proxy: {
			'/proxy': {
				target: 'https://cors-anywhere.herokuapp.com/',
				pathRewrite: {'^/proxy': ''},
				changeOrigin: true,
			}
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new WorkboxWebpackPlugin.InjectManifest({
			swSrc: "./src/service-worker.js",
			swDest: "service-worker.js",
		
		  })
	],
	devtool: prod ? false: 'source-map'
};
