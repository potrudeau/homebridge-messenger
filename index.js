'use strict'

let Service, Characteristic

var PushOverMessenger = require('./src/messenger-pushover.js');
var EmailMessenger = require('./src/messenger-email.js');

module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-messenger', 'HomebridgeMessenger', SwitchAccessory)
}

class SwitchAccessory {
  constructor (log, config) {
    this.log = log
    this.config = config

    this.service = new Service.Switch(this.config.name)
  }

  getServices () {
    const informationService = new Service.AccessoryInformation()
        .setCharacteristic(Characteristic.Manufacturer, 'potrudeau')
        .setCharacteristic(Characteristic.Model, 'HomebridgeMessenger')
        .setCharacteristic(Characteristic.SerialNumber, 'homebridge-messenger')

    this.service.getCharacteristic(Characteristic.On)
      .on('set', this.setOnCharacteristicHandler.bind(this))
      
    return [informationService, this.service]
  }

  setOnCharacteristicHandler (value, callback) {
  
    if (value == true) 
    {
      switch(this.config.type.toLowerCase()) {
        case "email":
          new EmailMessenger(this).sendMessage();
          break;
        case "pushover":
          new PushOverMessenger(this).sendMessage();
          break;
      }

      setTimeout(function() {
         this.service.setCharacteristic(Characteristic.On, false);
       }.bind(this), 1500, this.time);
    }

    callback(null);
  }
}