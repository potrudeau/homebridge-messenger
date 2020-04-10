# homebridge-messenger
This is a [Homebridge](http://homebridge.io) plugin which allow users to send messages from [HomeKit](https://developer.apple.com/homekit/).

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
An example featuring all services is available [here](https://github.com/oznu/homebridge-config-ui-x).

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