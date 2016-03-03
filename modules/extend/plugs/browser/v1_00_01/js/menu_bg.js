$$.data.send({
	win: {
		module: "browser",
		name: "v1_00_01"
	},
	data: {
		type: "show"
	}
})

var hidden = function() {
	api.setFrameAttr({
		name: "browser_menu",
		hidden: true
	})
	api.setFrameAttr({
		name: "browser_menu_bg",
		hidden: true
	})
	$$.data.send({
		win: {
			module: "browser",
			name: "v1_00_01"
		},
		data: {
			type: "hidden"
		}
	})
}

api.addEventListener({
	name: 'tap'
}, function() {
	hidden();
})
api.addEventListener({
	name: 'swipedown'
}, function(ret, err) {
	hidden();
});
api.addEventListener({
	name: 'swipeleft'
}, function(ret, err) {
	hidden();
});
api.addEventListener({
	name: 'swiperight'
}, function(ret, err) {
	hidden();
});
api.addEventListener({
	name: 'swipeup'
}, function(ret, err) {
	hidden();
});