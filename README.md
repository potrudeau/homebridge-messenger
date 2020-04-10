# homebridge-messenger
This is a [Homebridge](http://homebridge.io) plugin that allows users to send messages from [HomeKit](https://developer.apple.com/homekit/).

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
### Pushover
aaa
### Email

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
