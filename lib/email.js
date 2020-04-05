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
    }

    isValid() {
        return true;
    }

    getRecipient() {
      return this.email
  }

    sendMessage() {
      if (this.isValid()) {
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
}