define(function(require, exports, module) {

	var cfg = require('configs');

	var fn = function() {
		return {
			open: function() {
				var arg = arguments;
				var msg = arg[0];
				if (!msg) return false;
				api.toast({
					msg: msg,
					location: arg[1] || "bottom"
				});
			}
		}
	}();

	module.exports = fn;

});