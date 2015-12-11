define(function(require, exports, module) {

	var fn = function() {
		return {
			loading: function() {
				var loading = require('extend/systemAtic/loading');
				this.open = function() {
					loading.open.apply("", arguments[0]);
				}
				this.close = function() {
					loading.close.apply("", arguments[0]);
				}
			},
			refreshTop: function() {
				var refreshTop = require('extend/systemAtic/refreshTop');
				this.open = function() {
					refreshTop.open.apply("", arguments[0]);
				}
				this.close = function() {
					refreshTop.close.apply("", arguments[0]);
				}
			},
			toast: function() {
				var toast = require('extend/systemAtic/toast');
				this.open = function() {
					toast.open.apply("", arguments[0]);
				}
			}
		}
	}();

	module.exports = fn;

});