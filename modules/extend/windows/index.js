import version from 'extend/windows/version';

const ret = {
	w(cb) {
		require(["extend/windows/win/" + version.win], (t) => {
			cb(t['default']);
		})
	},
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
	win: {
		open(...arg) {
			ret.w((t) => {
				t.open.apply("", arg);
			});
		},
		close(...arg) {
			ret.w((t) => {
				t.close.apply("", arg);
			});
		}
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
		},
		hide(...arg) {
			ret.f((t) => {
				t.hide.apply("", arg);
			});
		},
		show(...arg) {
			ret.f((t) => {
				t.show.apply("", arg);
			});
		}
	},
	frameGroup: {
		open(...arg) {
			ret.fg((t) => {
				t.open.apply("", arg);
			})
		},
		close(...arg) {
			ret.fg((t) => {
				t.close.apply("", arg);
			})
		},
		hide(...arg) {
			ret.fg((t) => {
				t.hide.apply("", arg);
			})
		},
		show(...arg) {
			ret.fg((t) => {
				t.show.apply("", arg);
			})
		}
	}
}

export default ret