define({
	import: function(cb) {

		var loader = new function() {}();

		var refreshHeaderLoadDone;
		loader.refresh = function(cb) {
			api.setRefreshHeaderInfo({
				visible: true,
				bgColor: "rgba(0, 0, 0, 0)"
			}, function(ret, err) {
				cb();
				clearTimeout(refreshHeaderLoadDone);
				refreshHeaderLoadDone = setTimeout(function() {
					api.refreshHeaderLoadDone();
				}, 6000);
			});
		}
		loader.refreshClose = function() {
			api.refreshHeaderLoadDone();
			clearTimeout(refreshHeaderLoadDone);
		}

		var pullBox = $("[id-plugs='loaderPull']"),
			hasPullBox;
		loader.pullStatus = true;
		loader.pullBox = false;
		loader.pullIndex = 1;
		loader.pullText = "加载中...";
		if (pullBox.length > 0) hasPullBox = true;
		loader.pull = function(cb) {
			api.addEventListener({
				name: 'scrolltobottom',
				extra: {
					threshold: 250
				}
			}, function(ret, err) {
				if (loader.pullStatus) {
					hasPullBox && pullBox.html(loader.pullText);
					loader.pullStatus = false;
					cb(loader.pullIndex++);
				}
			});
		}
		loader.pullEnd = function() {
			hasPullBox && pullBox.html("");
			loader.pullStatus = true;
		}
		loader.pullReset = function() {
			loader.pullIndex = 1;
			loader.pullEnd();
		}
		loader.pullClose = function(text) {
			hasPullBox && pullBox.html(text || "没有更多数据了!");
			loader.pullStatus = false;
		}

		if (typeof cb == "function") cb(loader);

		return loader;

	},
	methods: {

	}
})