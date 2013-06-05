var f = require('./funcsync');

var s = f.stringify(
	{
		"tab1":[
			function almafa(){console.log("almafa");},
			function almafa(){console.log("almafa");}
		],
		"tab2": function almafa(){console.log("almafa");}
	}
);

console.log( s );

console.log( f.functify(s) );