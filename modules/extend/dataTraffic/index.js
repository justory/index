define(function(require, exports, module) {

	var ajax = require('extend/dataTraffic/ajax');
	var listen = require('extend/dataTraffic/listen');

	var fn = function() {
		return {
			publish: function() {
				listen.publish.apply("", arguments[0]);
			},
			subscribe: function() {
				listen.subscribe.apply("",arguments[0]);
			},
			sendData: function() {
				listen.sendData.apply("", arguments[0]);
			},
			getData: function() {
				listen.getData.apply("", arguments[0]);
			},
			get: function() {
				var arg = arguments;
				ajax.get.apply({
					callback: arg[1]
				}, arg[0]);
			},
			post: function() {
				var arg = arguments;
				ajax.post.apply({
					callback: arg[1]
				}, arg[0]);
			},
			upload: function() {
				var arg = arguments;
				ajax.upload.apply({
					callback: arg[1]
				}, arg[0]);
			}
		}
	}();

	module.exports = fn;

});