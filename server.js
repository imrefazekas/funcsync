var f = require('./funcsync');

var s = f.stringify(
	{
		"name": "value",
		"count": 1,
		"tab1":[
			function almafa(){console.log("almafa");},
			function almafa(){console.log("almafa");}
		],
		"tab2":{ "almafa": function(){console.log("almafa", self.name);} }
	}
);

console.log( s );

var binds = f.functify(s, {name:'Imi'});

console.log( binds );

binds.tab2.almafa();
