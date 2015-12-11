define(function(require, exports, module) {

	var log = require('extend/logRecord/console');

	var fn = function() {
		var d = document;
		return {
			publish: function() {
				var arg = arguments;
				$(d).trigger(arg[0], arg[1]);
				log.send.call({
					data: {
						key: arg[0],
						value: arg[1]
					},
					msg: "publish:"
				});
			},
			subscribe: function() {
				var arg = arguments;
				$(d).on(arg[0], function(e, r) {
					arglast(arg)(r);
					log.send.call({
						data: r,
						msg: "subscribe:"
					});
				});
			},
			sendData: function(o) {
				var type = o.type;
				var module = o.module;
				var name = o.name || "index";
				var data = o.data;
				var _name = o.mdName || module + "_" + name;
				if (typeof(data) != "string") data = JSON.stringify(data);
				if (type == "frame") {
					api.execScript({
						name: "sub_" + _name,
						frameName: _name,
						script: "window._exec(" + data + ");"
					});
				} else if (type == "rootFrame") {
					api.execScript({
						name: "root",
						frameName: _name,
						script: "window._exec(" + data + ");"
					});
				} else if (type == "frames") {
					var _name = o.mdName || "FG_" + module + "_" + name;
					api.execScript({
						name: o.frames,
						frameName: _name,
						script: "window._exec(" + data + ");"
					});
				} else {
					if (_name == "root_index") _name = "root";
					api.execScript({
						name: _name,
						script: "window._exec(" + data + ");"
					});
				}
				log.send.call({
					data: {
						name: _name,
						ret: data
					},
					msg: "sendData:"
				});
			},
			getData: function() {
				var arg = arguments;
				fn.subscribe("data", function(r) {
					arglast(arg)(r);
					log.send.call({
						data: r,
						msg: "getData:"
					});
				});
			}
		}
	}();

	module.exports = fn;

});