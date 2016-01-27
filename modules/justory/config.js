//ios statusBar
window.statusBar = false;
window.statusBarHeight = 0;
if (api.systemType == "ios") {
	const numSV = parseInt(api.systemVersion, 10);
	if (numSV >= 7 && !api.fullScreen && api.iOS7StatusBarAppearance) {
		statusBar = true;
		statusBarHeight = 20;
		const style  =  document.createElement("style");
		style.innerHTML  =  "._StatusBar{padding-top:20px;}";
		document.head.appendChild(style);
	}
}

//require config
require.config({
	baseUrl: api.wgtRootDir + "/modules",
	paths: {
		Main: "extend/main",
		Jquery: "jquery/jquery",
		Angular: "angular/angular",
		Basics: "extend/basics",
		Configs: "extend/configs",
		Msgcfgs: "extend/msgcfgs",
		Windows: "extend/windows/index",
		Systems: "extend/systems/index",
		Datacom: "extend/datacom/index",
		Plugs: "extend/plugs/version",
	}
})

//require Main
require(['Main']);