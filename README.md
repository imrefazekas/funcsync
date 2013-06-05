funcsync
========

[Funcsync](https://github.com/imrefazekas/funcsync) is a dependency-free extremely small library helping to exchange/synchronize functions between server and client side. 

Prepares an object - might containing business logic as function - for sending in a text format (JSON for example) and vice versa.

Usage:

- [Server-side](server-side)
- [Client-side](client-side)


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
		"tab2":{ "test3": function(){ console.log("user!"); } }
	};
	...
	f.stringify( obj ) // prepare the given object for sending
	...
	var fs = f.functify( obj ); // retrieve functions from the obj received
	fs.tab2.test3();

## Client-side

In <head>

	<script src='funcsync.min.js'></script>

In any <script> tag

	funcsync.stringify( obj );
 