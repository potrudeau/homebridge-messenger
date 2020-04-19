"use strict";

var Nodemailer = require('nodemailer');

module.exports = class EmailMessenger {
    constructor(emailRecipient, smtpServer, smtpPort, smtpSecure, smtpUsername, smtpPassword, messageTitle, messageText) {
        this.email = emailRecipient
        this.smtp_server = smtpServer
        this.smtp_port = smtpPort
        this.smtp_secure = smtpSecure
        this.smtp_username = smtpUsername
        this.smtp_password = smtpPassword
        this.message_title = messageTitle
        this.message_text = messageText

        if (!this.email)
            throw new Error(this.message_title + " : Email cannot be empty");

        if (!this.smtp_server)
            throw new Error(this.message_title + " : SMTP server cannot be empty");

        if (!this.smtp_port)
            this.smtp_port = 25;

        if (this.smtp_port < 0 || this.smtp_port > 65535)
           throw new Error(this.message_title + " : SMTP port must be between 0 and 65535");

        if (!this.smtp_secure)
            this.smtp_secure = false;

        if (!this.message_title)
            throw new Error(this.message_title + " : Message title cannot be empty");

        if (!this.message_text)
            throw new Error(this.message_title + " : Message text cannot be empty");
    }


    getRecipient() {
      return this.email
    }

    
    sendMessage() {  
      if (this.smtp_username) {
        var transport = Nodemailer.createTransport({
          host: this.smtp_server, port: this.smtp_port, secure: this.smtp_secure,
          auth: {
            user: this.smtp_username, 
            pass: this.smtp_password
          }
        });
      }
      else {
        var transport = Nodemailer.createTransport({
          host: this.smtp_server, port: this.smtp_port
        });
      }
  
      var mailOptions = {
        from: this.email, to: this.email, subject: this.message_title, text: this.message_text
      }
  
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new Error(error);
        }
      });  
    }
}