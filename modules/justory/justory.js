/**
 * justory
 * ver 1.0.1
 * dependence SeaJS 2.0.0b3 | seajs.org/LICENSE.md
 * @author {@link http://justory.cn}
 */
(function(u, q) {
	function H(a) {
		return function(c) {
			return Object.prototype.toString.call(c) === "[object " + a + "]"
		}
	}

	function P(a) {
		a = a.replace(ia, "/");
		for (a = a.replace(ja, "$1/"); a.match(Q);)
			a = a.replace(Q, "/");
		return a
	}

	function R(a) {
		a = P(a);
		ka.test(a) ? a = a.slice(0, -1) : la.test(a) || (a += ".js");
		return a.replace(":80/", "/")
	}

	function S(a, c) {
		return ma.test(a) ? a : na.test(a) ? (c || v).match(I)[0] + a : oa.test(a) ? (v.match(pa) || ["/"])[0] + a.substring(1) : j.base + a
	}

	function T(a, c) {
		if (!a)
			return "";
		var b = a,
			d = j.alias,
			b = a = d && d.hasOwnProperty(b) ? d[b] : b,
			d = j.paths,
			f;
		if (d && (f = b.match(qa)) && d && d.hasOwnProperty(f[1]))
			b = d[f[1]] + f[2];
		f = b;
		var x = j.vars;
		x && -1 < f.indexOf("{") && (f = f.replace(ra, function(a, b) {
			return x && x.hasOwnProperty(b) ? x[b] : a
		}));
		a = S(f, c);
		f = a = R(a);
		var b = j.map,
			e = f;
		if (b)
			for (d = 0; d < b.length && !(e = b[d], e = y(e) ? e(f) || f : f.replace(e[0], e[1]), e !== f); d++);
		return e
	}

	function U(a, c) {
		var b = a.sheet,
			d;
		if (V)
			b && (d = !0);
		else if (b)
			try {
				b.cssRules && (d = !0)
			} catch (f) {
				"NS_ERROR_DOM_SECURITY_ERR" === f.name && (d = !0)
			}
		setTimeout(function() {
			d ? c() : U(a, c)
		}, 20)
	}

	function sa() {
		if (z)
			return z;
		if (A && "interactive" === A.readyState)
			return A;
		for (var a = w.getElementsByTagName("script"), c = a.length - 1; 0 <= c; c--) {
			var b = a[c];
			if ("interactive" === b.readyState)
				return A = b
		}
	}

	function B(a) {
		this.uri = a;
		this.dependencies = [];
		this.exports = null;
		this.status = 0
	}

	function r(a, c) {
		if (C(a)) {
			for (var b = [], d = 0; d < a.length; d++)
				b[d] = r(a[d], c);
			return b
		}
		b = {
			id: a,
			refUri: c
		};
		s("resolve", b);
		return b.uri || T(b.id, c)
	}

	function D(a, c) {
		C(a) || (a = [a]);
		W(a, function() {
			for (var b = [], d = 0; d < a.length; d++)
				b[d] = X(l[a[d]]);
			c && c.apply(u, b)
		})
	}

	function W(a, c) {
		var b = Y(a);
		if (0 === b.length)
			c();
		else {
			s("load", b);
			for (var d = b.length, f = d, e = 0; e < d; e++)
				(function(a) {
					function b(c) {
						c || (c = d);
						var f = Y(e.dependencies);
						0 === f.length ? c() : Z(e) ? (f = n, f.push(f[0]), $("Circular dependencies: " + f.join(" -> ")), n.length = 0, c(!0)) : (aa[a] = f, W(f, c))
					}

					function d(a) {
						!a && e.status < J && (e.status = J);
						0 === --f && c()
					}

					var e = l[a];
					e.dependencies.length ? b(function(b) {
						function c() {
							d(b)
						}


						e.status < E ? ba(a, c) : c()
					}) : e.status < E ? ba(a, b) : d()
				})(b[e])
		}
	}

	function ba(a, c) {
		function b() {
			delete K[f];
			L[f] = !0;
			F && (ca(a, F), F = q);
			var b, c = G[f];
			for (
				delete G[f]; b = c.shift();)
				b()
		}


		l[a].status = ta;
		var d = {
			uri: a
		};
		s("fetch", d);
		var f = d.requestUri || a;
		if (L[f])
			c();
		else if (K[f])
			G[f].push(c);
		else {
			K[f] = !0;
			G[f] = [c];
			var e = j.charset;
			s("request", d = {
				uri: a,
				requestUri: f,
				callback: b,
				charset: e
			});
			if (!d.requested) {
				var d = d.requestUri,
					h = ua.test(d),
					g = p.createElement(h ? "link" : "script");
				if (e && (e = y(e) ? e(d) : e))
					g.charset = e;
				var k = g;
				h && (V || !("onload" in k)) ? setTimeout(function() {
					U(k, b)
				}, 1) : k.onload = k.onerror = k.onreadystatechange = function() {
					va.test(k.readyState) && (k.onload = k.onerror = k.onreadystatechange = null, !h && !j.debug && w.removeChild(k), k = q, b())
				};
				h ? (g.rel = "stylesheet", g.href = d) : (g.async = !0, g.src = d);
				z = g;
				da ? w.insertBefore(g, da) : w.appendChild(g);
				z = q
			}
		}
	}

	function wa(a, c, b) {
		1 === arguments.length && (b = a, a = q);
		if (!C(c) && y(b)) {
			var d = [];
			b.toString().replace(xa, "").replace(ya, function(a, b, c) {
				c && d.push(c)
			});
			c = d
		}
		var f = {
			id: a,
			uri: r(a),
			deps: c,
			factory: b
		};
		if (!f.uri && p.attachEvent) {
			var e = sa();
			e ? f.uri = e.src : $("Failed to derive: " + b)
		}
		s("define", f);
		f.uri ? ca(f.uri, f) : F = f
	}

	function ca(a, c) {
		var b = l[a] || (l[a] = new B(a));
		b.status < E && (b.id = c.id || a, b.dependencies = r(c.deps || [], a), b.factory = c.factory, b.factory !== q && (b.status = E))
	}

	function X(a) {
		function c(b) {
			return r(b, a.uri)
		}

		function b(a) {
			return X(l[c(a)])
		}

		if (!a)
			return null;
		if (a.status >= ea)
			return a.exports;
		a.status = ea;
		b.resolve = c;
		b.async = function(a, d) {
			D(c(a), d);
			return b
		};
		var d = a.factory,
			d = y(d) ? d(b, a.exports = {}, a) : d;
		a.exports = d === q ? a.exports : d;
		a.status = za;
		return a.exports
	}

	function Y(a) {
		for (var c = [], b = 0; b < a.length; b++) {
			var d = a[b];
			d && (l[d] || (l[d] = new B(d))).status < J && c.push(d)
		}
		return c
	}

	function Z(a) {
		var c = aa[a.uri] || [];
		if (0 === c.length)
			return !1;
		n.push(a.uri);
		a: {
			for (a = 0; a < c.length; a++)
				for (var b = 0; b < n.length; b++)
					if (n[b] === c[a]) {
						a = !0;
						break a
					}
			a = !1
		}
		if (a) {
			a = n[0];
			for (b = c.length - 1; 0 <= b; b--)
				if (c[b] === a) {
					c.splice(b, 1);
					break
				}
			return !0
		}
		for (a = 0; a < c.length; a++)
			if (Z(l[c[a]]))
				return !0;
		n.pop();
		return !1
	}

	function fa(a) {
		var c = j.preload,
			b = c.length;
		b ? D(r(c), function() {
			c.splice(0, b);
			fa(a)
		}) : a()
	}

	function M(a) {
		for (var c in a) {
			var b = a[c];
			if (b && "plugins" === c) {
				c = "preload";
				for (var d = [], f =
					void 0; f = b.shift();)
					d.push(ga + "plugin-" + f);
				b = d
			}
			if ((d = j[c]) && Aa(d))
				for (var g in b)
					d[g] = b[g];
			else
				C(d) ? b = d.concat(b) : "base" === c && (b = R(S(b + "/"))), j[c] = b
		}
		s("config", a);
		return e
	}

	var m = u.seajs;
	if (!m || !m.version) {
		var e = u.seajs = {
				version: "2.0.0b3"
			},
			Aa = H("Object"),
			C = Array.isArray || H("Array"),
			y = H("Function"),
			$ = e.log = function(a, c) {
				u.console && (c || j.debug) && console[c || (c = "log")] && console[c](a)
			},
			t = e.events = {};
		e.on = function(a, c) {
			if (!c)
				return e;
			(t[a] || (t[a] = [])).push(c);
			return e
		};
		e.off = function(a, c) {
			if (!a && !c)
				return e.events = t = {}, e;
			var b = t[a];
			if (b)
				if (c)
					for (var d = b.length - 1; 0 <= d; d--)
						b[d] === c && b.splice(d, 1);
				else
					delete t[a];
			return e
		};
		var s = e.emit = function(a, c) {
				var b = t[a],
					d;
				if (b)
					for (b = b.slice(); d = b.shift();)
						d(c);
				return e
			},
			I = /[^?#]*\//,
			ia = /\/\.\//g,
			ja = /([^:\/])\/\/+/g,
			Q = /\/[^/]+\/\.\.\//g,
			la = /\?|\.(?:css|js)$|\/$/,
			ka = /#$/,
			qa = /^([^/:]+)(\/.+)$/,
			ra = /{([^{]+)}/g,
			ma = /(?:^|:)\/\/./,
			na = /^\./,
			oa = /^\//,
			pa = /^.*?\/\/.*?\//,
			p = document,
			h = location,
			v = h.href.match(I)[0],
			g = p.getElementsByTagName("script"),
			g = p.getElementById("seajsnode") || g[g.length - 1],
			ga = (g.hasAttribute ? g.src : g.getAttribute("src", 4)).match(I)[0] || v;
		e.cwd = function(a) {
			return a ? v = P(a + "/") : v
		};
		var w = p.getElementsByTagName("head")[0] || p.documentElement,
			da = w.getElementsByTagName("base")[0],
			ua = /\.css(?:\?|$)/i,
			va = /^(?:loaded|complete|undefined)$/,
			z, A, V = 536 > 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1"),
			ya = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
			xa = /\\\\/g,
			l = e.cache = {},
			F, K = {},
			L = {},
			G = {},
			aa = {},
			ta = 1,
			E = 2,
			J = 3,
			ea = 4,
			za = 5;
		B.prototype.destroy = function() {
			delete l[this.uri];
			delete L[this.uri]
		};
		var n = [];
		e.use = function(a, c) {
			fa(function() {
				D(r(a), c)
			});
			return e
		};
		e.resolve = T;
		u.define = wa;
		B.load = D;
		var N = ga,
			ha = N.match(/^(.+?\/)(?:seajs\/)+(?:\d[^/]+\/)?$/);
		ha && (N = ha[1]);
		var j = M.data = {
			base: N,
			charset: "utf-8",
			preload: []
		};
		e.config = M;
		var O, h = h.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2"),
			h = h + (" " + p.cookie);
		h.replace(/seajs-(\w+)=1/g, function(a, c) {
			(O || (O = [])).push(c)
		});
		M({
			plugins: O
		});
		apiready = function() {

			//ios statusBar
			window.statusBar = false;
			window.statusBarHeight = 0;
			if (api.systemType == "ios") {
				var numSV = parseInt(api.systemVersion, 10);
				if (numSV >= 7 && !api.fullScreen && api.iOS7StatusBarAppearance) {
					window.statusBar = true;
					window.statusBarHeight = 20;
					var style  =  document.createElement("style");
					style.innerHTML  =  "._StatusBar{padding-top:20px;}";
					document.head.appendChild(style);
				}
			}

			//seajs config
			seajs.config({
				base: "../../modules",
				alias: {
					"jquery": "jquery/jquery.js",
					"main": "extend/main.js"
				},
				charset: "utf-8"
			});

			//use data-main
			e.use(["main"], function() {
				g = g.getAttribute("data-main");
				g && e.use(g);
				if (m && m.args) {
					g = ["define", "config", "use"];
					m = m.args;
					for (h = 0; h < m.length; h += 2)
						e[g[m[h]]].apply(e, m[h + 1])
				}
			});

		}
	}
})(this);