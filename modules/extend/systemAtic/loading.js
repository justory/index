define(function(require, exports, module) {

	var cfg = require('configs');
	var log = require('extend/logRecord/console');

	var fn = function() {
		var _st;
		return {
			open: function() {
				var arg = arguments;
				var title = arg[0] || "加载中!";
				var text = arg[1] || "请稍等...";
				//fn.close();
				if(_st) clearTimeout(_st);
				api.showProgress({
					style: 'default',
					animationType: 'fade',
					title: title,
					text: text,
					modal: true
				});
				_st = setTimeout(function(){
					api.hideProgress();
				},5000);
				log.send.call({
					data: {
						title: title,
						text: text
					},
					msg: "loading open:"
				});
			},
			close: function(type, time) {
				if (typeof(type) == "object") {
					api.hideProgress();
					var _name = type.module + "_" + type.name + "_subLC";
					/*api.sendEvent({
						name: _name,
						extra: {}
					});*/
					var _fn = type.module + "_" + type.name;
					api.execScript({
						name: type.winName || cfg.winName,
						script: "(window._subLoaded)?window._subLoaded('" + _fn + "'):'';"
					});
					console.log("【setMsg name:" + _name + "】=====>{}");
				} else {
					var _close = function() {
						api.hideProgress();
						if (type != "sub") {
							//XB.setMsg("subLoadingClose", {}, 1);
							api.execScript({
								name: cfg.winName,
								script: "(window._subLoaded)?window._subLoaded():'';"
							});
						}
					};
					if (type != "no") $("body").removeClass("cload");
					if (time) {
						setTimeout(function() {
							_close();
						}, time);
					} else {
						_close();
					}
				}
				log.send.call({
					data: "loading success!",
					msg: "加载关闭:"
				});
			}
		}
	}();

	module.exports = fn;

});