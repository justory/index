define(function(require, exports, module) {

	/**
	 * 子窗口模块
	 * ver 1.0.1
	 * @author {@link http://justory.cn/#frame}
	 */

	var fn = function() {
		return {
			open: function() {
				var cfg = justory.configs;
				var arg = arguments[0];
				var module = arg.module;
				var name = arg.name || cfg.defaultFN;
				var moduleName = module + "_" + name;
				var url = arg.url || cfg.static + module + "/" + name + "." + cfg.defaultFT;
				var bgColor = arg.bgColor || "#fff";
				var sbHeight = cfg.statusBarHeight;
				var rect = arg.rect || {};
				var x = rect.x || 0;
				var animation = arg.animation || {
					type: cfg.winAnt(1)
				};
				(arg.pageParam && arg.pageParam.pageParam) ? [$.extend(arg.pageParam, arg.pageParam.pageParam), delete arg.pageParam.pageParam] : "";
				var pageParam = arg.pageParam || {};
				if (pageParam.loading === true || arg.loading === true) x = -api.winWidth;
				api.openFrame({
					name: moduleName,
					url: url,
					bgColor: arg.bgColor || "rgba(255,255,255,0)",
					bounces: (arg.bounces === true) ? true : false,
					vScrollBarEnabled: (arg.vScrollBar === true) ? true : false,
					hScrollBarEnabled: (arg.hScrollBar === true) ? true : false,
					scrollToTop: (arg.scrollToTop === false) ? false : true,
					scaleEnabled: (arg.scaleEnabled === true) ? true : false,
					allowEdit: (arg.allowEdit === true) ? true : false,
					softInputMode: arg.softInputMode || "auto",
					reload: (arg.reload === true) ? true : false,
					showProgress: (arg.showProgress === true) ? true : false,
					animation: animation,
					pageParam: pageParam,
					rect: {
						x: x,
						y: (rect._y) ? rect._y : ((rect.y) ? rect.y + sbHeight : sbHeight),
						w: rect.w || "auto",
						h: (rect._h) ? rect._h : ((rect.h) ? rect.h - sbHeight : api.winHeight - sbHeight),
						marginLeft: rect.mL || 0,
						marginTop: rect.mt || 0,
						marginBottom: rect.mb || 0,
						marginRight: rect.mr || 0
					}
				});
			}
		}
	}();

	module.exports = fn;

});