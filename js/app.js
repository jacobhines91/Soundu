//  here's the code for the modal 
 $(document).ready(function() {
    //Fade in delay for the background overlay (control timing here)
    $("#bkgOverlay").delay(50).fadeIn(400);
    //Fade in delay for the popup (control timing here)
    $("#delayedPopup").delay(50).fadeIn(400);
  
    //Hide dialouge and background when the user clicks the close button
    $("#btnClose").click(function(e) {
      HideDialog();
      e.preventDefault();
    });
  });
  //Controls how the modal popup is closed with the close button
  function HideDialog() {
    $("#bkgOverlay").fadeOut(400);
    $("#delayedPopup").fadeOut(300);
  } 

  var tag = document.createElement('script');

  function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 1,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyBrTnWsxJkc3FQVGAcjmx35dAeP6BjyrSs");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}

$(document).ready(function() {
    //Fade in delay for the background overlay (control timing here)
    $("#bkgOverlay").delay(800).fadeIn(1800);
    //Fade in delay for the popup (control timing here)
    $("#delayedPopup").delay(800).fadeIn(1800);
  
    //Hide dialouge and background when the user clicks the close button
    $("#btnClose").click(function(e) {
      HideDialog();
      e.preventDefault();
    });
  });
  //Controls how the modal popup is closed with the close button
  function HideDialog() {
    $("#bkgOverlay").fadeOut(400);
    $("#delayedPopup").fadeOut(300);
  } 
    

 var subscribersBox = "";
 var songVideoDisplay;
 var buttonViewDisplay;
 var searchTerm = "";
 var suggestionPlaylist; 

 //Subscibersbox
//      It will collect the information and push it to Firebase
 //Initialize Firebase 
 


//A button that shows the updated number of subscribers that ties into Firebase:
//      This information is pulled from Firebase


// Initial Values
var email = ""; 
$("#userSubscribe").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    email = $("#email-input").val().trim(); 
    database.ref().set({
        email: email,
    });

}); 

// database.ref().on("value", function(snapshot) {
//     $("#subscriber-display").text(snapshot.val().subscribersBox);
//     // Handle the errors
// }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// }); 




//A click function where the user enters the name of a song and the function performs the following
//  1. pushes the name of the song into the database
//  3. pulls from Youtube API the corresponding video
//  4. pulls suggested playlist or suggested videos from Youtube API or Spotify 
//attatch click event to button 

var art2 = "lizzo"; //holds information from searchbar
var groupNumber = 0;
var apiKey = "MsUgoduW6xEiuD5coGCaCCW7KxTq5utB&areas=5";
//var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + art + "&MsUgoduW6xEiuD5coGCaCCW7KxTq5utB&locale=" + apiKey;
function ticketMaster(){
var queryURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=' + apiKey + "&keyword=" + art;
$.ajax({
 url: queryURL,
 method: "GET",
}).then(function (response) {
 console.log(response._embedded.events);
 console.log("Local Date: " + response._embedded.events[0].dates.start.localDate)
 for (var i = 0; i < response._embedded.events.length; i++) {
   var name = response._embedded.events[i].name;
   var url = response._embedded.events[i].url;
   var img = response._embedded.events[i].images[0].url;
   
   cardDiv = $("<div>");
   cardDiv.addClass("card col-md-3");
   newP = $("<p>");
   cardDiv.append(newP);
   //console.log("IMG: " + img);
   $("#tEvents", art2).append('<img src="' + img + '" alt="' + name + '" height="300" width="300"><br /><a target="_blank" href="' + url + '">' + name + '</a><br/>'); 
  }
  groupNumber++;
});
}
ticketMaster(); 

var art = ""; //holds information from searchbar
 var url = 'https://newsapi.org/v2/everything?' +
 'q=' + art + '&' +
 'from=2019-09-01&' +
 'sortBy=popularity&' +
 'apiKey=9882a349dd104bddae19e83cec0b94e4';
var req = new Request(url);
fetch(req)
.then(function(response) {
console.log(response.json());
function buildQuery() {
  var queryURL = 'https://newsapi.org/v2/everything?';
  var queryParams = {"api-key": "9882a349dd104bddae19e83cec0b94e4"};
  queryParams.q = $("#search-term")
  .val()
  .trim();
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}
function updatePage(newsData) {
  // Get from the form the number of results to display
  // API doesn't have a "limit" parameter, so we have to do this ourselves
  var numArticles = $("#article-count").val();

  // Log the NYTData to console, where it will show up as an object
  console.log(newsData);
  console.log("------------------------------------");
  for (var i = 0; i < numArticles; i++) {
    // Get specific article info for current index
    var article = NYTData.response.docs[i];

    // Increase the articleCount (track article # - starting at 1)
    var articleCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
    var $articleList = $("<ul>");
    $articleList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#article-section").append($articleList);

    
    var headline = article.headline;
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline && headline.main) {
      console.log(headline.main);
      $articleListItem.append(
        "<span class='label label-primary'>" +
          articleCount +
          "</span>" +
          "<strong> " +
          headline.main +
          "</strong>"
      );
    }

    var byline = article.byline;

    if (byline && byline.original) {
      console.log(byline.original);
      $articleListItem.append("<h5>" + byline.original + "</h5>");
    }

    // Log section, and append to document if exists
    var section = article.section_name;
    console.log(article.section_name);
    if (section) {
      $articleListItem.append("<h5>Section: " + section + "</h5>");
    }

    // Log published date, and append to document if exists
    var pubDate = article.pub_date;
    console.log(article.pub_date);
    if (pubDate) {
      $articleListItem.append("<h5>" + article.pub_date + "</h5>");
    }

    // Append and log url
    $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
    console.log(article.web_url);

    // Append the article
    $articleList.append($articleListItem);
  }
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#search-term").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);

})

//when button is clicked the function named callerFunction will execute


//function to do stuff related to Spotify
function youtubeLogic()
{
    // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  // The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }
    
}
//songVideoDisplay that pulls up must popular video related to the song pulled from You Tube API


//songNewsDisplay pulls up the following items from the News API and appends it on the page
        

//buttonViewDisplay shows the last ten searches that was entered by users
$(function(){
  populateButtons(topics, 'searchform', '#buttonview');
})
var topics = ["Sade", "Adele", "Alicia Keys", "NF", "John Legend", "Billie Eilish"];
function populateButtons(topics, classToAdd, areaToAddTo){
  $(areaToAddTo).empty();
  for(var i = 0; i < topics.length; i++){
      var a = $('<button>');
      a.addClass(classToAdd);
      a.attr('data-type', topics[i]);
      a.text(topics[i]);
      $(areaToAddTo).append(a);
  }
}
//SuggestionPlaylist/Video from the Spotify or Youtube API
//Based on the song name entered by the user this will display either the name of four songs they shoud try or four videos they should look at