~ function() {

	var param = api.pageParam;
	var configs = param.configs;
	var pageParam = param.pageParam;

	configs.title && $("#title").html(configs.title);
	(configs.button) ? $("#rightButton").html(configs.button): $("#rightButton").hide();

	var barH = $(".actionBar").height();

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

	$$.click("#rightButton", "active", function() {
		/*$$.data.send({
			win: {
				module: "root",
				name: "index"
			}
		},function(){
			$$.win.close();
		});*/
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
	});

	$$.click("#back", "active", function() {
		$$.win.close();
	});

}();