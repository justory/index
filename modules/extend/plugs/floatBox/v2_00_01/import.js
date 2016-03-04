define({
	import: function(opt) {

		var height = opt.height || 300;
		var top = (opt.top || opt.top === 0) ? opt.top : parseInt((api.winHeight - height) / 2);
		var bottom = opt.bottom;
		var left = opt.left || 0;
		var right = opt.right || 0;
		var width = opt.width;
		var oc = 0.55;

		$$.configs.ios && [oc = 0.45];

		$$.frame.open({
			module: "floatBox",
			name: "background",
			url: $$.last(arguments) + "background.html",
			bgColor: "rgba(0,0,0," + oc + ")",
			bounces: false,
			reload: true,
			hidden: (opt.layerMask === false || !$$.configs.ios) ? true : false,
			pageParam: opt,
			rect: {
				_y: 0,
				_h: api.winHeight
			}
		})

		if (!$$.configs.ios || opt.layerMask !== false) {
			$$.frame.show({
				module: "floatBox",
				name: "background"
			});
		}

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
			width = api.winWidth - (left * 2);
		}

		$$.frame.open({
			module: "floatBox",
			name: "content",
			url: $$.configs.static + opt.module + '/' + opt.name + '.' + $$.configs.defaultFT,
			bgColor: "rgba(0,0,0,0)",
			bounces: false,
			reload: true,
			softInputMode: "pan",
			pageParam: opt.pageParam,
			rect: {
				x: left,
				_y: top,
				_h: height,
				w: width
			}
		})

	},
	methods: {
		floatbox: {
			scrollUp: function() {
				api.sendEvent({
					name: 'scrollUpFloatBox'
				})
			},
			scrollDown: function() {
				api.sendEvent({
					name: 'scrollDownFloatBox'
				})
			},
			close: function() {
				api.sendEvent({
					name: 'closeFloatBox'
				})
			}
		}
	}
})