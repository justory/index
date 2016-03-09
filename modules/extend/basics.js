/*
 * 系统扩展模块
 */

import Jquery from 'Jquery';

//Jquery
window.$ = window.jQuery = Jquery;

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
		this.version = '1.00.00';
	}

	//启动angular
	ngBootstrap(...arg) {
		let [ng, callback, ngArray] = [(typeof arg[0] != 'function') ? arg[0] : [], arg.last(), []];
		for (let n = 0; n < ng.length; n++) {
			ngArray.push('angular/' + ng[n]);
		}
		const bootstrap = () => {
			callback && callback(angular.module('autoModule', ng));
			angular.bootstrap(document, ['autoModule']);
		}
		if (ngArray.length > 0) {
			require(ngArray, () => {
				bootstrap();
			})
		} else {
			bootstrap();
		}
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
		return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			let r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).substr(0, end || 32)
	}

	//返回当前或指定int类型app版本号
	appVersionInt(v) {
		let appVer = api.appVersion.split(".");
		if (v) appVer = v.split(".");
		const fn = (num) => {
			let ver = appVer[num];
			return (ver.length == 1) ? "0" + ver : ver;
		}
		return parseInt(fn(0) + fn(1) + fn(2));
	}

	//获取设备当前经纬度
	location(o) {
		let loc = api;
		!justory.configs.ios && [loc = api.require('baiduLocation')];
		loc.startLocation({
			accuracy: '100m',
			filter: 1,
			autoStop: true
		}, (ret, err) => {
			let {
				latitude, longitude
			} = ret;
			const baidu2gcj = ($lat, $lng) => {
				const M_PI = 3.1415926535898;
				let $v = M_PI * 3000.0 / 180.0;
				let $x = $lng - 0.0065;
				let $y = $lat - 0.006;
				let $z = Math.sqrt($x * $x + $y * $y) - 0.00002 * Math.sin($y * $v);
				let $t = Math.atan2($y, $x) - 0.000003 * Math.cos($x * $v);
				return {
					'latitude': $z * Math.sin($t),
					'longitude': $z * Math.cos($t)
				}
			}
			if (ret.status) {
				!justory.configs.ios && [ret = baidu2gcj(latitude, longitude)];
				o.success && o.success(ret);
				justory.storage.set("location", {
					latitude: ret.latitude,
					longitude: ret.longitude
				})
				justory.log("get location", {
					ret
				})
			} else {
				if (api.winName == "root" && !api.frameName) {
					const locationMsg = justory.msgcfgs.location;
					let msg = locationMsg.android;
					justory.configs.ios && [msg = locationMsg.ios];
					api.alert({
						title: locationMsg.title,
						buttons: [locationMsg.buttons],
						msg,
					}, (ret, err) => {
						//
					})
				}
				o.error && o.error(err);
				justory.log("get location", {
					ret, err
				}, "ERROR")
			}
		})
	}

	//图片缓存
	imgCache(ary) {
		justory.log("imgCache start!", {
			data: ary
		})
		const fn = (url, name) => {
			!url && justory.log("Download address missing!", {
				img_dl: url
			}, "WARN")
			url && api.imageCache({
				policy: "cache_only",
				thumbnail: false,
				url
			}, (ret, err) => {
				if (ret) {
					const img = $(`[img-md5=${name}]`);
					for (let i = 0; i < img.length; i++) {
						($(img[i]).attr("src") != ret.url) ? $(img[i]).attr("src", ret.url): "";
					}
				} else {
					justory.log("Download picture failed!", {
						ret, err
					}, "ERROR")
				}
			})
		}
		if (ary.length > 0) {
			for (let i = 0; i < ary.length; i++) {
				let [img_dl, img_md5] = [ary[i].img_dl, ary[i].img_md5];
				fn(img_dl, img_md5);
			}
		} else {
			fn(ary.img_dl, ary.img_md5);
		}
	}

	//文件下载
	download(obj, cb) {
		justory.log("Start downloading files!", obj)
		let {
			url, name, stype
		} = obj;
		!name && [name = justory.UID(16)];
		!stype && [stype = "." + url.replace(/.+\./, "")];
		api.download({
			savePath: api.cacheDir + "/" + name + stype,
			report: false,
			cache: false,
			allowResume: false,
			url
		}, (ret, err) => {
			if (ret && ret.state != 2) {
				if (ret.state == 1) {
					cb && cb(ret.savePath.split(api.cacheDir + "/")[1].split(".")[0], ret.savePath);
					justory.log("Download File success!", {
						ret
					})
				}
			} else {
				justory.log("Download file failed!", {
					ret, err
				}, "ERROR")
			}
		})
	}

}

export default _$