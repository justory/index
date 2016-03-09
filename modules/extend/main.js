//载入各种模块
import Fastclick from 'Fastclick';
import Basics from 'Basics';
import Msgcfgs from 'Msgcfgs';
import Configs from 'Configs';
import Windows from 'Windows';
import Datacom from 'Datacom';
import Systems from 'Systems';
import Plugs from 'Plugs';

//基础模块添加其他模块
class _$ extends Basics {

	constructor() {
		super();
		this.configs = Configs;
		this.msgcfgs = Msgcfgs;
		$.assign(this, Windows, Datacom, Systems);
	}

}

//全局环境添加justory
if (typeof window.justory != 'undefined') alert('ERROR:window already exists method [justory]!');
if (typeof window[Configs.justory] != 'undefined') alert(`ERROR:window already exists method [${Configs.justory}]!`);
window.justory = window[Configs.justory] = new _$();

//justory配置
const cfg = justory.configs;

//载入第三方插件
for (let i in Plugs) {
	if (justory[i]) {
		justory.log(`ERROR:justory already exists method [${i}]`, {}, "ERROR");
	} else {
		const {
			version, async = true, enable = true
		} = Plugs[i];
		const path = `${cfg.plugs}${i}/${version}/`;
		if (enable) {
			if (async) {
				$.assign(justory, {
					[i](...arg) {
						require([path + "import.js"], (fn) => {
							arg.push(path);
							fn.import && fn.import.apply("", arg);
						})
					}
				})
			} else {
				((i, path) => {
					require([path + "import.js"], (fn) => {
						$.assign(justory, {
							[i](...arg) {
								arg.push(path);
								return fn.import && fn.import.apply("", arg);
							}
						})
						if (fn.methods) {
							for (let m in fn.methods) {
								if (justory[m]) {
									justory.log(`ERROR:justory already exists method [${m}]`, {}, "ERROR");
								} else {
									m && $.assign(justory, {
										[m]: fn.methods[m]
									})
								}
							}
						}
					})
				})(i, path)
			}
		}
	}
}

//页面主JS文件路径
let dataMain = $("script[src$='justory.js']").attr("data-main");
if (dataMain && dataMain.indexOf(".js") == -1) dataMain += ".js";

//初始化状态栏样式
!api.frameName && api.setStatusBarStyle(cfg.statusBarStyle);

//设置状态栏样式
cfg.setStatusBarStyle = (style) => {
	style && !api.frameName && [api.setStatusBarStyle(style), cfg.statusBarStyle = style];
}

//重置状态栏样式
if (api.winName == "root" && !api.frameName) {
	api.addEventListener({
		name: 'resetStatusBarStyle'
	}, (ret, err) => {
		api.setStatusBarStyle(cfg.statusBarStyle);
		justory.log("resetStatusBarStyle");
	})
}

//启动超时强制移除启动画面
setTimeout(() => {
	api.removeLaunchView();
}, cfg.launchTimeout)

//窗口通信公共订阅
window._execScript = (data) => {
	justory.data.publish("_execScriptData", justory.strParse(data));
}

//DOM结构绘制完毕
$(() => {

	//通知actBarWin移除loading
	if (api.winName && api.frameName && api.pageParam._hidden === false && api.winName.indexOf('ABW_') > -1) {
		api.sendEvent({
			name: 'loadingRemove'
		})
	}

	//处理document点击延迟
	Fastclick.attach(document.body);

	if (cfg.angular) {
		//载入Angular
		require(["Angular"], () => {
			//载入页面主JS文件
			dataMain && require([dataMain]);
		})
	} else {
		//载入页面主JS文件
		dataMain && require([dataMain]);
	}

})