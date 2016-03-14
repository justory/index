~ function() {

	$$.configs.android && $("#title font").css("margin-bottom", "2px");

	var param = api.pageParam;
	var pageParam = param.pageParam;
	var rbStatus = false;
	var getLocInfoSetTime;
	param.title && $("#title p").html(param.title);
	var barH = $(".actionBar").height();

	$$.configs.setStatusBarStyle({
		style: "light",
		color: "#393a3f"
	})

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

	$$.frame.open({
		module: "browser",
		name: "index",
		url: param.url,
		bounces: param.bounces,
		progressColor: "#45C01A",
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

	var setBgUrl = function(u) {
		$("#content font").html(UrlRegEx(u));
	}
	setBgUrl(param.url);
	setTimeout(function() {
		$(".loading").remove();
	}, 8000);
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
		api.historyBack({
			frameName: "browser_index"
		}, function(ret) {
			var status = ret.status;
			status && $("#close").show();
			if (status === false) $$.win.close();
		});
		menuHidden();
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
		var script = 'var _meta=document.getElementsByTagName("meta"),_desc="";' +
			'for(i in _meta){' +
			'if(typeof _meta[i].name!="undefined"&&_meta[i].name.toLowerCase()=="description") _desc=_meta[i].content;' +
			'}' +
			'api.execScript({' +
			'name:"browser_v1_00_01",' +
			'script:"_execScript("+ JSON.stringify({"type":"' + type + '","title":document.title,"url":(document.getElementById("shareUrl"))?document.getElementById("shareUrl").getAttribute("d-url"):"","img":(document.getElementById("sharePic"))?document.getElementById("sharePic").getAttribute("d-src"):document.getElementsByTagName("img")[0].src,"desc":(_desc)?_desc:""}) +")"' +
			'});';
		execScript(script);
	}

	var url, title, img, desc, frameStatus = false;
	var wxShare = function(type) {
		if (frameStatus) {
			api.showProgress({
				title: '微信启动中!',
				modal: false
			});
			menuHidden();
			$$.download({
				url: img,
			}, function(name, path) {
				imgCompress(path, function(thumbUrl) {
					api.hideProgress();
					var wxObj = {
						scene: type,
						contentType: "web_page",
						title: title,
						description: desc,
						thumbUrl: thumbUrl,
						contentUrl: url
					}
					if (type == "timeline") {
						wxObj.title = desc || title;
						wxObj.description = desc || title;
					}
					weixin(wxObj);
				})
			})
		} else {
			api.toast({
				msg: "页面内容尚未加载完,请稍等!"
			})
		}
	}
	$$.data.get(function(r) {

		var data = r || {};
		var type = data.type;
		var _url = data.url;
		var _title = data.title;

		_url && [url = _url];
		_title && [title = _title];

		switch (type) {
			case "frameClient":
				var client = data.ret;
				var state = client.state;
				var loaded = function() {
					frameStatus = true;
					$(".loading").remove();
					getLocInfo("resetInfo");
				}
				if (state === 1 && client.progress < 100) frameStatus = false;
				if (state === 1 && client.progress === 100) {
					loaded();
				}
				if (state === 2) {
					url = client.url;
					setBgUrl(url);
					if ($$.configs.ios) {
						loaded();
					}
				}
				if (state === 3) {
					title = client.title;
					!param.title && $("#title p").html(title);
				}
				break;
			case "hidden":
				rbStatus = false;
				break;
			case "show":
				rbStatus = true;
				break;
			case "resetInfo":
				img = data.img;
				desc = data.desc;
				!param.title && $("#title p").html(title);
				break;
			case "friend":
				wxShare("session");
				break;
			case "timeline":
				wxShare("timeline");
				break;
			case "href":
				if (url) {
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
				}
				break;
			case "share":
				if (url) {
					menuHidden();
					api.require("shareAction").share({
						text: url,
						type: "text"
					})
					api.hideProgress();
				}
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