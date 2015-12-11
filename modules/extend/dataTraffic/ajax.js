define(function(require, exports, module) {

	var cfg = require('configs');
	var $ = require("jquery");
	var MD = require("extend/module");
	var mi = require('extend/msgIni');

	var prefs = require('extend/dataStore/prefs');
	var log = require('extend/logRecord/console');
	var toast = require('extend/systemAtic/toast');
	var loading = require('extend/systemAtic/loading');
	var refreshTop = require('extend/systemAtic/refreshTop');

	var fn = function() {
		return {
			get: function() {
				fn.main.apply({
					callback: this.callback
				}, arguments);
			},
			post: function(url, data, cb) {
				fn.main.apply({
					type: "post",
					callback: this.callback
				}, arguments);
			},
			upload: function(url, data, cb) {
				loading.open("正在上传中!", "请稍等...");
				fn.main.apply({
					type: "post",
					upload: true,
					callback: this.callback
				}, arguments);
			},
			main: function() {
				var arg = arguments;
				var cb = (typeof(arglast(arg)) == "function") ? arglast(arg) : this.callback;
				var type = this.type || "get";
				var upload = this.upload || false;
				var url = arg[0];
				var data = arg[1] || {};
				var json = data || {};
				var cache = false;
				var baseUrl = cfg.baseUrl;
				var _data = {};
				prefs.get.apply("", [
					["userData", "citycode"],
					function(r) {
						var uCode = r.citycode;
						var uData = r.userData;
						var token = uData.access_token;
						var uid = uData.user_id;
						var adcode = uCode.adcode;
						var header = cfg.ajaxHeader();
						header.xbAdcode = adcode;
						if (token) {
							json.access_token = token;
							json.log_id = uid;
						}
						var _ver = "version=" + api.appVersion;
						if (type == "get") {
							_data = {};
							if (url.indexOf("?") > -1) {
								url = url + "&" + _ver + "&" + $.param(json);
							} else {
								url = url + "?" + _ver + "&" + $.param(json);
							}
						} else {
							if (url.indexOf("?") > -1) {
								url = url + "&" + _ver;
							} else {
								url = url + "?" + _ver;
							}
						} if (upload) {
							_data = {
								values: {
									access_token: token
								},
								files: {
									image: data
								}
							}
						} else {
							if (type != "get") {
								_data = {
									values: json
								}
							}
						} if (url.indexOf("http") > -1) baseUrl = "";
						log.send.call({
							data: {
								method: type,
								data: _data,
								url: baseUrl + url
							},
							msg: "ajax send"
						});

						var _callback = function(ret, err) {
							log.send.call({
								data: ret,
								msg: "ajax result"
							});
							var headers = ret.headers;
							var body = ret.body;
							if (body) {
								if (body.error && body.error != 0) {
									loading.close();
									refreshTop.close();
									toast.open(body.msg);
									log.send.call({
										data: "ajax message",
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
								cb(body, headers);
							} else {
								loading.close();
								refreshTop.close();
								var msg = '错误码：' + err.code + '；错误信息：' + err.msg + '；网络状态码：' + err.statusCode;
								var code = err.code;
								if (code === "" || code == undefined) code = "unknown";
								log.send.call({
									data: "ajax message",
									msg: msg
								});
								toast.open(mi.ajax[code]);
								if (cfg.winName != "root" && cfg.winName != "root_update") {
									setTimeout(function() {
										MD.close({
											name: cfg.winName
										});
									}, 3000);
								}
								if ((cfg.winName == "root" || cfg.winName == "root_update") && !cfg.frameName) {
									cb({
										error: -1
									});
								}
							}
						};
						if (type == "get" && data._EngineCore == "jquery") {
							$.ajax({
								type: "GET",
								data: _data,
								url: baseUrl + url,
								dataType: 'jsonp',
								headers: header || {},
								success: function(data) {
									_callback({
										headers: {},
										body: data
									}, {
										code: 1
									});
								}
							});
						} else {
							api.ajax({
								method: type,
								cache: cache,
								data: _data,
								url: baseUrl + url,
								timeout: cfg.ajaxTimeout,
								dataType: 'json',
								charset: 'utf-8',
								headers: header || {},
								returnAll: true
							}, function(ret, err) {
								_callback(ret, err);
							});
						}
					}
				]);
			}
		}
	}();

	module.exports = fn;

});