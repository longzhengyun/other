var express = require('express'),
	http = require('http'),
	fs = require('fs');

http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	fs.readFile('data/test.txt', function(err, data){
		if(err){
			return console.error(err);
		}else{
			response.end(data);
		}
	});
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888');