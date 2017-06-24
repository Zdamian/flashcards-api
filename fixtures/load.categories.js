var mongoose = require('mongoose');

var Category = require('../model/Category');

mongoose.connect('mongodb://localhost/flashcard_db');

var categories = [
    "home", "eating", "family", "weather", "work"
];

categories.forEach(function(category) {
    var newCategoty = new Category({
        name: category
    });

    newCategoty.save(function(err, entity) {
        if (err) {
            console.log(err)
        } else {
            console.log('saved: ' + entity);
        }
    });
});
