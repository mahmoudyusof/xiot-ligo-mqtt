$(document).ready(()=>{
    var client;
    var con = $("#con-form");
    con.on("submit", (e) => {
        e.preventDefault();
        var host = $("#host").val();
        var port = parseInt($("#port").val());
        client = new Paho.MQTT.Client(host, port, "dfksjdh");
        var options = {
            timeout: 3,
            onSuccess: () => {
                $("#con-status").text("Connected");
            },
            onFailure: () => {
                $("#con-status").text("Connection failed: " + message.errorMessage);
            },
        }
        client.connect(options);
        client.onMessageArrived = (msg) => {
            $("#messages").prepend(msg.payloadString + "<br>");
        };
        console.log(client);
    });


    var sub = $("#sub-form");
    sub.on("submit", (e) => {
        e.preventDefault();
        var topic = $("#topic").val();
        var qos = parseInt($("#qos").val());
        try{
            if(client.isConnected){
                client.subscribe(topic, {qos: qos});
                $("#sub-status").text("Successful");
            }else{
                $("#sub-status").text("Connect and try again");
            }
        }catch(e){
            $("#sub-status").text(e);
        }
    });

    var pub = $("#pub-form");
    pub.on("submit", (e) => {
        e.preventDefault();
        var pub_topic = $("#pub-topic").val();
        var pub_qos = parseInt($("#pub-qos").val());
        var payload = $("#payload").val();
        var message = new Paho.MQTT.Message(payload);
        message.destinationName = pub_topic;
        message.qos = pub_qos;
        try{
            client.send(message);
            $("#pub-status").text("sent");
        }catch (e){
            $("#pub-status").text(e);
        }
    });

});

