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
var name = "";
var email = ""; 
$("#userSubscribe").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim(); 
    database.ref().set({
        name: name,
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

// styles the search bar...still trying to figure out how to do this 


//songVideoDisplay that pulls up must popular video related to the song pulled from You Tube API


//songInfoDisplay pulls up the following items from the Spotify API
            //Items to be displayed: 1. Name of the Artist 2. Release Date 3. Popularity 4. Genre 5. Album Type

//buttonViewDisplay shows the last ten searches that was entered by users

//SuggestionPlaylist/Video from the Spotify or Youtube API
            //Based on the song name entered by the user this will display either the name of four songs they shoud try or four videos they should look at


