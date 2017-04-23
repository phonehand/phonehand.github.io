/* bug: user touches too fast. then, sth. breaks! --> utilize ready function (below)? */

var g_oscMsg;

$( document ).ready(function() {

    // connect server
    var oscPort = new osc.WebSocketPort({
	url: "ws://52.78.239.112:5100", // amazonaws ec2 node.js server
	metadata: true
    });

    oscPort.open();

    oscPort.on("message", function (oscMsg) {
	if (oscMsg.address == "/rollcnt") $("#conmon-rollcnt").text(oscMsg.args[0].value); // dim led?

	if (oscMsg.address == "/seats")
	{
	    // console.log(oscMsg.args[0].value);
	    // console.log(oscMsg.args[1].value);
	    // console.log(".seats:nth(" + oscMsg.args[0].value + ")");
	    // console.log(oscMsg.args[1].value == 1)
	    $(".seats:nth(" + oscMsg.args[0].value + ")").prop("checked", (oscMsg.args[1].value == 1));
	}

    });

    // oscPort.
});
