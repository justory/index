define(function(require) {

	/*
	 * justory
	 */
	
	require('extend/window').init();

	var configs = require('extend/configs');

	_$.prototype = {
		configs: configs,
		windows: require('extend/winSystem/index')
	};

	window.justory = window[configs.justory] = new _$();

	require('extend/ready').init(justory);

});