~ function() {

	var close = function() {
		api.closeFrame({
			name: 'floatBox_content'
		});
		api.closeFrame({
			name: 'floatBox_background'
		});
	}

	var animationStatus = true;
	var animation = function(y, s) {
		api.animation({
			name: "floatBox_content",
			duration: ($$.configs.ios) ? s : 0,
			translation: {
				y: y,
			}
		}, function(ret, err) {
			//
		});
	}

	api.addEventListener({
		name: 'scrollUpFloatBox'
	}, function() {
		animation(-100, 200);
	})

	api.addEventListener({
		name: 'scrollDownFloatBox'
	}, function() {
		animationStatus && $$.configs.ios && animation(100, 0);
	})

	api.addEventListener({
		name: 'tap'
	}, function() {
		animationStatus = false;
		close();
	})

	api.addEventListener({
		name: 'closeFloatBox'
	}, function() {
		animationStatus = false;
		close();
	})

	/*
	$$.data.get(function(type) {
		if (type == "closeFloatBox") close();
	})
	*/

}();