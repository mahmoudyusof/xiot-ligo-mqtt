# LIGO - MQTT Client

## MQTT
<p>MQTT is a service that allows iot developers to communicate with their devices or "things".</p>
<p>You can send and recieve messages from your hardware broker or you can use an online broker for testing purpouses like broker.mqttdashboard.com</p>


## Installation

* First get the project files from github <br>
```bash 
> git clone https://github.com/mahmoudyusof/xiot-ligo-mqtt.git
> cd xiot-ligo-mqtt
```

* Second install all dependencies<br>
```bash
> composer install
```

* Lastly run the app locally using PHP built in server<br>
```bash
php -S localhost:8000 -t public
```

> **NOTE** : if you intend to use apache you are 
> gonna gave to include a ".htaccess" file in the public 
> directory to specify the entry point of the app

### Web Servers

* PHP built in server<br>
  + run the command `php -S localhost:8000 -t public`
* Apache server
  + Make a file public/.htaccess containing the following code
    ```
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.php [QSA,L]
    ```

