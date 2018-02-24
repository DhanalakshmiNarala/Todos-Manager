module.exports = {
	entry: {
		"index": './index.tsx',
	},
	output: {
		filename: 'bundle/[name].js'
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader?configFile=./tsconfig.json'
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	devtool: 'source-map'	
};