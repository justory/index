define(function(require, exports, module) {

	var prefs = require('extend/dataStore/prefs');
	var cache = require('extend/dataStore/cache');

	var fn = function() {
		return {
			setPrefs: function() {
				prefs.set.apply("", arguments[0]);
			},
			getPrefs: function() {
				prefs.get.apply("", arguments[0]);
			},
			upDateCache: function() {
				cache.upDate.apply("", arguments[0]);
			},
			setDataCache: function() {
				cache.setDate.apply("", arguments[0]);
			}
		}
	}();

	module.exports = fn;

});