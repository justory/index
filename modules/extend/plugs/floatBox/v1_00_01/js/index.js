~ function() {

	if (!$$.configs.ios) {
		$$.frame.show({
			module: "floatBox",
			name: "index"
		});
	}

	var pageParam = api.pageParam;
	var bgcolor = pageParam.bgcolor || "#fff";
	var height = pageParam.height || 300;
	var top = (pageParam.top || pageParam.top === 0) ? pageParam.top : parseInt((api.winHeight - height) / 2);
	var bottom = pageParam.bottom;
	var left = pageParam.left || 0;
	var right = pageParam.right || 0;
	var width = pageParam.width;
	var hideClose = (pageParam.hideClose === true) ? true : false;
	var layerMask = (pageParam.layerMask === false) ? false : true;
	var closeHeight = 0;
	if (!hideClose && layerMask) {
		$(".close").removeClass("hide");
		closeHeight = parseInt($(".close").height());
	}
	var contentHeight = height - closeHeight;
	var contentWidth = width;

	if (bottom || bottom === 0) top = api.winHeight - height - bottom;

	if (width) {
		if (width > 300) {
			api.toast({
				msg: "width最大不能超过300px!"
			})
		}
		if (right) {
			left = api.winWidth - right - width;
		} else {
			left = parseInt((api.winWidth - width) / 2);
		}
	} else {
		contentWidth = api.winWidth - (left * 2);
	}

	$("#content").css({
		"height": height + "px",
		"width": contentWidth + "px",
		"top": top + "px",
		"left": left + "px",
		"background": bgcolor
	})

	$$.frame.open({
		module: pageParam.module,
		name: pageParam.name,
		url: pageParam.url,
		loading: pageParam.loading,
		bgColor: "rgba(0,0,0,0)",
		bounces: false,
		rect: {
			x: left,
			_y: top + closeHeight,
			_h: contentHeight,
			w: contentWidth
		},
		pageParam: pageParam.pageParam
	})

	var close = function() {
		$$.frame.close({
			module: pageParam.module,
			name: pageParam.name
		})
		setTimeout(function() {
			api.closeFrame();
		}, 100);
	}

	$$.click(".close", function() {
		close();
	})

	api.addEventListener({
		name: 'tap'
	}, function() {
		close();
	})

	api.addEventListener({
		name: "closeFloatBox"
	}, function() {
		close();
	})

}();