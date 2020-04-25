'use strict'

var PushOverMessenger = require('./lib/pushover.js')
var EmailMessenger = require('./lib/email.js')
var IftttMessenger = require('./lib/ifttt.js')

let Service, Characteristic, HomebridgeAPI

module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  HomebridgeAPI = homebridge
  homebridge.registerAccessory('homebridge-messenger', 'HomebridgeMessenger', HomebridgeMessenger)
}


class HomebridgeMessenger {
  constructor (log, config) {
    this.log = log
    this.config = config

    // Add main switch to Homebride
    this.serviceMainSwitch = new Service.Switch(this.config.name, 0)
    this.log("Added Main Switch : " + this.config.name);

    // Initialize cache
    this.cacheDirectory = HomebridgeAPI.user.persistPath();
    this.storage = require('node-persist');
    this.storage.initSync({dir:this.cacheDirectory, forgiveParseErrors: true});

    // Get cache and validate if main switch is in cache
    var cachedState = this.storage.getItemSync(this.config.name);
    if((cachedState === undefined) || (cachedState === false)) { // If not in cache
      this.isOn = false
      this.serviceMainSwitch.setCharacteristic(Characteristic.On, false);
      this.log("Main Switch status"+ " : " + false);
    } else { // If in cache
      this.isOn = true
      this.serviceMainSwitch.setCharacteristic(Characteristic.On, true);
      this.log("Main Switch status"+ " : " + true);
    }

    // Load configured messages
    this.loadMessages();
  }

  loadMessages()
  {
    this.messages = this.config.messages || [];
    this.serviceMessagesSwitches = [];

    // Iterate through configured messages
    for (let x = 0; x < this.messages.length; x++) {

      // Add switch for each message
      let serviceMessageSwitch = new Service.Switch(this.messages[x].name , x + 100)
      this.log("Added " + this.messages[x].type.toLowerCase() + " : " + this.messages[x].name);

      // Add event handler for each message
      serviceMessageSwitch.getCharacteristic(Characteristic.On) .on('set', function(value, callback) {
        if (value==true) { // If message switch status is On
          if (this.isOn) { // If main switch status if On
            var message;
            switch(this.messages[x].type.toLowerCase()) {
              // Message type is email
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
              // Message type is pushover
              case "pushover":
                message = new PushOverMessenger(this.config.services.pushover.user, 
                  this.config.services.pushover.token,
                  this.messages[x].name,
                  this.messages[x].text,
                  this.messages[x].priority,
                  this.messages[x].device,
                  this.messages[x].sound,
                  this.messages[x].url,
                  this.messages[x].urltitle)
                break;
              // Message type is pushover
              case "ifttt":
                message = new IftttMessenger(this.config.services.ifttt.key,
                  this.messages[x].event,
                  this.messages[x].value1,
                  this.messages[x].value2,
                  this.messages[x].value3)
                break;                
              // Invalid message type
              default:
                throw new Error(this.messages[x].name  + " : Invalid type value. Only Pushover and Email are accepted.");
                break;
            }

            this.log(this.messages[x].name  + " : Message sent to " + message.getRecipient())
            message.sendMessage() 
          } else { // If main switch status if Off
            this.log(this.messages[x].name + " : Message not sent. Master switch is off.")
          }

          // Configure message switch to be stateless : will be turned off after 100 ms.
          setTimeout(function() {
            serviceMessageSwitch.setCharacteristic(Characteristic.On, false);
           }.bind(this), 100, this.time);
        }

        callback(null);
      }.bind(this));

      // Add message switch to array. Array will be loaded in getServices()
      this.serviceMessagesSwitches.push(serviceMessageSwitch);
    }
  }


  setOnCharacteristicHandler (value, callback) {
    this.isOn = value
    this.storage.setItemSync(this.config.name, value);
    this.log("Main Switch status"+ " : " + value);
    callback(null);
  }


  getServices () {
    // Load configuration information for devices
    const informationService = new Service.AccessoryInformation()
        .setCharacteristic(Characteristic.Manufacturer, require('./package.json').name)
        .setCharacteristic(Characteristic.SerialNumber, require('./package.json').name)
        .setCharacteristic(Characteristic.Model, require('./package.json').name)
        .setCharacteristic(Characteristic.FirmwareRevision, require('./package.json').version)

    // Event handler for main switch
    this.serviceMainSwitch.getCharacteristic(Characteristic.On).on('set', this.setOnCharacteristicHandler.bind(this)) 
   
    // Send all switches to Homebridge to be added
    return [informationService, this.serviceMainSwitch, ...this.serviceMessagesSwitches];
  }
}