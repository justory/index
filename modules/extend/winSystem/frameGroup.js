define(function(require, exports, module) {

	/**
	 * 窗口组模块
	 * ver 1.0.1
	 * @author {@link http://justory.cn/#frameGroup}
	 */

	var fn = function() {
		return {
			open: function() {
				var cfg = justory.configs;
				var arg = arguments[0];
				var callback = arguments.last();
				var frames = [];
				var rect = arg.rect || {};
				var sbHeight = cfg.statusBarHeight;
				for (var i = 0; i < arg.frames.length; i++) {
					var frame = arg.frames[i];
					var module = frame.module;
					var name = frame.name || cfg.defaultFN;
					var moduleName = cfg.prefixFG + module + "_" + name;
					var url = frame.url || cfg.static + module + "/" + name + "." + cfg.defaultFT;
					frames.push({
						name: moduleName,
						url: url,
						bgColor: frame.bgColor || "rgba(255,255,255,0)",
						bounces: (frame.bounces === true) ? true : false,
						vScrollBarEnabled: (frame.vScrollBar === true) ? true : false,
						hScrollBarEnabled: (frame.hScrollBar === true) ? true : false,
						scrollToTop: (frame.scrollToTop === false) ? false : true,
						scaleEnabled: (frame.scaleEnabled === true) ? true : false,
						allowEdit: (frame.allowEdit === true) ? true : false,
						softInputMode: frame.softInputMode || "auto",
						pageParam: frame.pageParam || {}
					});
				}
				api.openFrameGroup({
					name: arg.name,
					scrollEnabled: (arg.scroll === false) ? false : true,
					background: arg.background || "rgba(255,255,255,0)",
					rect: {
						x: rect.x || 0,
						y: (rect._y) ? rect._y : ((rect.y) ? rect.y + sbHeight : sbHeight),
						w: rect.w || "auto",
						h: (rect._h) ? rect._h : ((rect.h) ? rect.h - sbHeight : api.winHeight - sbHeight)
					},
					index: arg.index || 0,
					preload: arg.preload || 0,
					frames: frames
				}, function(ret, err) {
					//index 0,1,2...
					var index = parseInt(ret.index);
					callback(index);
				});
			}
		}
	}();

	module.exports = fn;

});