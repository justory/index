console.log(123);
window.apiready = () => {

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
		baseUrl: "../../modules",
		paths: {
			Main: "extend/main",
			Jquery: "jquery/jquery",
			Basics: "extend/basics",
			Configs: "extend/configs",
			Windows: "extend/windows/index",
			Systems: "extend/systems/index",
		}
	})
	
	//require Main
	require(['Main']);
	
	console.log('apiready ok');
}