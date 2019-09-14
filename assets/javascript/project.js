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

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '720',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //   setTimeout(stopVideo, 6000);
      done = true;
    }
  
  function stopVideo() {
    player.stopVideo();
  }

 var subscribersBox;
 var songVideoDisplay;
 var songInfoDisplay;
 var buttonViewDisplay;
 var searchForm;
 var suggestionPlaylist; 

 //Subscibersbox
//      It will collect the information and push it to Firebase
var firebaseConfig = {
   apiKey: "AIzaSyDlYwHyxg0A4YGrUzMk3kfvA1f_P0pwths",
   authDomain: "soundu-252416.firebaseapp.com",
   databaseURL: "https://soundu-252416.firebaseio.com",
   projectId: "soundu-252416",
   storageBucket: "soundu-252416.appspot.com",
   messagingSenderId: "584865752117",
   appId: "1:584865752117:web:cf0364417fde91031ebd7c"
 };
 //Initialize Firebase 
 firebase.initializeApp(firebaseConfig);


//A button that shows the updated number of subscribers that ties into Firebase:
//      This information is pulled from Firebase
var database = firebase.database();

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

database.ref().on("value", function(snapshot) {
    $("#subscriber-display").text(snapshot.val().name);
    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
}); 




//A click function where the user enters the name of a song and the function performs the following
//  1. pushes the name of the song into the database
//  2. pulls from Spotify API the corresponding information
//  3. pulls from Youtube API the corresponding video
//  4. pulls suggested playlist or suggested videos from Youtube API or Spotify 
//attatch click event to button 

var art = ""; //holds information from searchbar
var apiKey = "MsUgoduW6xEiuD5coGCaCCW7KxTq5utB";
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
   //console.log("IMG: " + img);
   $("#tEvents").append('<img src="' + img + '" alt="' + name + '" height="100" width="200"><br /><a target="_blank" href="' + url + '">' + name + '</a><br/>');
   }
});
}
ticketMaster();
//when button is clicked the function named callerFunction will execute
// $("#searchButton").on("click", callerFunction) 

//     var apiKey =
//     "AIzaSyAIoEkZKCQsiKQxcZoILrzqCmYZjFqGOzI"; 
//     var searchTerm = $(this).val();
//     var url = searchTerm + apikey;

//     $.ajax({
//     url: queryURL,
//     method: "GET",
// });

//     var apiKey = 
// // api key goes here 
//     searchTerm = $(this).val();
// // var url = searchTerm + apikey(idk the api key yet)

//     $.ajax({
//     url: queryURL,
//     method: "GET",
// });


//function that runs when button is clicked, it only calls other functions
function callerFunction( )
{
	//call function which has YouTube logic
  youtubeLogic();
 // spotifyLogic(input)


  }
 function spotifyLogic(){
    //call function which has Spotify logic
    //spotifyLogic(){
      
      $.ajax({
        method: "GET",
        url: `https://api.spotify.com/v1/search?q=track:antarctica&type=track&album`
      }).done(function(data) {
        console.log(data);
      }
    );
    }
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

// styles the search bar...still trying to figure out how to do this 


//songVideoDisplay that pulls up must popular video related to the song pulled from You Tube API


//songInfoDisplay pulls up the following items from the Spotify API
            //Items to be displayed: 1. Name of the Artist 2. Release Date 3. Popularity 4. Genre 5. Album Type

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


