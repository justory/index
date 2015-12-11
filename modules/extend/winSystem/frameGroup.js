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
				var o = arguments[0];
				var callback = arguments.last();
				var frames = [];
				var rect = o.rect || {};
				var sbHeight = cfg.statusBarHeight;
				for (var i = 0; i < o.frames.length; i++) {
					var module = o.frames[i].module;
					var name = o.frames[i].name || cfg.defaultWN;
					var bounces = (o.frames[i].bounces == "no") ? false : true;
					frames.push({
						name: cfg.prefixFG + module + "_" + name,
						url: "../" + module + "/" + name + "." + cfg.defaultWFT,
						bgColor: o.frames[i].bgColor || "rgba(255,255,255,0)",
						bounces: bounces,
						vScrollBarEnabled: false,
						hScrollBarEnabled: false,
						pageParam: o.frames[i].pageParam
					});
				}
				api.openFrameGroup({
					name: o.name,
					scrollEnabled: o.scroll || false,
					background: o.background || "rgba(255,255,255,0)",
					rect: {
						x: rect.x || 0,
						y: (rect._y) ? rect._y : ((rect.y) ? rect.y + sbHeight : sbHeight),
						w: rect.w || 'auto',
						h: rect.h || api.winHeight - sbHeight
					},
					index: o.index || 0,
					preload: o.preload || 0,
					frames: frames
				}, function(ret, err) {
					var index = parseInt(ret.index);
					callback(index);
				});
			}
		}
	}();

	module.exports = fn;

});