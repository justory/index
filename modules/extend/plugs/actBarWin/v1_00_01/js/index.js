~ function() {
	
	var param = api.pageParam;
	var configs = param.configs;
	var pageParam = param.pageParam || {};

	configs.title && $("#title").html(configs.title);
	(configs.button) ? $("#rightButton").html(configs.button): $("#rightButton").hide();

	var barH = $(".actionBar").height();
	
	pageParam._hidden = (param.bgColor) ? true : false;
	$$.frame.open({
		module: param.module,
		name: param.name,
		bounces: param.bounces,
		bgColor: param.bgColor,
		hidden: param.bgColor && true,
		pageParam: pageParam,
		rect: {
			y: barH,
			h: api.winHeight - barH - (param.marginBottom || 0)
		}
	});

	var dataSend = function() {
		$$.data.send({
			win: {
				module: "ABW_" + param.module,
				name: param.name
			},
			frame: {
				module: param.module,
				name: param.name
			},
			data: configs
		});
	}

	$$.click("#rightButton", "active", function() {
		dataSend();
	});

	$$.click("#back", "active", function() {
		if (configs.type == "LC") {
			dataSend();
		} else {
			$$.win.close();
		}
	});

	setTimeout(function() {
		$(".loading").remove();
	}, 5000);

	api.addEventListener({
		name: 'loadingRemove'
	}, function(ret, err) {
		$(".loading").remove();
	})

}();