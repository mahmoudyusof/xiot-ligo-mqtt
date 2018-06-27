var client;
$(document).ready(()=>{
    var con = $("#con-form");
    con.on("submit", (e) => {
        e.preventDefault();
        loader("con-status");
        var host = $("#host").val();
        var port = parseInt($("#port").val());
        var username = $("#username").val();
        var password = $("#password").val();
        var clientId = $("#cid").val();
        if (clientId === ""){
            clientId = "randomness";
        }
        client = new Paho.MQTT.Client(host, port, clientId);
        var options = {
            timeout: 3,
            onSuccess: () => {
                $("#con-status").attr("class", "text-success");
                $("#con-status").text("Connected");
                document.getElementById("sub-btn").removeAttribute("disabled");
                document.getElementById("pub-btn").removeAttribute("disabled");
            },
            onFailure: (res) => {
                $("#con-status").attr("class", "text-danger");
                $("#con-status").text("Connection failed: " + res.errorMessage);
            },
            useSSL: true
        }
        if (username !== "" && password !== ""){
            options.userName = username;
            options.password = password;
        }
        client.connect(options);
        client.onConnectionLost = (res) => {
            $("#con-status").attr("class", "text-danger");
            $("#con-status").text("Connection failed: " + res.errorMessage);
            document.getElementById("sub-btn").setAttribute("disabled");
            document.getElementById("pub-btn").setAttribute("disabled");
        };
        client.onMessageArrived = (msg) => {
            makeMessage(msg.payloadString, msg.destinationName, msg.qos, msg.retained);
        };
    });


    var sub = $("#sub-form");
    sub.on("submit", (e) => {
        e.preventDefault();
        loader("sub-status");
        var topic = $("#topic").val();
        var qos = parseInt($("#qos").val());
        try{
            if(client.isConnected){
                client.subscribe(topic, {qos: qos});
                addSub(topic, qos);
                $("#sub-status").attr("class", "text-success");
                $("#sub-status").text("Successful");
            }else{
                $("#sub-status").attr("class", "text-danger");
                $("#sub-status").text("Connect and try again");
            }
        }catch(e){
            $("#sub-status").attr("class", "text-danger");
            $("#sub-status").text("Something went wrong. Please reconnect and try again");
        }
    });

    var pub = $("#pub-form");
    pub.on("submit", (e) => {
        e.preventDefault();
        loader("pub-status");
        var pub_topic = $("#pub-topic").val();
        var pub_qos = parseInt($("#pub-qos").val());
        var payload = $("#payload").val();
        var message = new Paho.MQTT.Message(payload);
        message.destinationName = pub_topic;
        message.qos = pub_qos;
        try{
            client.send(message);
            $("#pub-status").attr("class", "text-success");
            $("#pub-status").text("Published");
        }catch (e){
            $("#pub-status").attr("class", "text-danger");
            $("#pub-status").text("Something went wrong. Please reconnect and try again");
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
    `;
    $("#messages").prepend(message);
}


function addSub(topic, qos){
    var sub = document.createElement("div");
    sub.className = "message px-3 pb-3";
    sub.innerHTML = `
        <button type="button" class="close" data-dismiss="sub" onclick="unsub(this)" id="${topic}" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <div class="msg-info mb-2">
            <span class="text-muted">qos: ${qos}</span>
        </div> 
        <div class="payload">
            ${topic}
        </div>
    `;

    $("#subs").append(sub);
}

function unsub(element){
    try{
        client.unsubscribe(element.id);
        var sub = element.parentElement;
        var parent = sub.parentElement;
        parent.removeChild(sub);
    }catch (e){
        alert("Something went wrong. Please reconnect and try again");
    };
};


function loader(id) {
    var wheel = document.createElement("div");
    var element = document.getElementById(id);
    wheel.className = "wheel";
    element.innerHTML = wheel.outerHTML;
    console.log(element);
}
