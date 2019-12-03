//when Get Articles is click, article info is pulled and notes button is generated.
$(document).on('click', '#submit', function () {
  $.getJSON("/api/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the article information on the page
      //console.log(data[i].title);
      const nameTitle = data[i].title;
      const srcInfo = data[i].link;
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      //creates button for notes
      const noteInput = $('<button>');
      noteInput.text('Article Notes');
      noteInput.attr('name', nameTitle);
      noteInput.addClass('take-note');
      $('#articles').append(noteInput);
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

$(document).on("click", "#savenote", function() {
  $('form').trigger('reset');
  alert('Notes have been added to the db');
});
