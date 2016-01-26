//载入各种模块
import Basics from 'Basics';
import Msgcfgs from 'Msgcfgs';
import Configs from 'Configs';
import Windows from 'Windows';
import Datacom from 'Datacom';
import Systems from 'Systems';

//基础模块添加其他模块
class _$ extends Basics {

	constructor() {
		super();
		this.configs = Configs;
		this.msgcfgs = Msgcfgs;
		this.win = Windows.win;
		this.frame = Windows.frame;
		this.frameGroup = Windows.frameGroup;
		this.get = Datacom.get;
		this.post = Datacom.post;
		this.jsonp = Datacom.jsonp;
		this.upload = Datacom.upload;
		this.storage = Datacom.storage;
		this.data = Datacom.data;
		this.click = Systems.click;
		this.log = Systems.log;
	}

}

//全局环境添加justory
window.justory = window[Configs.justory] = new _$();

//justory配置
const cfg = justory.configs;

//页面主JS文件路径
let dataMain = $("script[src='../../modules/justory/justory.js']").attr("data-main");
if (dataMain.indexOf(".js") == -1) dataMain += ".js";

//初始化当前窗口状态栏
api.setStatusBarStyle(cfg.statusBarStyle);

//设置当前窗口状态栏
cfg.setStatusBarStyle = (style) => {
	if (style) {
		api.setStatusBarStyle(style);
		cfg.statusBarStyle = style;
	}
}

//重置当前窗口状态栏
//cfg...

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
	if (cfg.angular) {
		//载入Angular
		require(["Angular"], () => {
			//载入页面主JS文件
			dataMain && require([dataMain]);
		});
	} else {
		//载入页面主JS文件
		dataMain && require([dataMain]);
	}
})