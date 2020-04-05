'use strict'

var PushOverMessenger = require('./lib/pushover.js')
var EmailMessenger = require('./lib/email.js')

let Service, Characteristic

module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-messenger', 'HomebridgeMessenger', HomebridgeMessenger)
}

class HomebridgeMessenger {
  constructor (log, config) {
    this.log = log
    this.config = config
    this.serviceMain = new Service.Switch(this.config.name, 0)


    this.serviceMain.setCharacteristic(Characteristic.On, true);
    this.isOn = true

    this.loadMessages();
  }

  loadMessages()
  {
    this.messages = this.config.messages || [];
    this.serviceMessages = [];

    for (let x = 0; x < this.messages.length; x++) {
      let serviceMessage = new Service.Switch(this.messages[x].name , x+100)

      serviceMessage.getCharacteristic(Characteristic.On)
      .on('set', function(value, callback) {
        
        if (value==true) {
          if (this.isOn) {
            var message;
            switch(this.messages[x].type.toLowerCase()) {
              case "email":   
                message = new EmailMessenger(this.config.services.email.recipient, 
                  this.config.services.email.smtpServer, 
                  this.config.services.email.smtpPort, 
                  this.config.services.email.smtpSecure, 
                  this.config.services.email.smtpUsername, 
                  this.config.services.email.smtpPassword, 
                  this.messages[x].name,
                  this.messages[x].text)
                break;
              case "pushover":
                message = new PushOverMessenger(this,this.config.services.pushover.user, 
                  this.config.services.pushover.token,
                  this.messages[x].name,
                  this.messages[x].text,
                  this.messages[x].priority,
                  this.messages[x].sound)
                break;
              default:
                throw new Error(this.messages[x].name  + " : Invalid type value. Only Email and Pushover are accepted.");
                break;
            }

            this.log(this.messages[x].name  + " : Sending message to " + message.getRecipient())
            message.sendMessage() 
          } else {
            this.log(this.messages[x].name + " : Message not sent. Master switch is off.")
          }

          setTimeout(function() {
            serviceMessage.setCharacteristic(Characteristic.On, false);
           }.bind(this), 100, this.time);
        }

        callback(null);
      }.bind(this));

      this.serviceMessages.push(serviceMessage);
    }
  }

  setOnCharacteristicHandler (value, callback) {
    this.isOn = value
    callback(null);
  }

  getServices () {

    const informationService = new Service.AccessoryInformation()
        .setCharacteristic(Characteristic.Manufacturer, require('./package.json').name)
        .setCharacteristic(Characteristic.SerialNumber, require('./package.json').name)
        .setCharacteristic(Characteristic.Model, require('./package.json').name)
        .setCharacteristic(Characteristic.FirmwareRevision, require('./package.json').version)

    this.serviceMain.getCharacteristic(Characteristic.On)
      .on('set', this.setOnCharacteristicHandler.bind(this)) 
    
    return [informationService, this.serviceMain, ...this.serviceMessages];
  }
}