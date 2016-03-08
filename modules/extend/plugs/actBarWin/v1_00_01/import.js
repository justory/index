define({
	import: function(opt) {

		var type = opt.configs.type,
			page;

		if (type == "RB") page = "rightButton.html";
		if (type == "LC") page = "rightButton.html";

		$$.win.open({
			module: "ABW_" + opt.module,
			name: opt.name,
			url: $$.last(arguments) + page,
			slidBackEnabled: opt.slidBackEnabled,
			bounces: false,
			pageParam: opt
		});

	}
})