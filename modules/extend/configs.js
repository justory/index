define(function() {
	/**
	 * 默认配置
	 * @author {@link http://justory.cn/#configs}
	 */
	var loc = localStorage;

	//开发环境 [produce,test]
	var SCENE = loc["SCENE"] || "test";

	//是否开启调试模式 [yes,no]
	var isDebug = loc["debug"] || "yes";

	//传输协议 [http,https]
	var protocol = "http";

	//静态资源目录
	var state = "static";

	//第三方插件目录
	var plugs = "modules/extend/plugs";

	//图片缓存目录
	var imgCacheDir = "imgCache";

	//窗口系统默认读取文件名
	var defaultFN = "index";

	//窗口系统默认读取文件类型
	var defaultFT = "html";

	//公共窗口默认前缀
	var prefixCOM = "COM_";

	//窗口组默认前缀
	var prefixFG = "FG_";

	//启动画面超时时间 (s)
	var launchTimeout = 5000;

	//重复click阻塞时间间隔 (ms)
	var blockClickTime = 330;

	//是否开启talkingData click事件统计
	var talkingDataClick = false;

	//ajax请求超时时间 (s)
	var ajaxTimeout = 30;

	//线上环境域名
	var interfaceProduce = "mapi.hilava.com";

	//测试环境域名
	var interfaceTest = "mapi.hilava.net";

	//justory别名设置
	var justoryAlias = "$$";

	//状态栏样式
	var statusBarStyle = {
		style: "dark",
		color: "#000"
	};

	//是否启用angular
	var angular = true;

	//渠道配置
	var channel = "apiCloud";

	//configs接口返回
	var ret = function() {

		var _interface;
		var isTest = false;
		var debug = false;
		var root = api.wgtRootDir;
		var systemType = api.systemType;
		var ios = false;
		var android = false;
		var animtType = [];

		if (SCENE == "produce") {
			_interface = interfaceProduce;
			if (isDebug == "no" || !isDebug) {
				loc["debug"] = "no";
			} else {
				loc["debug"] = "yes";
				debug = true;
				if (protocol == "https") protocol = "http";
			}
		} else {
			_interface = interfaceTest;
			isTest = true;
			loc["debug"] = "yes";
			debug = true;
			if (protocol == "https") protocol = "http";
		}

		/* ios android配套窗口动画配置 
		 ** win:winAnt(0) frame(ios):winAnt(1)
		 ** animtType[2,3,4,...] 可扩展使用
		 */
		if (systemType == "ios") {
			ios = true;
			animtType = ["movein", "fade", "cube"];
		}
		if (systemType == "android") {
			android = true;
			animtType = ["movein", "fade", "reveal"];
		}

		return {
			SCENE: SCENE,
			debug: debug,
			isTest: isTest,
			justory: justoryAlias,
			angular: angular,
			ios: ios,
			android: android,
			imgCacheDir: api.cacheDir + "/" + imgCacheDir + "/",
			static: root + "/" + state + "/",
			plugs: root + "/" + plugs + "/",
			defaultFN: defaultFN,
			defaultFT: defaultFT,
			prefixCOM: prefixCOM,
			prefixFG: prefixFG,
			baseUrl: protocol + "://" + _interface,
			winAnt: function(i) {
				return animtType[i];
			},
			blockClickTime: blockClickTime,
			talkingDataClick: talkingDataClick,
			launchTimeout: launchTimeout,
			channel: channel,
			statusBar: statusBar,
			statusBarHeight: statusBarHeight,
			statusBarStyle: statusBarStyle,
			ajaxTimeout: ajaxTimeout,
			ajaxComBeforeSend: function(param, cb) {
				$$.storage.get("userData", function(r) {
					var r = r || {};
					cb({
						params: [{
							key: "access_token",
							value: r.access_token
						}, {
							key: "log_id",
							value: r.user_id
						}],
						headers: []
					})
				})
			},
			ajaxComAfterSend: function(body, cb) {
				if (body.error && body.error != 0) {
					api.hideProgress();
					api.toast({
						msg: body.msg
					});
					$$.log("ajax message", {
						msg: body.msg
					});
					if (body.error == 2001) {

						api.removePrefs({
							key: "userData"
						});
						/*
						api.removePrefs({
							key: "rc_token"
						});*/
						$$.win.open({
							module: "login",
							name: "signup",
							bounces: false,
							slidBackEnabled: false,
							animation: {
								type: $$.configs.winAnt(1)
							}
						});
					}
				}
				cb();
			}
		}
	}

	return ret();

});