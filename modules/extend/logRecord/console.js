define(function(require, exports, module) {

	var cfg = require('configs');

	var fn = function() {
		return {
			send: function() {
				var t = this;
				if (cfg.debug) {
					var msg = t.msg || "no message!";
					var data = (t.data) ? JSON.stringify(t.data) : "no additional data!";
					var _date = new Date();
					console.log("[" + _date.getUTCSeconds() + ":" + _date.getMilliseconds() + "]{" + msg + "}[" + cfg.winName + "][" + cfg.frameName + "]==>" + data);
				}
			}
		}
	}();

	module.exports = fn;

});