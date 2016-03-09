import version from 'extend/systems/version';

const ret = {
	click(...arg) {
		require(['extend/systems/touch/' + version.touch], (t) => {
			t['default'].touch.apply("", arg);
		})
	},
	log(...arg) {
		require(['extend/systems/console/' + version.console], (t) => {
			t['default'].log.apply("", arg);
		})
	}
}

module.exports = ret;