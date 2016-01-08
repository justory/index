import version from 'extend/systems/version';

const ret = {
	/*loading: function() {
		var arg = arguments;
		var This = this;
		require.async('extend/systemAtic/touch/' + v.loading, function(t) {
			This.open = function() {
				t.open.apply("", arguments[0]);
			}
			This.close = function() {
				t.close.apply("", arguments[0]);
			}
		});
	},
	ld: function(cb) {
		require.async('extend/systemAtic/loading/' + v.loading, function(ld) {
			cb(ld);
		});
	},
	loading: {
		open: function() {
			var arg = arguments;
			fn.ld(function() {
				//!!!!!!!!!!!!!!!!!!!!!!!
				let a = 'hello world';
				alert(a);
			});
		},
		close: function() {
			var arg = arguments;
		}
	},
	click: function() {
		var arg = arguments;
		require.async('extend/systemAtic/touch/' + v.touch, function(t) {
			t.touch.apply("", arg);
		});
	},*/
	log(...arg) {
		require(['extend/systems/console/' + version.console], (c) => {
			c['default'].log.apply("", arg);
		})
	}
}

module.exports = ret;