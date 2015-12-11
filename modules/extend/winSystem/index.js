define(function(require, exports, module) {

	var fn = function() {
		return {
			fg: function() {
				return require('extend/winSystem/frameGroup');
			},
			frameGroup: {
				open: function() {
					fn.fg().open.apply("", arguments);
				},
				close: function() {
					//
				}
			}
		}
	}();

	module.exports = fn;

});