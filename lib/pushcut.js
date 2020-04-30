"use strict";

const axios = require('axios')

module.exports = class IftttMessenger {
    constructor(apiKey, notificationName, messageTitle, messageText, messageInput, messageActions) { 
       this.pushcut_apikey = apiKey
       this.message_notification = notificationName
       this.message_title = messageTitle
       this.message_text = messageText
       this.message_input = messageInput
       this.message_actions = messageActions
    }


    getRecipient() {
        return this.pushcut_apikey + " (notification : " + this.message_notification + ")"
    }

    
    sendMessage() {
      var url = "https://api.pushcut.io/v1/notifications/" + this.message_notification
      var data = { text: this.message_text, title: this.message_title, input : this.message_input, actions: this.message_actions};
      var config = { headers: {'accept': '*/*', 'API-Key': this.pushcut_apikey, 'Content-Type': 'application/json'}};

      axios.post(url, data, config)
      .catch(error => {
        console.error(error)
      })

    }
}