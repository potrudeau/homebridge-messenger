"use strict";

var Pushover = require('pushover-notifications');

module.exports = class PushOverMessenger {
    constructor(homebridge, pushoverUser, pushoverToken, messageTitle, messageText, messagePriority, messageSound) {
        this.homebridge = homebridge
        this.pushover_user = pushoverUser
        this.pushover_token = pushoverToken
        this.message_title = messageTitle
        this.message_text = messageText
        this.message_priority = messagePriority
        this.message_sound = messageSound
    }

    isValid() {   
        if (!this.pushover_user)
            throw new Error(this.message_title + " : User cannot be empty");

        if (!this.pushover_token)
            throw new Error(this.message_title + " : Token cannot be empty");

        if (!this.message_title)
            throw new Error(this.message_title + " : Message title cannot be empty");

        if (!this.message_text)
            throw new Error(this.message_title + " : Message text cannot be empty");

        // TODO : Ajouter priority 2
        if (![-2, -1, 0 , 1].includes(this.message_priority))
            throw new Error(this.message_title + " : Invalid priority value " + this.message_priority);

        return true        
    }

    getRecipient() {
        return this.pushover_token
    }

    sendMessage() {
        if (this.isValid() == true) {
            var p = new Pushover( {
                user: this.pushover_user,
                token: this.pushover_token,
            })
            
            var msg = {
                message: this.message_text,
                title: this.message_title,
                priority: this.message_priority,
                sound : this.message_sound
            }

            p.send(msg, function(error, result) {
                if (error)
                    throw new Error(error);
            })   
        }     
    }
}