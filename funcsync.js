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

	funcsync.VERSION = "1.1.0";

	var toString = Object.prototype.toString;

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
		return (toString.call(obj) == "[object " + Number + "]") || !isNaN(obj);
	};

	funcsync.isDate = function (obj) {
		return toString.call(obj) == "[object " + Date + "]";
	};

	funcsync.isArray = Array.isArray || function(obj) {
		return toString.call(obj) == '[object Array]';
	};

	funcsync.isFunction = function (obj) {
		return toString.call(obj) == "[object " + Function + "]";
	};
	funcsync.isBoolean = function(obj) {
		return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
	};

	var nativeForEach = Array.prototype.forEach;
	var breaker = {};
	funcsync.each = function(obj, iterator, context) {
		if (obj === null) return;
		if (nativeForEach && obj.forEach === nativeForEach) {
			obj.forEach(iterator, context);
		} else if ( funcsync.isArray(obj) ) {
			for (var i = 0, l = obj.length; i < l; i++) {
				if (iterator.call(context, obj[i], i, obj) === breaker) return;
			}
		} else {
			for (var key in obj) {
				if (iterator.call(context, obj[key], key, obj) === breaker) return;
			}
		}
	};

	if (typeof (/./) !== 'function') {
		funcsync.isFunction = function(obj) {
			return typeof obj === 'function';
		};
	}

	funcsync.merge = function(){
		function add(dest, ref){
			funcsync.each( ref, function(value, key, list){
				if( !dest[key] )
					dest[key] = value;
				else if( funcsync.isObject(value) && funcsync.isObject(dest[key]) ){
					add( dest[key], value );
				}
			} );
		}

		var dest = arguments[0] || {};
		var refs = Array.apply(null, arguments).slice(1, arguments.length);
		funcsync.each(refs, function(ref, key, list){
			if( funcsync.isObject(ref) )
				add( dest, ref );
		});
		return dest;
	};

	funcsync.stringify = function (obj) {
		var res;
		if (funcsync.isString(obj) || funcsync.isDate(obj) || funcsync.isNumber(obj))
			res = obj;
		else if (funcsync.isFunction(obj))
			res = obj.toString();
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
				if (funcsync.isString(data) && funcsync.startsWith(data, "function "))
					res = eval("(" + data + ")");
				else if (funcsync.isString(data) || funcsync.isDate(data) || funcsync.isNumber(data))
					res = data;
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