define({
	import: function(opt) {

		var oc = 0.55,
			loading = true;
		if ($$.configs.ios) {
			oc = 0.45;
			loading = false;
		}
		var param = {
			module: "floatBox",
			url: $$.last(arguments) + "index.html",
			bgColor: "rgba(0,0,0," + oc + ")",
			bounces: false,
			loading: loading,
			pageParam: opt,
			rect: {
				_y: 0,
				_h: api.winHeight
			}
		}
		var layerMask = (opt.layerMask === false) ? false : true;
		if (!layerMask) param.hidden = true;

		$$.frame.open(param);

	}
})