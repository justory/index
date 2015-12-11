define(function(require, exports, module) {

	/*
	 * 基础模块加载完成及DOM结构绘制完毕后公共处理模块
	 */

	var fn = function() {
		return {
			init: function($$) {

				var cfg = $$.configs;

				//初始化当前窗口状态栏
				api.setStatusBarStyle(cfg.statusBarStyle);

				//设置当前窗口状态栏
				cfg.setStatusBarStyle = function(style) {
					if (style) {
						api.setStatusBarStyle(style);
						cfg.statusBarStyle = style;
					}
				};

				//重置当前窗口状态栏
				//cfg...

				//启动超时强制移除启动画面
				setTimeout(function() {
					api.removeLaunchView();
				}, cfg.launchTimeout);

				//DOM结构绘制完毕
				$(function() {
					//do something
				});

			}
		}
	}();

	module.exports = fn;

});