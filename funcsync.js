(function () {
	var root = this;

	var funcsync = function(obj) {
		if (obj instanceof funcsync) return obj;
		if (!(this instanceof funcsync)) return new funcsync(obj);
		this._wrapped = obj;
	};

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = funcsync;
		}
		exports.funcsync = funcsync;
	} else {
		root.funcsync = funcsync;
	}

	funcsync.VERSION = "1.0.1";

	funcsync.startsWith = function(str, substr){
		return str.indexOf(substr) === 0;
	};

	funcsync.isString = function (obj) {
		return "[object String]" == toString.call(obj);
	};

	funcsync.isObject = function (obj) {
		return obj === Object(obj);
	};

	funcsync.isNumber = function (obj) {
		return toString.call(obj) == "[object " + Number + "]";
	};

	funcsync.isDate = function (obj) {
		return toString.call(obj) == "[object " + Date + "]";
	};

	funcsync.isNumber = function (obj) {
		return toString.call(obj) == "[object " + Number + "]";
	};

	funcsync.isFunction = function (obj) {
		return toString.call(obj) == "[object " + Function + "]";
	};

	if (typeof (/./) !== 'function') {
		funcsync.isFunction = function(obj) {
			return typeof obj === 'function';
		};
	}

	funcsync.isArray = Array.isArray || function (obj) {
		return "[object Array]" == toString.call(obj);
	};

	funcsync.stringify = function (obj) {
		var res;
		if (funcsync.isFunction(obj)) res = obj.toString();
		else if (funcsync.isArray(obj)) {
			res = [];
			for (var index in obj)
				res.push(funcsync.stringify(obj[index]));
		} else if (funcsync.isObject(obj)) {
			res = {};
			for (var key in obj)
				res[key] = funcsync.stringify(obj[key]);
		}
		else
			res = obj;
		return res;
	};

	funcsync.functify = function (obj, context) {
		var self = context;
		return function( tree ){

			function bindify(data) {
				var res;
				if (funcsync.isString(data) && funcsync.startsWith(data, "function ")) res = eval("(" + data + ")");
				else if (funcsync.isArray(data)) {
					res = [];
					for (var index in data)
						res.push(bindify(data[index]));
				} else if (funcsync.isObject(data)) {
					res = {};
					for (var key in data)
						res[key] = bindify(data[key]);
				}
				else
					res = data;
				return res;
			}

			return bindify( tree );
		}( obj );
	};

}).call(this);