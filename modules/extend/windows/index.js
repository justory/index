import frameGroup from 'frameGroup';

const ret = {
	/*f(cb) {
		require(["extend/windows/frame/" + version.frame], function(f) {
			cb(f)
		})
	},*/
	/*fg(cb) {
			require(["extend/windows/frameGroup/"+ version.frameGroup], (t) => {
				cb(t)
			})
		},*/
		/*frame: {
			open: function() {
				var arg = arguments;
				fn.f(function(f) {
					f.open.apply("", arg);
				});
			},
			close: function() {
				var arg = arguments;
				fn.f(function(f) {
					f.close.apply("", arg);
				});
			}
		},*/
		frameGroup: {
			open(...arg) {
				frameGroup.open.apply("", arg);
					/*ret.fg((t) => {
						t['default'].open.apply("", arg);
					});*/
				},
				close: function() {
					//
				}
		}
}

export default ret