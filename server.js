var f = require('./funcsync');

var s = f.stringify(
	{
		"tab1":[
			function almafa(){console.log("almafa");},
			function almafa(){console.log("almafa");}
		],
		"tab2":{ "almafa": function(){console.log("almafa", self.name);} }
	}
);

console.log( s );

var binds = f.functify(s, {name:'Imi'});

binds.tab2.almafa();