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
    },
    {
        english: "one",
        polish: "jeden",
        known: true,
        category: "numbers"
    },
    {
        english: "two",
        polish: "dwa",
        known: true,
        category: "numbers"
    },
    {
        english: "ten",
        polish: "dziesięć",
        known: false,
        category: "numbers"
    },
    {
        english: "twenty",
        polish: "dwadzieścia",
        known: true,
        category: "numbers"
    },
    {
        english: "five",
        polish: "pięć",
        known: false,
        category: "numbers"
    },
    {
        english: "seven",
        polish: "siedem",
        known: true,
        category: "numbers"
    },
    {
        english: "colour",
        polish: "kolor",
        known: true,
        category: "colours"
    },
    {
        english: "colourful",
        polish: "kolorowy",
        known: false,
        category: "colours"
    },
    {
        english: "pink",
        polish: "różowy",
        known: false,
        category: "colours"
    },
    {
        english: "yellow",
        polish: "żółty",
        known: true,
        category: "colours"
    },
    {
        english: "transparent",
        polish: "przezroczysty",
        known: true,
        category: "colours"
    },
    {
        english: "black",
        polish: "czarny",
        known: false,
        category: "colours"
    },
    {
        english: "day",
        polish: "dzień",
        known: false,
        category: "days"
    },
    {
        english: "monday",
        polish: "poniedziałek",
        known: true,
        category: "days"
    },
    {
        english: "tuesday",
        polish: "wtorek",
        known: false,
        category: "days"
    },
    {
        english: "wednesday",
        polish: "środa",
        known: true,
        category: "days"
    },
    {
        english: "thursday",
        polish: "czwartek",
        known: false,
        category: "days"
    },
    {
        english: "friday",
        polish: "piątek",
        known: true,
        category: "days"
    },
    {
        english: "saturday",
        polish: "sobota",
        known: false,
        category: "days"
    },
    {
        english: "sunday",
        polish: "niedziela",
        known: true,
        category: "days"
    },
    {
        english: "month",
        polish: "miesiąc",
        known: true,
        category: "months"
    },
    {
        english: "january",
        polish: "styczeń",
        known: true,
        category: "months"
    },
    {
        english: "february",
        polish: "luty",
        known: true,
        category: "months"
    },
    {
        english: "march",
        polish: "marzec",
        known: true,
        category: "months"
    },
    {
        english: "april",
        polish: "kwiecień",
        known: false,
        category: "months"
    },
    {
        english: "may",
        polish: "maj",
        known: true,
        category: "months"
    },
    {
        english: "june",
        polish: "czerwiec",
        known: false,
        category: "months"
    },
    {
        english: "july",
        polish: "lipiec",
        known: false,
        category: "months"
    },
    {
        english: "august",
        polish: "sierpień",
        known: true,
        category: "months"
    },
    {
        english: "september",
        polish: "wrzesień",
        known: false,
        category: "months"
    },
    {
        english: "october",
        polish: "pażdziernik",
        known: false,
        category: "months"
    },
    {
        english: "november",
        polish: "listopad",
        known: true,
        category: "months"
    },
    {
        english: "december",
        polish: "grudzień",
        known: true,
        category: "months"
    },
    {
        english: "soldier",
        polish: "żołnierz",
        known: false,
        category: "war"
    },
    {
        english: "bomb",
        polish: "bomba",
        known: false,
        category: "war"
    },
    {
        english: "war",
        polish: "wojna",
        known: true,
        category: "war"
    },
    {
        english: "spy",
        polish: "szpieg",
        known: true,
        category: "war"
    },
    {
        english: "fantasy",
        polish: "fantazja",
        known: false,
        category: "fantasy"
    },
    {
        english: "fairy",
        polish: "wróżka",
        known: true,
        category: "fantasy"
    },
    {
        english: "car",
        polish: "samochód",
        known: false,
        category: "transport"
    },
    {
        english: "transport",
        polish: "transport",
        known: true,
        category: "transport"
    },
    {
        english: "train",
        polish: "pociąg",
        known: true,
        category: "transport"
    },
    {
        english: "bus",
        polish: "autobus",
        known: false,
        category: "transport"
    },
    {
        english: "bus stop",
        polish: "przystanek autobusowy",
        known: true,
        category: "transport"
    },
    {
        english: "sound",
        polish: "dźwięk",
        known: false,
        category: "sounds"
    },
    {
        english: "loud",
        polish: "głośny",
        known: true,
        category: "sounds"
    },
    {
        english: "quiet",
        polish: "cichy",
        known: true,
        category: "sounds"
    },
    {
        english: "noise",
        polish: "hałas",
        known: false,
        category: "sounds"
    },
    {
        english: "shout",
        polish: "krzyk",
        known: true,
        category: "sounds"
    },
    {
        english: "trip",
        polish: "wycieczka",
        known: false,
        category: "travelling"
    },
    {
        english: "journey",
        polish: "podróż",
        known: true,
        category: "travelling"
    },
    {
        english: "travel",
        polish: "podróżować",
        known: true,
        category: "travelling"
    },
    {
        english: "excursion",
        polish: "wycieczka",
        known: false,
        category: "travelling"
    },
    {
        english: "expedition",
        polish: "wyprawa",
        known: true,
        category: "travelling"
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
