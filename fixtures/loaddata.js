var mongoose = require('mongoose');

var Category = require('../model/FlashCard');

mongoose.connect('mongodb://localhost/categories_2');

var data = [{
        category: "work",
        words: [
            {
                english: "job",
                polish: "praca",
                known: true
            },
            {
                english: "money",
                polish: "pieniądze",
                known: true
            },
            {
                english: "employee",
                polish: "pracownik",
                known: false
            },
            {
                english: "boss",
                polish: "szef",
                known: true
            }
        ]
    },
    {
        category: "weather",
        words: [
            {
                english: "rain",
                polish: "deszcz",
                known: true
            },
            {
                english: "sun",
                polish: "słońce",
                known: true
            },
            {
                english: "wind",
                polish: "wiatr",
                known: false
            },
            {
                english: "snow",
                polish: "śnieg",
                known: false
            },
            {
                english: "cloud",
                polish: "chmura",
                known: true
            }
        ]
    },
    {
        category: "home",
        words: [
            {
                english: "room",
                polish: "pokój",
                known: true
            },
            {
                english: "wall",
                polish: "ściana",
                known: true
            },
            {
                english: "floor",
                polish: "podłoga",
                known: true
            },
            {
                english: "kitchen",
                polish: "kuchnia",
                known: false
            }
        ]
    },
    {
        category: "eating",
        words: [
            {
                english: "food",
                polish: "jedzenie",
                known: true
            },
            {
                english: "drink",
                polish: "picie",
                known: true
            },
            {
                english: "lemon",
                polish: "cytryna",
                known: true
            },
            {
                english: "orange",
                polish: "pomarańcz",
                known: false
            },
            {
                english: "banana",
                polish: "banan",
                known: true
            },
            {
                english: "fruit",
                polish: "owoc",
                known: true
            },
            {
                english: "watermelon",
                polish: "arbuz",
                known: false
            }
        ]
    },
    {
        category: "family",
        words: [
            {
                english: "son",
                polish: "syn",
                known: false
            },
            {
                english: "daughter",
                polish: "córka",
                known: true
            },
            {
                english: "mother",
                polish: "mama",
                known: true
            },
            {
                english: "father",
                polish: "ojciec",
                known: false
            },
            {
                english: "brother",
                polish: "brat",
                known: false
            },
            {
                english: "sister",
                polish: "siostra",
                known: true
            },
            {
                english: "grandmother",
                polish: "babcia",
                known: false
            },
            {
                english: "grandfather",
                polish: "dziadek",
                known: false
            }
        ]
    }];

data.forEach(function(item) {

    var category = new Category(
        {
            category: item.category,
          	words: item.words
//             words: [
//                 {
//                     english: item.english,
//                     polish: item.polish,
//                     known: item.known
//                 }
//             ]
        }
    );

    category.save(function(err, category) {
        if (err) {
            console.log(err)
        } else {
            console.log('saved: ' + item.category);
        }
    });
});
