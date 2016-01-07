//define(function(require) {

	/*
	 * justory
	 */

	import Windows from 'extend/window';

	Windows.init();

	import Configs from 'extend/configs';
	import WinSystem from 'extend/winSystem/index';
	import SystemAtic from 'extend/systemAtic/index';
	//require('extend/window').init();
	//var configs = require('extend/configs');

	class _$ {
		constructor() {
			this.configs = Configs;
			this.windows = WinSystem;
			this.systems = SystemAtic;
		}
	}
//
//	_$.prototype = {
//		configs: Configs,
//		windows: WinSystem,
//		systems: SystemAtic
//	};

	window.justory = window[Configs.justory] = new _$();
	
	import Ready from 'extend/ready';
	Ready.init(justory);
	//require('extend/ready').init(justory);

//});