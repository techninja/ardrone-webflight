var http = require('http');

var hostname = 'localhost';
var port = 3001;

/*
 * A client for node-to-arduino server for a neopixel.
 * See: https://github.com/JayBeavers/ardrone-webflight/blob/master/arduino_firmware/Super_Awesome_SkyClaw/Super_Awesome_SkyClaw.ino
 */
function neopixel(name, deps) {
    deps.io.sockets.on('connection', function (socket) {
        socket.on('/pilot/move', function (cmd) {
            console.log("req move", cmd);
            var opts = {
              hostname: hostname,
              port: port,
              method: 'GET'
            };
            switch (cmd.action) {
              case "front":
                opts.path = '/w';
                break;
              case "back":
                opts.path = '/s';
                break;
              case "left":
                opts.path = '/a';
                break;
              case "right":
                opts.path = '/d';
                break;
              case "up":
                opts.path = '/u';
                break;
              case "down":
                opts.path = '/l';
                break;
              case "counterClockwise":
                opts.path = '/q';
                break;
              case "clockwise":
                opts.path = '/e';
                break;
            }
            var req = http.request(opts);
            req.on('error', function(){console.error('No neopixel server')});
            req.end();
        });
        socket.on('/pilot/drone', function (cmd) {
            console.log("req drone", cmd);
            var opts = {
              hostname: hostname,
              port: port,
              method: 'GET'
            };
            switch (cmd.action) {
              case "stop":
              case "takeoff":
                opts.path = '/h';
                break;
              case "land":
                opts.path = '/z';
                setTimeout(function() {
                  // Guess once we've landed, then turn LED off
                  var req = http.request({
                    hostname: hostname,
                    port: port,
                    method: 'GET',
                    path: '/o'
                  })
                  req.on('error', function(){});
                  req.end();
                }, 3000);
                break;
            }
            var req = http.request(opts);
            req.on('error', function(){console.error('No neopixel server')});
            req.end();
        });
    });
};

module.exports = neopixel;
