import version from 'extend/datacom/version';

const ret = {
	ai(cb) {
		require(['extend/datacom/ajax/' + version.ajax], (t) => {
			cb(t['default']);
		})
	},
	get(...arg) {
		ret.ai((t) => {
			t.ajax.apply({
				type: "get"
			}, arg);
		})
	},
	post(...arg) {
		ret.ai((t) => {
			t.ajax.apply({
				type: "post"
			}, arg);
		})
	},
	jsonp(...arg) {
		ret.ai((t) => {
			t.ajax.apply({
				type: "jsonp"
			}, arg);
		})
	},
	upload(...arg) {
		ret.ai((t) => {
			t.ajax.apply({
				type: "post",
				upload: true,
			}, arg);
		})
	},
}

module.exports = ret;