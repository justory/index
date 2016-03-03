var send = function(type) {
	$$.data.send({
		win: {
			module: "browser",
			name: "v1_00_01"
		},
		data: {
			type: type
		}
	})
}

$$.click(".box li", "active", function(t) {
	send($(t).attr("id"));
})