# Change Log

All notable changes to this project will be documented in this file. This project uses [Semantic Versioning](https://semver.org/).

## 0.0.6 (2020-04-26)

### Bug fixes
* Bug fixe when Pushover device is not provided. ([#6](https://github.com/potrudeau/homebridge-messenger/issues/6))

## 0.0.5 (2020-04-24)

### Features

* **IFTTT messages :** Added support for [IFTTT Webhooks](https://ifttt.com/maker_webhooks). ([#1](https://github.com/potrudeau/homebridge-messenger/issues/1))
* **Pushover messages :** Added Url and Url Title properties for Pushover messages. Also, Pushover messages now supports HTML code, as permitted by the Pushover [API](https://pushover.net/api). ([#3](https://github.com/potrudeau/homebridge-messenger/issues/3))

### Bug fixes
* Remove all spaces from "device" property of Pushover messages. The spaces were not allowing message to be sent to multiple devices. ([#4](https://github.com/potrudeau/homebridge-messenger/issues/4))

## 0.0.4 (2020-04-21)

### Features

* **Pushover messages :** Added [Device](https://pushover.net/api#identifiers) property.

## 0.0.3 (2020-04-19)

### Features

* **Caching for main switch :** The main switch now keeps its status (ON/OFF) after a Homebridge restart.

## 0.0.2 (2020-04-13)

### Features

* **Support for Homebridge Config UI X :** Homebridge-messenger is now compatible with [Plugin Settings GUI](https://github.com/oznu/homebridge-config-ui-x/wiki/Developers:-Plugin-Settings-GUI).
* **Email messages :** Added default value for SMTP port (25).
* **Logging :** Added more logging when loading plugin.

## 0.0.1 (2020-04-09)

### Features

* **Initial release:** : Basic support for Pushover messages and emails!
