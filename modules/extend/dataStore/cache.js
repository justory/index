define(function(require, exports, module) {

	var log = require('extend/logRecord/console');
	var prefs = require('extend/dataStore/prefs');

	var fn = function() {
		return {
			upDate: function() {
				var arg = arguments;
				var data = (typeof(arg[2]) != "function") ? arg[2] : {};
				var ajax = require('extend/dataTraffic/ajax');
				setTimeout(function() {
					ajax.get.call({
						callback: function(r) {
							prefs.set.call("", arg[0], r);
							(arglast(arg)) ? arglast(arg)(r): "";
						}
					}, arg[1], data);
				}, 300);
			},
			setDate: function() {
				var arg = arguments;
				prefs.get.call("", arg[0], function(r) {
					if (!r) {
						prefs.set.call("", arg[0], arg[1]);
					}
				});
			}
		}
	}();

	module.exports = fn;

});