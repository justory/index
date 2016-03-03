~ function() {

	var close = function() {
		$$.frame.close({
			module: "floatBox",
			name: "content"
		})
		setTimeout(function() {
			api.closeFrame();
		}, 100);
	}
	
	var animationStatus = true;
	var animation = function(y) {
		api.animation({
			name: "floatBox_content",
			duration: 0,
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
		animation(-100);
	})

	api.addEventListener({
		name: 'scrollDownFloatBox'
	}, function() {
		animationStatus && animation(100);
	})

	api.addEventListener({
		name: 'tap'
	}, function() {
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