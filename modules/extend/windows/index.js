import version from 'extend/windows/version';

const ret = {
	f(cb) {
		require(["extend/windows/frame/" + version.frame], (t) => {
			cb(t['default']);
		})
	},
	fg(cb) {
		require(["extend/windows/frameGroup/" + version.frameGroup], (t) => {
			cb(t['default']);
		})
	},
	frame: {
		open(...arg) {
			ret.f((t) => {
				t.open.apply("", arg);
			});
		},
		close(...arg) {
			ret.f((t) => {
				t.close.apply("", arg);
			});
		}
	},
	frameGroup: {
		open(...arg) {
			ret.fg((t) => {
				t.open.apply("", arg);
			})
		},
		close() {
			//
		}
	}
}

export default ret