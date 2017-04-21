/* bug: user touches too fast. then, sth. breaks! --> utilize ready function (below)? */

$( document ).ready(function() {

    // entry page
    
    $("#entry").click(function() {
	$(this).fadeOut(500);
	$("#page1").fadeIn(500);
	//alternative way 1
	/* $(this).fadeOut(500, function() {
	   $("#page1").fadeIn(500);
	   * });*/
	//alternative way 2
	/* $(this).fadeToggle("slow", "linear");
	 * $("#page1").fadeToggle("slow", "linear");*/
    });

    // page 1
    
    $("#form1").submit(function(event) {
	event.preventDefault(); // to stop refreshing.. (actual submit action)
	
	// //Loading..
	//$("#page1-left").removeClass("bg-yellow blue").addClass("bg-purple white-70");
	//$("#page1-msg").removeClass("f6 f3-ns").addClass("f4 f2-ns");
	//$("#page1-msg").text("다운로드 중..");

	//go to Loading page...
	$("#page1").hide();
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
	    $("#page2").fadeIn(500);
	}.bind(this)); //-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    }

    // page 2

});
