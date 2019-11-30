//when Get Articles is click, article info is pulled and notes button is generated.
$(document).on('click', '#submit', function () {
  $.getJSON("/api/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the article information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      //creates button for notes
      const noteInput = $('<button>');
      noteInput.text('Article Notes');
      noteInput.addClass('take-note');
      $('#articles').append(noteInput);
    }
  });
});

//when article notes is click, pop up for article notes is generated
// Whenever someone clicks article notes
$(document).on("click", ".take-note", function () {
 console.log('hi');
});