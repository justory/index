define(function(require, exports, module) {

	var cfg = require('configs');

	var fn = function() {
		return {
			open: function() {
				var _st;
				var arg = arguments;
				var ext = arg[0];
				var pageParam = cfg.pageParam;
				var bgColor = pageParam.bgColor;
				if (bgColor == "rgba(255,255,255,0)") bgColor = pageParam.refreshTopBgColor;
				var o = (typeof(ext) == "object") ? ext : "";
				var _cfg = {
					visible: true,
					loadingImg: 'widget://static/common/images/none.png',
					bgColor: bgColor || "#fff",
					textColor: "#a8a9ad",
					textDown: "↓ 下拉刷新",
					textUp: "↑ 松开刷新",
					textLoading: "loading...",
					showTime: false
				};
				if (!cfg.ios) {
					_cfg.loadingImg = "widget://static/common/images/arrow.png";
					_cfg.textDown = "下拉刷新";
					_cfg.textUp = "松开刷新";
					_cfg.textLoading = "正在刷新";
				}
				api.setRefreshHeaderInfo(_cfg, function(ret, err) {
					$(".temp_loadText").remove();
					if (_st) clearTimeout(_st);
					arglast(arg)(ret);
					_st = setTimeout(function() {
						api.refreshHeaderLoadDone();
					}, 3000);
				});
				if (o && o.refreshHeaderLoading) {
					if (o.refreshHeaderLoadingTime) {
						setTimeout(function() {
							api.refreshHeaderLoading();
						}, o.refreshHeaderLoadingTime);
					} else {
						api.refreshHeaderLoading();
					}
				}
			},
			close: function(type, time) {
				$(".temp_no_data").remove();
				api.refreshHeaderLoadDone();
			}
		}
	}();

	module.exports = fn;

});