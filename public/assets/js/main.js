var client;
$(document).ready(()=>{

    $("#cid").val(genId());

    var con = $("#con-form");
    con.on("submit", (e) => {
        e.preventDefault();
        loader("con-status");
        var host = $("#host").val();
        var port = parseInt($("#port").val());
        var username = $("#username").val();
        var password = $("#password").val();
        var clientId = $("#cid").val();

        // this part is for last will and testament
        var lwtopic = $("#lwtopic").val();
        var lwmsg = $("#lwmsg").val();

        if(lwt !== "" && lwmsg !== ""){
            var lwqos = parseInt($("#lwqos").val());
            var lwretain = $("#lwretain").val();
            if(lwretain == "on"){
                lwretain = true;
            }else{
                lwretain = false;
            }
            
            var lwt = new Paho.MQTT.Message(lwmsg);
            lwt.qos = lwqos;
            lwt.retained = lwretain;
            lwt.destinationName = lwtopic;
        }
        // ends here


        // this part is form connection

        if (clientId === ""){
            clientId = genId();
        }
        client = new Paho.MQTT.Client(host, port, clientId);
        var options = {
            timeout: 3,
            onSuccess: () => {
                $("#con-status").attr("class", "text-success");
                $("#con-status").text("Connected");
                document.getElementById("discon").removeAttribute("disabled");
                document.getElementById("sub-btn").removeAttribute("disabled");
                document.getElementById("pub-btn").removeAttribute("disabled");
            },
            onFailure: (res) => {
                $("#con-status").attr("class", "text-danger");
                $("#con-status").text("Connection failed: " + res.errorMessage);
            }
        }
        if (username !== "" && password !== ""){
            options.userName = username;
            options.password = password;
        }

        // just a little piece for lw

        try{
            if(lwt){
                options.willMessage = lwt;
            }
        }catch(err){}

        // and the little piece ends here

        try{
            client.connect(options);
        }catch (e){
            $("#con-status").attr("class", "text-danger");
            $("#con-status").text("Failed to connect. Please try again.");
            // console.log(e);
        }
        client.onConnectionLost = (res) => {
            $("#con-status").attr("class", "text-danger");
            $("#con-status").text("Disconnected");
            document.getElementById("discon").setAttribute("disabled", "true");
            document.getElementById("sub-btn").setAttribute("disabled", "true");
            document.getElementById("pub-btn").setAttribute("disabled", "true");
            try{
                delete options.willMessage;
            }catch (e) {}
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
    pub.submit((e) => {
        e.preventDefault();
        loader("pub-status");
        var pub_topic = $("#pub-topic").val();
        var pub_qos = parseInt($("#pub-qos").val());
        var payload = $("#payload").val();
        var retain = $("#retain").val();
        if(retain == "on"){
            retain = true;
        }else{
            retain = false;
        }
        var message = new Paho.MQTT.Message(payload);
        message.destinationName = pub_topic;
        message.qos = pub_qos;
        // console.log(retain);
        message.retained = retain;
        try{
            client.send(message);
            $("#pub-status").attr("class", "text-success");
            $("#pub-status").text("Published");
        }catch (e){
            $("#pub-status").attr("class", "text-danger");
            $("#pub-status").text("Something went wrong. Please reconnect and try again");
        }
    });

    $("#discon").on("click", (e) => {
        try{
            client.disconnect();
        }catch(err){
            alert(err);
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
    // console.log(element);
}


function genId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return "ligoId-" + text;
}


