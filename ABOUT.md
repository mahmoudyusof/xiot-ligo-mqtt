# LIGO - MQTT

### Description
LIGO-MQTT is an app made for IOT developers so that they can connect to thier IOT devices (brokers) through websockets.<br>
By connecting to your device (broker) through LIGO-MQTT you can then transmit messages or commands or subscribe to certain topics and receive data from your device, like sensor data.<br>
* * *

### Used technologies and process
* **Paho-JS** <br>
    The reason for picking this library is that it works on the client side of the app meaning that the client who made the subscribed client is the client who recieves all the data and that the data wouldn't go to the server unless I want so, and this is where the other part of the app comes into play.

* **LIGO Framework**<br>
    Ligo is a PHP MVC framework developed by me and I used it because I wanted to test it a bit and because if I ever want to expand the app and use server side functionality like database storage, ligo is gonna make that easy for me ["LIGO on Github"](https://github.com/mahmoudyusof/LIGO/).<br>

* * *
### Journey
Many approches were taken to accomplish this task as I have tried more than one language to make this app.
* **Python**<br>
    First language to choose, because I was discovering new features in django and I really wanted to use it.<br>
    found out about the paho-mqtt module, installed it, used it in connection and succeeded, used it in transmitting messages and succeeded and used it in receiving messages and succeeded, but the problem was in the web socket module. seemed to throw a module not found error that I couldn't solve, so I decided to change the plan.

* **node.js**<br>
    I wanted to use it because I wanted to learn more about the MEAN stack and I thought this might be a great opportunity.<br>
    I have succeeded in nearly every thing, but I've faced a problem that I still think I can solve it. The express server recieves the message but then if I broadcast it through socket.io, subscribed users and unsubscribed users would get it, so the solution is to make private sockets and send the message of topic X through sockets of users subscribed to this topic, but I then found out about paho-js and thought I might give this a go.

* **paho-js**<br>
    Since it works on the client side and uses ws automatically, I didn't have to worry about the problems I've faced with node.js.<br>
    Still, I needed to use a server side language to allow for expanding the app later on and I thought this might be a good opportunity to bring ligo to life.<br>
    Plus I don't think Heroku hosts static pages.
    

### Experience
I have gained a ton of experience throughout this process. This was the first time I use express and websockets. I have also learned about django websockets which is great because I intend to use django for personal business in the future and using websockets with it is gonna be great. I have reinforced my experience with AJAX and JQuery as well, so really thanks for giving me this challenge :).
