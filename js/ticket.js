var page = 0; 



function getEvents(page) {
  $("#events-panel").show();
  $("#attraction-panel").hide();
  var searchInput = $("#search").val();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getEvents.json.page.totalPages-1) {
      page=0;
    }
  }
  
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + searchInput + "&apikey=pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz&size=4&page="+ page,
    async:true,
    dataType: "json",
    success: function(json) {
          getEvents.json = json;
          showEvents(json);
         },
    error: function(xhr, status, err) {
          console.log(err);
         }
  });
}

function showEvents(json) {
  var items = $("#events .list-group-item");
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
    try {
      item.children(".venue").text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    item.off("click");
    item.click(events[i], function(eventObject) {
      console.log(eventObject.data);
      try {
        getAttraction(eventObject.data._embedded.attractions[0].id);
      } catch (err) {
      console.log(err);
      }
    });
    item=item.next();
  }
}

$("#prev").click(function() {
  getEvents(--page);
});

$("#next").click(function() {
  getEvents(++page);
});

function getAttraction(id) {
  $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions/K8vZ91713wV?locale=en-us.json?apikey=MsUgoduW6xEiuD5coGCaCCW7KxTq5utB&areas=5",
    async:true,
    dataType: "json",
    success: function(json) {
          showAttraction(json);
         },
    error: function(xhr, status, err) {
          console.log(err);
         }
  });
}

function showAttraction(json) {
  $("#events-panel").hide();
  $("#attraction-panel").show();
  
  $("#attraction-panel").click(function() {
    getEvents(page);
  });
  
  $("#attraction .list-group-item-heading").first().text(json.name);
  $("#attraction img").first().attr('src',json.images[0].url);
  $("#classification").text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
}

getEvents(page);

$(document).ready(function() {

    $("#search-btn").on('click', function() {
        event.preventDefault();
        searchEvents();
    })

    function searchEvents() {
        var searchInput = $("#search").val();

        $.ajax({
            url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + searchInput + "&apikey=pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz&size=4&page=3",
            method: "GET"
          }).then(function(json) {
              console.log(json);
              showEvents(json);
          })
    }


    function showEvents(json) {
        var items = $("#events .list-group-item");
        items.hide();
        var events = json._embedded.events;
        var item = items.first();
        for (var i=0;i<events.length;i++) {
          item.children('.list-group-item-heading').text(events[i].name);
          item.children('.list-group-item-text').text(events[i].dates.start.localDate);
          try {
            item.children(".venue").text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
          } catch (err) {
            console.log(err);
          }
          item.show();
          item.off("click");
          item.click(events[i], function(eventObject) {
            console.log(eventObject.data);
            try {
              getAttraction(eventObject.data._embedded.attractions[0].id);
            } catch (err) {
            console.log(err);
            }
          });
          item=item.next();
        }
      }
// END of jQuery
})


