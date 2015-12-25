define(function(require, exports, module) {
	/*
	 * 系统扩展模块
	 */
	var fn = function() {
		return {
			init: function() {

				//jquery
				window.$ = require('jquery');

				//justory
				window._$ = function() {};

				//删除数组指定索引元素
				Array.prototype.remove = function(index) {
					if (isNaN(index) || index > this.length) {
						return false;
					}
					for (var i = 0, n = 0; i < this.length; i++) {
						if (this[i] != this[index]) {
							this[n++] = this[i];
						}
					}
					this.length -= 1;
				};
				Array.prototype.remove.exec = function() {};

				//返回数组最后一个元素
				Array.prototype.last = function() {
					return this[this.length - 1];
				};
				Array.prototype.last.exec = function() {};

				//返回对象(长度存在)最后一个对象
				Object.prototype.last = function() {
					if (this.length) {
						return this[this.length - 1];
					} else {
						return "";
					}
				};
				Object.prototype.last.exec = function() {};

				//尝试将String转换为Object
				_$.prototype.strParse = function(arg) {
					var result = arg;
					if (typeof(arg) == "string") {
						var l = arg.length;
						if (arg.charAt(0) == "{" && arg.charAt(l - 1) == "}" && arg.indexOf(":") > -1) result = eval("(" + arg + ")");
					}
					return result;
				};

				//将html转换为实体
				_$.prototype.htmlEnCode = function(str) {
					var s = "";
					if (str) {
						s = str.replace(/&/g, "&amp;");
						s = s.replace(/</g, "&lt;");
						s = s.replace(/>/g, "&gt;");
						s = s.replace(/ /g, "&nbsp;");
						s = s.replace(/\'/g, "&apos;");
						s = s.replace(/\"/g, "&quot;");
						s = s.replace(/\n/g, "<br>");
					}
					return s;
				};

				//生成唯一id,默认32位
				_$.prototype.UID = function(end) {
					return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
						var r = Math.random() * 16 | 0,
							v = c == 'x' ? r : (r & 0x3 | 0x8);
						return v.toString(16);
					}).substr(0, end || 32);
				};

				//返回当前或指定int类型app版本号
				_$.prototype.appVersionInt = function(ver) {
					var appVer = api.appVersion.split(".");
					if (ver) appVer = ver.split(".");
					var _fn = function(num) {
						var _appVer = appVer[num];
						return (_appVer.length == 1) ? "0" + _appVer : _appVer;
					}
					return parseInt(_fn(0) + _fn(1) + _fn(2));
				};

			}
		}
	}();

	module.exports = fn;

});