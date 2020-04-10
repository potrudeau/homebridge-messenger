<p align="center">
    <img src="https://user-images.githubusercontent.com/1062160/79011991-45a1c680-7b33-11ea-9e34-ec5e9005f623.png" height="120"><br>
    <img src="https://user-images.githubusercontent.com/1062160/79012099-7da90980-7b33-11ea-99a3-c69c322e875e.png" hspace="10px">
    <img src="https://user-images.githubusercontent.com/1062160/79012203-c06ae180-7b33-11ea-81c3-ab43290011db.png" hspace="10px">    
</p>

<span align="center">

# homebridge-messenger
[![NPM version](https://img.shields.io/npm/v/homebridge-messenger?color=blue)](https://npmjs.com/package/homebridge-messenger)
[![GitHub issues](https://img.shields.io/github/issues/potrudeau/homebridge-messenger)](https://github.com/potrudeau/homebridge-messenger/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/potrudeau/homebridge-messenger)](https://github.com/potrudeau/homebridge-messenger/pulls)
[![Licence](https://img.shields.io/npm/l/homebridge-messenger?color=red)](LICENSE)

[Homebridge](http://homebridge.io) plugin which allow users to send messages from [HomeKit](https://developer.apple.com/homekit/).

</span>




## Features
The plugin supports the following technologies:
* [Pushover](https://pushover.net/)
* [SMTP email](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)

## Installation

**Option 1: Install via Homebridge Config UI X:**

Search for "messenger" in [homebridge-config-ui-x](https://github.com/oznu/homebridge-config-ui-x) and install `homebridge-messenger`.

**Option 2: Manually Install:**

```
sudo npm install -g homebridge-messenger
```

## Configuration

### Homebridge Config UI X
*Coming soon...*
### Pushover
```
"accessories": [
      {
          "accessory": "HomebridgeMessenger",
          "name": "Messenger",
          "services": {
              "pushover": {
                  "user": "your_user",
                  "token": "your_token"
              }
          },
          "messages": [
              {
                  "type": "pushover",
                  "name": "Pushover message",
                  "text": "This is a test",
                  "sound": "pushover",
                  "priority": 0
              },
              {
                  "type": "pushover",
                  "name": "Critical message",
                  "text": "This is important",
                  "sound": "magic",
                  "priority": 2
              }         
          ]
      }
  ]
```
### Email
```
"accessories": [
    {
        "accessory": "HomebridgeMessenger",
        "name": "Messenger",
        "services": {
            "email": {
                "recipient": "you_email@domain.com",
                "smtpServer": "smtp.domain.com",
                "smtpPort": 465,
                "smtpSecure": true,
                "smtpUsername": "your_username",
                "smtpPassword": "your_password"
            }
        },
        "messages": [
            {
                "type": "email",
                "name": "Test email",
                "text": "This is a test"
            }        
        ]
    }
]
```
### Advanced configuration
An example featuring **all services** is available [here](configuration-examples/advanced.example.json).

## Coming next
* Configuration using [homebridge-config-ui-x](https://github.com/oznu/homebridge-config-ui-x)
* Support for [Pushbullet](https://www.pushbullet.com)
* Support for [IFTTT](https://ifttt.com)
* Improved logging

## Credits
* [qbit/node-pushover](https://github.com/qbit/node-pushover) - library to send Pushover messages
* [nodemailer](https://github.com/nodemailer/nodemailer) - library to send SMTP emails

## License
The [homebridge-messenger](https://github.com/potrudeau/homebridge-messenger) plugin is released under the [MIT license](LICENSE).
