"use strict";

var Pushover = require('pushover-notifications');

module.exports = class PushOverMessenger {
    constructor(homebridge) {
        this.homebridge = homebridge;   
        this.pushover_user = "uHf8jc4AeeYjRUMVoQdvdcTfqXuUyw"
        this.pushover_token = "anz2rmnv3mnczb4ojju61mmhceya55"    
    }

    isValid() {
        return true;
    }

    sendMessage() {
   
        var p = new Pushover( {
            user: this.pushover_user,
            token: this.pushover_token,
        })
        
        var msg = {
            message: this.homebridge.config.text,
            title: this.homebridge.config.name,
            priority: 1
        }

        msg.sound = "magic";
        
        this.homebridge.log('Pushover sent: %s', msg.message)

        p.send(msg, function(error, result) {
            if (error) {
                this.homebridge.log(error);
            }
        })       
    }

}