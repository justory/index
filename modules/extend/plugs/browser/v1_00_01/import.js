define({
	import: function(opt) {

		var path = $$.last(arguments);
		opt.path = path;
		$$.win.open({
			module: "browser",
			name: "v1_00_01",
			url: path + "index.html",
			bounces: false,
			slidBackEnabled: false,
			pageParam: opt
		});

	}
})