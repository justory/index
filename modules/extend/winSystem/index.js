define(function(require, exports, module) {

	var fn = function() {
		var v = require("extend/winSystem/version");
		return {
			f: function(cb) {
				require.async("extend/winSystem/frame/" + v.frame, function(f) {
					cb(f);
				});
			},
			fg: function(cb) {
				require.async("extend/winSystem/frameGroup/" + v.frameGroup, function(fg) {
					cb(fg);
				});
			},
			frame: {
				open: function() {
					var arg = arguments;
					fn.f(function(f) {
						f.open.apply("", arg);
					});
				},
				close: function() {
					//
				}
			},
			frameGroup: {
				open: function() {
					var arg = arguments;
					fn.fg(function(fg) {
						fg.open.apply("", arg);
					});
				},
				close: function() {
					//
				}
			}
		}
	}();

	module.exports = fn;

});