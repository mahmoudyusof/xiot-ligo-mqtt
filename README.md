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
    > **NOTE**: The .htaccess file already exists and set for using appache so no need to worry about it

<br><br>
> **NOTE**<br>
> If you try to connect and the app seems to halt, you might want to refresh the page and try again. this is very unlikely to happen.
> 
> Make sure you're on http:// not https:// as most websocket requests are in ws:// not wss:// and if you have an ssl certificate it won't allow for ws requests.

**Author:**&nbsp;&nbsp;&nbsp; Mahmoud Youssef @ &lt; mahmoud.yusof27@gmail.com &gt;