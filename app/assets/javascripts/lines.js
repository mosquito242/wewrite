/**
	LINES JS
	ALL THE COOL AJAX JAVASCRIPT WILL GO HERE

	doesn't work sometimes on first pageload.
*/




function setUp() {
	setUpNextLines();
	setUpStoryLines();
	setUpNewLineLink();

}

function setUpNextLines() {
	$(".select-next-line").click(function(evt) {
		evt.preventDefault();
		// console.log($(this).text());
		// console.log($(this).parent().data("id"));
		console.log("next line selected: " + $(this).text());
		var line = $(this).text();
		var line_id = $(this).parent().data("id");

		var html = $("<span class='story-line' data-id='" + line_id + "'><a href='#' class='story-line'>" + line + "</a> </span>").hide().fadeIn(500);

		$("#story").append(html);


		var url = "/lines/" + line_id + "/select_next";
		$.ajax({
			url: url
		}).done(function(data) {

			handleSelectNextResponse(data, line, line_id);



		});


	});
}


function setUpStoryLines() {
	$("a.story-line").click(function(evt) {
		evt.preventDefault();
		console.log("old story clicked");
		var line = $(this).text();
		var line_id = $(this).parent().data("id");
		$(this).parent().nextAll('span').fadeOut(500, function() { $(this).remove();}); 

		var url = "/lines/" + line_id + "/select_next";
		$.ajax({
			url: url
		}).done(function(data) {
			handleSelectNextResponse(data, line, line_id);
		});

	})
}

function setUpNewLineLink() {
	$(".new-line-link").click(function(evt) {
		evt.preventDefault();
		console.log("creating new line");
		var line_id = $("#story span").last().data("id");
		var m_url = "/lines/new?previous_line_id=" + line_id + "&ajax=1";

		$.ajax({
			url: m_url
		}).done(function(data) {
			$(".new-line-box").html(data);
		});
	});

}


//Handle response from lines#select_next
function handleSelectNextResponse(data,line, line_id) {
	//if there are next lines, then replace the next-lines ul
	console.log(data);
	$("#next-steps").html(data);
	console.log("Updated dom");
	// if(data.length > 0) {
	// 	console.log(data);
	// 	html = "<div id='next-steps'><div class='mini-box'>Next Lines: <ul id='next-lines'>";

		

	// 	for(var i=0;i < data.length; i++) {
	// 		console.log(data[i]);
	// 		var text = data[i].text;
	// 		var new_id = data[i].id;
	// 		html = html + "<li data-id='" + new_id + "'><a href='#' class='select-next-line'>" + text + "</a></li>";
	// 	}

	// 	html = html + "</ul></div><div class='new-line-box'><a href='#' class='new-line-link'>+ Add new line</a></div>";
	// 	html = html + "</div>";
	// 	$("#next-steps").html(html);
	// 	// $('#next-steps').fadeOut(500, function() {
	// 	//   $(this).html(html).fadeIn(500);
	// 	// });


	// }
	
	// //if there are no next lines, replace the next-steps div to just hold the "add a new line div"
	// else {
	// 	console.log(data);

	// 	html = "<div class='new-line-box'><a href='#' class='new-line-link'>The story ends here, or does it? .... + Add new line</a></div>";
	// 	$("#next-steps").html(html);



	// }
	setUp();
	window.history.pushState('page', "WeWrite - " + line, '/lines/' + line_id);

}

function setTweet() {

	document.getElementById("line_tweet").value = "true";
}

$(document).ready(function() {

	console.log("JS Running");
	setUp();
	console.log("JS Ran");

});


