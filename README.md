funcsync
========

[Funcsync](https://github.com/imrefazekas/funcsync) is a dependency-free extremely small library helping to exchange/synchronize functions between server and client side. 

Prepares an object - might containing business logic as function - for sending in a text format (JSON for example) and vice versa.

Usage:

- [Server-side](#server-side)
- [Client-side](#client-side)


## Server-side

Command line:

	npm install funcsync

In [node.js](www.nodejs.org) code:

	var f = require('funcsync');
	...
	var obj = {
		"tab1":[
			function test1(){ console.log("My "); },
			function test2(){ console.log("dear "); }
		],
		"tab2":{ "test3": function(){ console.log("user:" + self.name); } }
	};
	...
	f.stringify( obj ) // prepare the given object for sending
	...
	var fs = f.functify( obj, {nane:'Bob'} ); // retrieve functions from the obj received
	fs.tab2.test3();

#### Bind context

The function _functify_ has an optional second parameter: _context_. 
All function will access this context, through the variable name _self_ while being executed. 

This way you can __bind__ a [knockout.js](http://knockoutjs.com) viewmodel or anything you want and can access it via the name _'self'_.

## Client-side

In _head_

	<script src='funcsync.min.js'></script>

In any _script_ tag

	funcsync.stringify( obj );
