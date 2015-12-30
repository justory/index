define(function(require, exports, module) {

	var fn = function() {
		var v = require("extend/winSystem/version");
		return {
			f: function() {
				return require("extend/winSystem/frame/" + v.frame);
			},
			fg: function() {
				return require("extend/winSystem/frameGroup/" + v.frameGroup);
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