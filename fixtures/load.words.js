var mongoose = require('mongoose');

var Category = require('../model/Category');
var Word = require('../model/Word');

mongoose.connect('mongodb://localhost/flashcard_db');

var words = [
    {
        english: "room",
        polish: "pokój",
        known: true,
        category: "home"
    },
    {
        english: "wall",
        polish: "ściana",
        known: true,
        category: "home"
    },
    {
        english: "floor",
        polish: "podłoga",
        known: true,
        category: "home"
    },
    {
        english: "kitchen",
        polish: "kuchnia",
        known: false,
        category: "home"
    },
    {
        english: "food",
        polish: "jedzenie",
        known: true,
        category: "eating"
    },
    {
        english: "drink",
        polish: "picie",
        known: true,
        category: "eating"
    },
    {
        english: "lemon",
        polish: "cytryna",
        known: true,
        category: "eating"
    },
    {
        english: "son",
        polish: "syn",
        known: false,
        category: "family"
    },
    {
        english: "daughter",
        polish: "córka",
        known: true,
        category: "family"
    },
    {
        english: "mother",
        polish: "mama",
        known: true,
        category: "family"
    },
    {
        english: "father",
        polish: "ojciec",
        known: false,
        category: "family"
    },
    {
        english: "rain",
        polish: "deszcz",
        known: true,
        category: "weather"
    },
    {
        english: "sun",
        polish: "słońce",
        known: true,
        category: "weather"
    },
    {
        english: "wind",
        polish: "wiatr",
        known: false,
        category: "weather"
    },
    {
        english: "snow",
        polish: "śnieg",
        known: false,
        category: "weather"
    },
    {
        english: "job",
        polish: "praca",
        known: true,
        category: "work"
    },
    {
        english: "money",
        polish: "pieniądze",
        known: true,
        category: "work"
    },
    {
        english: "employee",
        polish: "pracownik",
        known: false,
        category: "work"
    },
    {
        english: "boss",
        polish: "szef",
        known: true,
        category: "work"
    }
];

words.forEach((word) => {
    Category.find({
        name: word.category
    }, function(err, category) {
        if (err) {
            res.send(404);
        } else {
            let newWord = new Word({
                polish: word.polish,
                english: word.english,
                known: word.known,
                category: category
            });

            newWord.save(function(err, entity) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('saved: ' + entity);
                }
            });
        }
    });
});
