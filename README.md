# mongo-webscraper
Purpose:  Use a webscraper to collect data and store them in a DB:

**Technologies**: Node.js, Express.js, Express-Handlebars, MongoDB, Mongoose, Cheerio, jQuery.

**Behavior expectation**: A user should be able to click the "Get Articles" button and get recent articles from the New York Times. This is acomplished by using a webscraper package for node called Cheerio. Next a user should be able to click the "Take Article Notes" button and have a form with Text Area input to add notes. When clicking the submit button, the notes will be added to the DB matching what the user's input was. If a user wants to review their notes, they can click the "Review Notes" button and their notes will appear in the section above all the article output. A user can also delete the notes from the DB by clicking the "Delete Notes" button. When clicking the "Delete Notes" button, text will appear that says the notes have been deleted from the DB. 

**Current bugs**: If you click the review notes button multiple times, it will duplicate text. This is likely due to how notes from the DB are appended in jQuery. 

Link to the deployed website: https://blooming-plateau-36113.herokuapp.com/
