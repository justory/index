define(function(require, exports, module) {

	var md5 = require('md5');
	var log = require('extend/logRecord/console');

	var prefs = function() {
		return {
			set: function() {
				var arg = arguments;
				var key = arg[0];
				var val = arg[1];
				if(typeof(val) != "string") val = JSON.stringify(val);
				api.setPrefs({
					key: key,
					value: val
				});
				log.send.call({
					data: {
						key: key,
						value: arg[1]
					},
					msg: "prefs set:"
				});
			},
			get: function() {
				var t = this;
				var arg = arguments;
				var ary = arg[0];
				var hasMd5 = (typeof(arg[1]) == "function") ? false : arg[1];
				if ($.isArray(ary)) {
					var length = ary.length;
					var val = {};
					var i = 0;
					~ function(n) {
						var _fn = arguments.callee;
						if (n < length) {
							api.getPrefs({
								key: ary[n]
							}, function(ret, err) {
								val[ary[n]] = excJson(ret.value);
								i++;
								_fn(i);
								if (n + 1 == length) {
									arglast(arg)(val);
									log.send.call({
										data: val,
										msg: "prefs get:"
									});
								}
							});
						}
					}(i);
				} else {
					api.getPrefs({
						key: ary
					}, function(ret, err) {
						var _v = v = ret.value;
						var _m = "";
						if (hasMd5 === true) {
							if (typeof(_v) != "string") _v = JSON.stringify(_v);
							_m = md5(_v);
						}
						arglast(arg)(excJson(v), _m);
						log.send.call({
							data: {
								key: ary,
								value: ret.value
							},
							msg: "prefs get:"
						});
					});
				}
			}
		}
	}();

	module.exports = prefs;

});