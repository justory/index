~ function() {

	var param = api.pageParam;
	var pageParam = param.pageParam;
	var rbStatus = false;
	var getLocInfoSetTime;
	param.title && $("#title").html(param.title);
	var barH = $(".actionBar").height();

	$$.configs.setStatusBarStyle({
		style: "light",
		color: "#393a3f"
	})

	~ function() {
		$$.frame.open({
			module: "browser",
			name: "menu",
			url: param.path + "menu.html",
			bounces: false,
			rect: {
				x: -200,
				y: barH - 2,
				w: 180,
				_h: 212
			}
		})
	}()

	/*$$.storage.get("userData", function(r) {
		var r = r || {};
		var argC = "?";
		if (param.url.indexOf("?") > -1) argC = "&";

		$$.frame.open({
			module: "browser",
			name: "index",
			url: param.url + argC + "access_token=" + r.access_token,
			bounces: param.bounces,
			loading: param.loading,
			pageParam: pageParam,
			rect: {
				y: barH,
				h: api.winHeight - barH
			}
		})

	})*/

	$$.frame.open({
		module: "browser",
		name: "index",
		url: param.url,
		bounces: param.bounces,
		loading: param.loading,
		pageParam: pageParam,
		rect: {
			y: barH,
			h: api.winHeight - barH
		}
	})

	var UrlRegEx = function(url) {
		if (url[url.length - 1] != "/") url += "/";
		var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
		return url.match(re)[1] + "://" + url.match(re)[2];
	}

	$("#content font").html(UrlRegEx(param.url));
	setTimeout(function() {
		$(".loading").remove();
	}, 3000);
	api.addEventListener({
		name: 'loadingRemove'
	}, function(ret, err) {
		$(".loading").remove();
	})

	var menuHidden = function() {
		clearTimeout(getLocInfoSetTime);
		api.setFrameAttr({
			name: "browser_menu",
			hidden: true
		})
		api.setFrameAttr({
			name: "browser_menu_bg",
			hidden: true
		})
		rbStatus = false;
	}
	$$.click("#rightButton", "active", function() {
		if (rbStatus) {
			menuHidden();
		} else {
			$$.frame.open({
				module: "browser",
				name: "menu_bg",
				url: param.path + "menu_bg.html",
				bounces: false,
				rect: {
					y: barH - 2,
					_h: api.winHeight - barH
				}
			})
			$$.frame.open({
				module: "browser",
				name: "menu",
				url: param.path + "menu.html",
				bounces: false,
				rect: {
					x: api.winWidth - 190,
					y: barH - 2,
					w: 180,
					_h: 212
				}
			})
			rbStatus = true;
		}
	})

	var execScript = function(script) {
		api.execScript({
			frameName: "browser_index",
			script: script
		});
	}

	var back = function() {
		execScript('api.historyBack(function(ret, err){api.execScript({name:"browser_v1_00_01",script:"_execScript("+ JSON.stringify(ret) +")"})});');
		menuHidden();
		setTimeout(function() {
			$("#close").show();
		}, 500);
	}

	$$.click("#back", "active", function() {
		back();
	})

	$$.click("#close", "active", function() {
		$$.win.close();
	})

	api.addEventListener({
		name: 'keyback'
	}, function(ret, err) {
		back();
	})

	var imgFilter = api.require("imageFilter");
	var imgCompress = function(path, cb) {
		imgFilter.getAttr({
			path: path
		}, function(r, err) {
			if (r.status) {
				var w = (r.width > 100) ? 100 : r.width;
				var h = (r.height > 100) ? 100 : r.height;
				var name = $$.UID(16);
				imgFilter.compress({
					img: path,
					size: {
						w: w,
						h: h
					},
					save: {
						imgPath: api.cacheDir + "/",
						imgName: name + '.jpg'
					}
				}, function(ret, err) {
					if (ret.status) {
						cb && cb(api.cacheDir + "/" + name + '.jpg');
					} else {
						cb && cb(path);
						$$.log("imgFilter compress error:", ret, "ERROR");
					}
				});
			} else {
				cb && cb(path);
				$$.log("imgFilter getAttr error:", r, "ERROR");
			}
		})
	}

	var wx = api.require('weiXin');
	var weixin = function(obj) {
		var appBundle = 'com.tencent.mm';
		if ($$.configs.ios) appBundle = 'wechat://';
		api.appInstalled({
			appBundle: appBundle
		}, function(ret, err) {
			if (ret.installed) {
				api.showProgress({
					title: '微信启动中!',
					text: '请稍等...',
					modal: false
				});
				setTimeout(function() {
					api.hideProgress();
				}, 3000);
				wx.registerApp(function(ret, err) {
					if (ret.status) {
						wx.sendRequest({
							scene: obj.scene,
							contentType: "web_page",
							title: $.trim(obj.title) || $.trim(obj.description),
							description: $.trim(obj.description) || $.trim(obj.title),
							thumbUrl: obj.thumbUrl,
							contentUrl: obj.contentUrl
						}, function(ret, err) {
							if (ret.status) {
								api.toast({
									msg: "操作成功!"
								})
							} else {
								if (err.msg) api.toast({
									msg: err.msg + "[" + JSON.stringify(err) + "]"
								})
							}
							api.hideProgress();
						});
						$$.log("weixin sendRequest", obj);
					} else {
						api.toast({
							msg: err.msg
						})
					}
				})
			} else {
				api.toast({
					msg: "亲,请先安装微信后再使用该功能哦!"
				})
			}
		})
	}


	var getLocInfo = function(type) {
		api.showProgress({
			title: '数据加载中!',
			text: '请稍等...',
			modal: false
		})
		var script = 'var _meta=document.getElementsByTagName("meta"),_desc="";' +
			'for(i in _meta){' +
			'if(typeof _meta[i].name!="undefined"&&_meta[i].name.toLowerCase()=="description") _desc=_meta[i].content;' +
			'}' +
			'api.execScript({' +
			'name:"browser_v1_00_01",' +
			'script:"_execScript("+ JSON.stringify({"type":"' + type + '","title":document.title,"url":location.href,"img":(document.getElementById("sharePic"))?document.getElementById("sharePic").getAttribute("d-src"):document.getElementsByTagName("img")[0].src,"desc":(_desc)?_desc:""}) +")"' +
			'});';
		execScript(script);
		getLocInfoSetTime = setTimeout(function() {
			api.toast({
				msg: "资源加载缓慢,请刷新页面或稍后操作!",
				duration: 3000
			})
			api.hideProgress();
		}, 5000)
	}

	$$.data.get(function(data) {

		var type = data.type;
		var status = data.status;
		var url = data.url;

		//url && (url.indexOf("?") > -1) ? (url.match(/\?/g).length > 1) ? url = url.split("?")[0] + "?" + url.split("?")[1] : "" : "";
		status && $("#close").show();
		if (status === false) $$.win.close();

		switch (type) {
			case "hidden":
				rbStatus = false;
				break;
			case "show":
				rbStatus = true;
				break;
			case "friend":
				getLocInfo("friendInfo");
				break;
			case "friendInfo":
				menuHidden();
				$$.download({
					url: data.img,
				}, function(name, path) {
					imgCompress(path, function(thumbUrl) {
						api.hideProgress();
						weixin({
							scene: "session",
							contentType: "web_page",
							title: data.title,
							description: data.desc,
							thumbUrl: thumbUrl,
							contentUrl: url
						})
					})
				})
				break;
			case "timeline":
				getLocInfo("timelineInfo");
				break;
			case "timelineInfo":
				menuHidden();
				$$.download({
					url: data.img,
				}, function(name, path) {
					imgCompress(path, function(thumbUrl) {
						api.hideProgress();
						weixin({
							scene: "timeline",
							contentType: "web_page",
							title: data.desc || data.title,
							description: data.desc || data.title,
							thumbUrl: thumbUrl,
							contentUrl: url
						})
					})
				})
				break;
			case "href":
				getLocInfo("hrefUrl");
				break;
			case "hrefUrl":
				menuHidden();
				if ($$.configs.ios) {
					api.openApp({
						iosUrl: url
					}, function(ret, err) {
						//
					});
				} else {
					api.openApp({
						androidPkg: 'android.intent.action.VIEW',
						mimeType: 'text/html',
						uri: url
					}, function(ret, err) {
						//
					});
				}
				api.hideProgress();
				break;
			case "share":
				getLocInfo("shareUrl");
				break;
			case "shareUrl":
				menuHidden();
				api.require("shareAction").share({
					text: url,
					type: "text"
				})
				api.hideProgress();
				break;
			case "reload":
				menuHidden();
				api.showProgress({
					title: '正在刷新中!',
					text: '请稍等...',
					modal: false
				});
				execScript('location.reload()');
				api.hideProgress();
				break;
		}

	})

}();