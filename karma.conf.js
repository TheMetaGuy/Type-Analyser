module.exports = function (config) {
	config.set({
		frameworks: ["jasmine"], 
		files: [
			"dist/type-master.iife.js",
			"./tests/*.test.js"
		],
		preprocessors: {
			'./tests/*.test.js': ['rollup']
		},
		rollupPreprocessor: {
			plugins: [
			  require('@rollup/plugin-node-resolve')(), 
			  require('@rollup/plugin-commonjs')(), 
			  require('@rollup/plugin-babel')({
				babelHelpers: 'bundled',
				babelrc: false,
				presets: ['@babel/preset-env']
			  })
			],
			output: {
			  format: 'iife',        // Helps Karma to work with the bundle
			  name: 'typeMaster',    // Assuming the global name of your library
			  sourcemap: 'inline'    // Sensible for testing
			},
		},
		reporters: ["progress"],
		browsers: ["ChromeHeadless", "FirefoxHeadless"],
		plugins: [ 
		require('karma-jasmine'),
		require('karma-chrome-launcher'),
		require('karma-firefox-launcher'),
		require('karma-rollup-preprocessor'),
		],      
		singleRun: true,
		autoWatch: false,
		concurrency: Infinity,
		port: 9876,  
		colors: true,
		logLevel: config.LOG_INFO,
	});
};