//when Get Articles is click, article info is pulled and notes button is generated.
$(document).on('click', '#submit', function () {
  $.getJSON("/api/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the article information on the page
      //console.log(data[i].title);
      //const date = date[i].timestamp;
      const nameTitle = data[i].title;
      const srcInfo = data[i].link;
      const dataId = data[i]._id;
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      //creates button for notes
      const noteInput = $('<button>');
      noteInput.text(' Take Article Notes');
      noteInput.attr('name', nameTitle);
      noteInput.attr('data-id', dataId);
      noteInput.addClass('take-note');
      $('#articles').append(noteInput);
      //creates button to read notes
      const noteReview = $('<button>');
      noteReview.text('Review Notes');
      noteReview.addClass('getnote');
      $('#articles').append(noteReview);
      //close button to hide notes
      const close = $('<button>');
      close.text('Close Notes');
      close.addClass('hide');
      $('#articles').append(close);
      //delete button
      const remove = $('<button>');
      remove.text('Delete Notes');
      remove.addClass('delete');
      $('#articles').append(remove);
    }
  });
});

//when article notes is click, pop up for article notes is generated
// Whenever someone clicks article notes
$(document).on("click", ".take-note", function () {
  console.log(event.target.name);
  const title = event.target.name;
  //shows notes display when kicked
  $('#notes').show();
  const titleUpdate = $('.notes-title').text("Title: " + title);
});
//sends note info to db
$(document).on("click", "#savenote", function () {
  const dataIdEvent = $('.take-note').attr('data-id');
  console.log(dataIdEvent);
  // ajax call for note update
  $.ajax({
    method: "POST",
    url: "/api/articles/" + dataIdEvent,
    data: {
      body: $('#notes-body').val()
    }
  })
  //make this append to a new div and add a button event
  //that listens to when the button is clicked to show notes
  $('form').trigger('reset');
  alert('Notes have been added to the db');
});

$(document).on('click', '.getnote', function () {
  const dataIdEvent = $('.take-note').attr('data-id');
  console.log(dataIdEvent);
  // ajax call for note update
  $.getJSON("/api/articles/" + dataIdEvent, (data) => {
    //Notes display
    console.log(data.note.body);
    const note = data.note.body;
    const noteDisplay = $('<p><strong> Notes:</strong> ' + note + '</p>');
    noteDisplay.addClass('notes-output');
      $('#notes-display').append(noteDisplay);
      $('#notes-display').show();
  })
}); //end of button click event
//close event
$(document).on('click', '.hide', function () {
  $('#notes-display').hide();
});

$(document).on("click", ".delete", function () {
  const dataIdEvent = $('.take-note').attr('data-id');
  console.log(dataIdEvent);
  // ajax call for note update
  $.ajax({
    method: "PUT",
    url: "/api/articles/" + dataIdEvent
  }).then((data) => {
    console.log(data);
  });
  $('#notes-display').append("THIS NOTE HAS BEEN DELETED FROM THE DATABASE");
});