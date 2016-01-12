import version from 'extend/datacom/version';

const ret = {
	ai(cb) {
		require(['extend/datacom/ajax/' + version.ajax], (t) => {
			cb(t['default']);
		})
	},
	dt(cb) {
		require(['extend/datacom/data/' + version.data], (t) => {
			cb(t['default']);
		})
	},
	sg(cb) {
		require(['extend/datacom/storage/' + version.storage], (t) => {
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
	data:{
		publish(...arg){
			ret.dt((t) => {
				t.publish.apply('', arg);
			})
		},
		subscribe(...arg){
			ret.dt((t) => {
				t.subscribe.apply('', arg);
			})
		},
		send(...arg){
			ret.dt((t) => {
				t.send.apply('', arg);
			})
		},
		get(...arg){
			ret.dt((t) => {
				t.get.apply('', arg);
			})
		}
	},
	storage:{
		set(...arg){
			ret.sg((t) => {
				t.set.apply('', arg);
			})
		},
		get(...arg){
			ret.sg((t) => {
				t.get.apply('', arg);
			})
		}
	}
}

module.exports = ret;