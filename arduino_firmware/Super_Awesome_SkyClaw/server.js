// HTTP forwarding server for Super Awesome SkyClaw

var serialport = require('serialport');
var http = require('http');
var path = require('path');
 
console.log('loaded sp');
 
var port = '/dev/ttyACM0';
 
console.log('opening' + port);
 
var sp = new serialport.SerialPort(port, {baud: 9600});
 
sp.on('open', function() {
      console.log('opened');      
});

http.createServer(function(req, res) {
	var fileName = path.basename(req.url);
	if (fileName == 'favicon.ico') {
		return;
	}
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	sp.write(fileName);
	res.end('written - ' + fileName);
	console.log(fileName);
}).listen(3001);
