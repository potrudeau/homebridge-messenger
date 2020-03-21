'use strict'

let Service, Characteristic

module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-messenger', 'HomebridgeMessenger', SwitchAccessory)
}

class SwitchAccessory {
  constructor (log, config) {
    this.log = log
    this.config = config
    this.email = "test@p-o.ca";

    // this.smtp_server = "smtp.videotron.ca";
    // this.smtp_port = 25
    // this.smtp_secure = false
    // this.smtp_username = ""
    // this.smtp_password = ""

    this.smtp_server = "shinra.asoshared.com";
    this.smtp_port = 465
    this.smtp_secure = true
    this.smtp_username = "test@p-o.ca"
    this.smtp_password = "test123!"

    this.pushover_user = "uHf8jc4AeeYjRUMVoQdvdcTfqXuUyw"
    this.pushover_token = "anz2rmnv3mnczb4ojju61mmhceya55"

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
    this.isOn = value

    if (value == true) 
    {
      switch(this.config.type.toLowerCase()) {
        case "email":
          this.SendEmail();
          break;
        case "pushover":
          this.SendPushOver();
          break;
      }

      setTimeout(function() {
         this.service.setCharacteristic(Characteristic.On, false);
       }.bind(this), 1500, this.time);
    }

    callback(null);
  }

  SendEmail() {
    var nodemailer = require('nodemailer');

    if (this.smtp_secure)
    {
      var transport = nodemailer.createTransport({
        host: this.smtp_server,
        port: this.smtp_port,
        secure: this.smtp_secure,
        auth: {
          user: this.smtp_username, 
          pass: this.smtp_password
        }
      });
    }
    else
    {
      var transport = nodemailer.createTransport({
        host: this.smtp_server,
        port: this.smtp_port
      });
    }

    var mailOptions = {
      from: this.email,
      to: this.email,
      subject: this.config.name,
      text: this.config.text
  };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
          this.log(error);
      }
      this.log('Email sent: %s', info.messageId);
    });
   
  }

  SendPushOver() {
    var Push = require( 'pushover-notifications' )
 
    var p = new Push( {
      user: this.pushover_user,
      token: this.pushover_token,
    })
     
    var msg = {
      message: this.config.text,
      title: this.config.name,
      priority: 1
    }

    msg.sound = "magic";
     
    this.log('Pushover sent: %s', msg.message)

    p.send(msg, function(error, result) {
      if (error) {
        this.log(error);
      }
    })
  }
}