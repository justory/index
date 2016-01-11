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

	//图片缓存目录
	var imgCacheDir = "imgCache";

	//窗口系统默认读取文件名
	var defaultFN = "index";

	//窗口系统默认读取文件类型
	var defaultFT = "html";

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
	var justory = "$$";

	//状态栏样式
	var statusBarStyle = {
		style: "light",
		color: "#000"
	};

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

		//ios android配套窗口动画
		if (systemType == "ios") {
			ios = true;
			animtType = ["cube", "fade", "cube"];
		}
		if (systemType == "android") {
			android = true;
			animtType = ["movein", "fade", "reveal"];
		}

		return {
			SCENE: SCENE,
			debug: debug,
			isTest: isTest,
			justory: justory,
			ios: ios,
			android: android,
			imgCacheDir: api.cacheDir + "/" + imgCacheDir + "/",
			static: api.wgtRootDir + "/" + state + "/",
			defaultFN: defaultFN,
			defaultFT: defaultFT,
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
				var kvs = [{
					key: "token1",
					value: "11111"
				}, {
					key: "token2",
					value: "22222",
					alwaysGet: true
				}];
				cb({
					params: kvs,
					headers: kvs
				});
			},
			ajaxComAfterSend: function(body, cb) {
				if (body.error && body.error != 0) {
					api.toast({
						msg: body.msg
					});
					justory.log("ajax message", {
						msg: body.msg
					});
					if (body.error == 2001) {
						api.removePrefs({
							key: "userData"
						});
						api.removePrefs({
							key: "userInfo"
						});
						api.removePrefs({
							key: "rc_token"
						});
						MD.load({
							module: "login",
							name: "signup",
							bounces: "no"
						});
					}
				}
				cb();
			}
		}
	}

	return ret();

});