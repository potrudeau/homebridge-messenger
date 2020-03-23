"use strict";

var Nodemailer = require('nodemailer');

module.exports = class EmailMessenger {
    constructor(homebridge) {
        this.homebridge = homebridge;    
        this.email = "test@p-o.ca";
        this.smtp_server = "shinra.asoshared.com";
        this.smtp_port = 465
        this.smtp_secure = true
        this.smtp_username = "test@p-o.ca"
        this.smtp_password = "test123!"
        // this.smtp_server = "smtp.videotron.ca";
        // this.smtp_port = 25
        // this.smtp_secure = false
        // this.smtp_username = ""
        // this.smtp_password = ""
    }

    isValid() {
        return true;
    }

    sendMessage() {

        if (this.smtp_secure)
        {
          var transport = Nodemailer.createTransport({
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
          var transport = Nodemailer.createTransport({
            host: this.smtp_server,
            port: this.smtp_port
          });
        }
    
        var mailOptions = {
          from: this.email,
          to: this.email,
          subject: this.homebridge.config.name,
          text: this.homebridge.config.text
      };
    
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
              this.homebridge.log(error);
          }
          this.homebridge.log('Email sent: %s', info.messageId);
        });

         
    }

}