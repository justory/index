define(function(require, exports, module) {

	var fn = function() {
		return {
			f: function() {
				return require("extend/winSystem/frame");
			},
			fg: function() {
				return require("extend/winSystem/frameGroup");
			},
			frame: {
				open: function() {
					fn.f().open.apply("", arguments);
				},
				close: function() {
					//
				}
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