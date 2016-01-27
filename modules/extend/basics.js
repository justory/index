/*
 * 系统扩展模块
 */

import Jquery from 'Jquery';

//Jquery
window.$ = Jquery;

//删除数组指定索引元素
Array.prototype.remove = function(index) {
	if (isNaN(index) || index > this.length) {
		return false;
	}
	for (let i = 0, n = 0; i < this.length; i++) {
		if (this[i] != this[index]) {
			this[n++] = this[i];
		}
	}
	this.length -= 1;
};
Array.prototype.remove.exec = () => {};

//返回数组最后一个元素
Array.prototype.last = function() {
	return this[this.length - 1];
};
Array.prototype.last.exec = () => {};

//对象合并
$.extend({
	assign(...arg) {
		for (let i = 1; i < arg.length; i++) {
			for (let n in arg[i]) {
				arg[0][n] = arg[i][n];
			}
		}
	}
})

//justory
class _$ {

	constructor() {
		this.version = '1.00.01';
	}

	//启动angular
	ngBootstrap(...arg) {
		let [module, bootstrapDOM, callback] = [arg[0], document, arg.last()];
		(arg.length == 1 || !module) ? module = "autoModule": "";
		(arg.length == 3 && module && arg[1]) ? bootstrapDOM = $(`*[ng-controller="${arg[1]}"]`): "";
		callback && callback(angular.module(module, []));
		angular.bootstrap(bootstrapDOM, [module]);
	}

	//返回最后一个元素
	last(arg) {
		return arg[arg.length - 1];
	}

	//尝试将String转换为Object
	strParse(arg) {
		let result = arg;
		if (typeof(arg) == "string") {
			let l = arg.length;
			if (arg.charAt(0) == "{" && arg.charAt(l - 1) == "}" && arg.indexOf(":") > -1) result = eval("(" + arg + ")");
		}
		return result;
	}

	//将html转换为实体
	htmlEnCode(str) {
		let s = "";
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
	}

	//生成唯一id,默认32位
	UID(end) {
		return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).substr(0, end || 32);
	}

	//返回当前或指定int类型app版本号
	appVersionInt(ver) {
		let appVer = api.appVersion.split(".");
		if (ver) appVer = ver.split(".");
		const _fn = (num) => {
			let _appVer = appVer[num];
			return (_appVer.length == 1) ? "0" + _appVer : _appVer;
		}
		return parseInt(_fn(0) + _fn(1) + _fn(2));
	}

}

export default _$