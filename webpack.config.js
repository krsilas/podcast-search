const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin')
const path = require('path')

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
				test: /\.(png|jpe?g|gif|svg|html)(\?.*)?$/,
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
				target: 'http://localhost:3000/',
				pathRewrite: {'^/proxy': '/proxy'},
				changeOrigin: true,
			}
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*',
		}
	},
	plugins: [
		new CopyPlugin({
			patterns: [{from: './src/index.html', to: 'index.html'}]
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new InjectManifest({
			swSrc: "./src/src-sw.js",
			swDest: "service-worker.js",
		
		})
	],
	devtool: prod ? false: 'source-map'
};
