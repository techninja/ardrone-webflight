(function(window, document, $, undefined) {
        'use strict';

        /*
         * Constructuor
         */
        var Claw = function Claw(cockpit) {
                console.log('Super Awesome Sky Claw!!!')
                this.cockpit = cockpit;
                this.listen();
        };

        /*
         * Register keyboard event listener
         */
        Claw.prototype.listen = function listen() {
                var claw = this;
                $(document).keydown(function(ev) {
                        claw.keyDown(ev);
                });
        };

        Claw.prototype.keyDown = function keyDown(ev) {
                if (ev.keyCode === 219) {
                  ev.preventDefault();
                  this.cockpit.socket.emit("/claw/down");
                  console.log('Claw down!!!');
                }
                else if (ev.keyCode == 221) {
                  ev.preventDefault();
                  this.cockpit.socket.emit("/claw/up");
                  console.log('Claw up!!!');
                }
        };

        window.Cockpit.plugins.push(Claw);

}(window, document, jQuery));
