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
                $("#con-status").attr("class", "text-success");
                $("#con-status").text("Connected");
            },
            onFailure: () => {
                $("#con-status").attr("class", "text-danger");
                $("#con-status").text("Connection failed: " + message.errorMessage);
            },
        }
        client.connect(options);
        client.onMessageArrived = (msg) => {
            makeMessage(msg.payloadString, msg.destinationName, msg.qos, msg.retained);
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
                $("#sub-status").attr("class", "text-success");
                $("#sub-status").text("Successful");
            }else{
                $("#sub-status").attr("class", "text-danger");
                $("#sub-status").text("Connect and try again");
            }
        }catch(e){
            $("#sub-status").attr("class", "text-danger");
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
            $("#pub-status").attr("class", "text-success");
            $("#pub-status").text("sent");
        }catch (e){
            $("#pub-status").attr("class", "text-danger");
            $("#pub-status").text(e);
        }
    });
});

function makeMessage(msg, topic, qos, retained){
    var message = document.createElement("div");
    message.className = 'message px-3 pb-3';
    message.innerHTML = `
    <div class="msg-info mb-2">
        <span class="text-muted">topic: ${topic}</span>
        <span class="text-muted">qos: ${qos}</span>
        <span class="text-muted">retined: ${retained}</span>
    </div>
    <div class="payload">
        ${msg}
    </div>
    `
    $("#messages").prepend(message);
}



