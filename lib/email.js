"use strict";

var Nodemailer = require('nodemailer');

module.exports = class EmailMessenger {
    constructor(emailRecipient, smtpServer, smtpPort, smtpSecure, smtpUsername, smtpPassword, messageTitle, messageText, messageRecipients) {
        this.default_email = emailRecipient
        this.smtp_server = smtpServer
        this.smtp_port = smtpPort
        this.smtp_secure = smtpSecure
        this.smtp_username = smtpUsername
        this.smtp_password = smtpPassword
        this.message_title = messageTitle
        this.message_text = messageText
        this.message_recipients = messageRecipients

        if (!this.default_email)
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
      if (this.message_recipients)
        return this.message_recipients;
      else 
        return this.default_email;
    }

    
    sendMessage() {  

      if (this.smtp_username) {
        var transport = Nodemailer.createTransport({
          host: this.smtp_server, port: this.smtp_port,
          auth: {
            user: this.smtp_username, pass: this.smtp_password
          },
          tls: {          
            requireTLS: this.smtp_secure
          }          
        });
      }
      else {
        var transport = Nodemailer.createTransport({
          host: this.smtp_server, port: this.smtp_port
        });
      }
        
      var mailOptions = {      
        from: this.default_email, to: this.getRecipient(), subject: this.message_title, text: this.message_text
      }
  
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new Error(error);
        }
      });  
    }
}