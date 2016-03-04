define({
	import: function() {

		var btn = api.require('UIButton');
		var button = new function() {}();

		button.id = "";
		button.click = "";
		button.open = function(opt) {

			var sbHeight = $$.configs.statusBarHeight;
			var height = opt.height || 100;
			var top = opt.top + sbHeight || sbHeight;
			var bottom = opt.bottom;
			var left = opt.left || 0;
			var right = opt.right || 0;
			var width = opt.width || api.winWidth;

			if (bottom || bottom === 0) top = api.winHeight - height - bottom;

			if (width) {
				if (width > api.winWidth) {
					api.toast({
						msg: "width最大不能超过winWidth!"
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

			var title = opt.title || {};
			var bg = opt.bg || {};
			var param = {
				rect: {
					x: left,
					y: top,
					w: width,
					h: height
				},
				corner: opt.corner || 0,
				title: {
					size: title.size || 16,
					normal: title.normalTitle || "submit",
					highlight: title.highlight || title.normalTitle,
					active: title.active || title.normalTitle,
					normalColor: title.normalColor || "#000",
					highlightColor: title.highlightColor || title.normalColor,
					activeColor: title.activeColor || title.normalColor,
					alignment: title.alignment || "center"
				},
				bg: {
					normal: bg.normal || "#eee",
					highlight: bg.highlight || bg.normal,
					active: bg.active || bg.normal
				},
				fixed: false,
				move: false,
				//fixedOn: api.frameName
			}

			btn.open(param, function(ret, err) {
				if (ret) {
					var type = ret.eventType;
					if (type == "show") {
						button.id = ret.id;
						$$.log("button show", {
							param: param,
							id: ret.id
						});
					}
					if (type == "click") {
						button.click && button.click(button.id);
						$$.log("button click", {
							id: ret.id
						});
					}
				} else {
					$$.log("button error", {
						ret: ret,
						err: err
					}, "ERROR");
				}
			})
		}

		button.setTitle = function(title) {
			btn.setTitle({
				id: button.id,
				title: {
					size: title.size,
					normalTitle: title.normalTitle,
					highlightTitle: title.highlightTitle,
					normalColor: title.normalColor,
					highlightColor: title.highlightColor,
					alignment: title.alignment
				}
			}, function(ret, err) {
				if (ret) {
					$$.log("button setTitle", title);
				} else {
					$$.log("button setTitle error", {
						ret: ret,
						err: err
					}, "ERROR");
				}
			})
		}

		button.close = function() {
			btn.close({
				id: button.id
			})
		}

		button.hide = function() {
			btn.hide({
				id: button.id
			})
		}

		button.show = function() {
			btn.show({
				id: button.id
			})
		}

		return button;

	}
})