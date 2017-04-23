/* bug: user touches too fast. then, sth. breaks! --> utilize ready function (below)? */

//debug
var g_evt;

$( document ).ready(function() {

    // connect server
    var oscPort = new osc.WebSocketPort({
	url: "ws://52.78.239.112:5300", // amazonaws ec2 node.js server
	metadata: true
    });

    oscPort.open();

    oscPort.on("ready", function () {
	oscPort.on("message", function (oscMsg) {
	    if (oscMsg.address == "/rollcnt") $("#rollcnt").text(oscMsg.args[0].value); // dim led?
	});
    });

    // reserve seat page

    $("#selseat").submit(function(event) {
	event.preventDefault(); // to stop refreshing.. (actual submit action)

	// //check data
	// g_evt = event;
	// // if (event.

	// // var tid = setInterval(function () {
	//     oscPort.send({
	// 	address: "/occupy",
	// 	args: [{ type: "f", value: 10 }]
	//     });
	// // }, 500);

	// //if ok..
	
	//go to Loading page...
	$("#resvseat").hide();
	$("#loading").show();

	//load data
	reserveseat();
    });

    // loading page
    
    var player1;
    function reserveseat()
    {
	player1 = new Tone.Player({ "url" : "./audio/01.mp3" }).toMaster();
	Tone.Buffer.on("load", function(){
	    $("#loading").fadeOut(500);
	    $("#play1").fadeIn(500);
	}.bind(this));
	//-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    }

    // player session #1

    //initial state
    var playing1 = 0;
    $('#playbtn #path4493').show();
    $('#playbtn #rect8475').hide();
    $('#playbtn #rect8475-3').hide();
    
    $('#playbtn').click(function() {
	if (playing1 == 0) {
	    playing1 = 1;
	    playstart1();
	} else if (playing1 == 1) {
	    playing1 = 0;
	    playstop1();
	}
    });

    function playstart1() {
	player1.start();
	// btn shape change.
	$('#playbtn #path4493').hide();
	$('#playbtn #rect8475').show();
	$('#playbtn #rect8475-3').show();

	var p1id = setInterval(function() {
	    if(player1.state == "stopped") {
		playstop1();
		clearInterval(p1id);
	    }
	}, 500);
    }

    function playstop1() {
	player1.stop();
	// btn shape change.
	$('#playbtn #path4493').show();
	$('#playbtn #rect8475').hide();
	$('#playbtn #rect8475-3').hide();
    }

});
