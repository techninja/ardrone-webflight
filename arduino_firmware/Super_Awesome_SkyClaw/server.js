// HTTP forwarding server for Super Awesome SkyClaw

var serialport = require('serialport');
var http = require('http');
var path = require('path');
var request = require('request');

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
  if (fileName == 'v' || fileName == "c") {
  	fileName = fileName == 'v' ? 'open' : 'close';
    request.post(
      'https://api.spark.io/v1/devices/53ff6a065067544855371087/claw',
      { form: { access_token: '560699bafcadc1c3bc6cb697a992a14f7fb9af09', argggh: fileName } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(fileName + 'ed the claw!');
          } else {
          	console.log(error, response, body);
          }
      }
  );

  }

	sp.write(fileName);
	res.end('written - ' + fileName);
	console.log(fileName);
}).listen(3001);
